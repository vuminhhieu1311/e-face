import React, { useState, useEffect } from 'react';
import { Box, Image, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import addFriend from '../../api/friend/addFriend';
import { showErrorToast } from '../ToastMessage';
import deleteFriend from '../../api/friend/deleteFriend';
import RedButton from '../buttons/RedButton';
import VioletButton from '../buttons/VioletButton';
import { IS_FRIEND, HAS_PENDING_REQUEST_FROM, HAS_PENDING_SENT_REQUEST_TO, IS_NOT_FRIEND } from '../../enums/friend/status';
import WhiteButton from '../buttons/WhiteButton';
import GrayButton from '../buttons/GrayButton';

const ProfileCard = ({ user }) => {
    const { userToken } = useSelector(state => state.authReducer);
    const [friendStatus, setFriendStatus] = useState('');

    useEffect(() => {
        setFriendStatus(user.friend_status);
    }, []);

    const sendFriendRequest = async () => {
        try {
            await addFriend(userToken, user.id)
                .then(([statusCode, data]) => {
                    console.log(data);
                    if (statusCode === 200 && data.friend_request) {
                        setFriendStatus(HAS_PENDING_SENT_REQUEST_TO);
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Can not fetch data.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Can not fetch data.");
        }
    }

    const sendDeleteFriendRequest = async () => {
        try {
            await deleteFriend(userToken, user.id)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.message) {
                        setFriendStatus(IS_NOT_FRIEND);
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Can not fetch data.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Can not fetch data.");
        }
    }

    const renderFriendRequestButton = () => {
        if (friendStatus === IS_FRIEND) {
            return (
                <RedButton
                        text="Delete friend"
                        icon="account-minus"
                        style={{ width: 152 }}
                        onPress={sendDeleteFriendRequest}
                    />
            );
        }
        if (friendStatus === HAS_PENDING_REQUEST_FROM) {
            return (
                <WhiteButton
                        text="Accept"
                        icon="account-check"
                        width={152}
                        onPress={sendDeleteFriendRequest}
                    />
            );
        }
        if (friendStatus === HAS_PENDING_SENT_REQUEST_TO) {
            return (
                <WhiteButton
                    text="Pending"
                    icon="account-remove"
                    width={152}
                    onPress={sendDeleteFriendRequest}
                />
            );
        }
        if (friendStatus === IS_NOT_FRIEND) {
            return (
                <VioletButton 
                        text="Add friend"
                        icon="account-plus" 
                        style={{ width: 152 }} 
                        onPress={sendFriendRequest} 
                    />
            );
        }

        return null;
    }

    return (
        <Box paddingVertical={10} flexDirection="row" justifyContent="space-between" width="100%">
            <Box>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        maxWidth: '60%',
                    }}>
                    <Image
                        source={require('../../assets/images/user-1.jpg')}
                        alt="avatar"
                        size={50}
                        borderRadius={100}
                        marginRight={5}
                    />
                    <Box width="100%">
                        <Text fontSize="lg" bold>
                            {user.name}
                        </Text>
                        <Text fontSize="md" opacity="0.5">
                            {user.email}
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
            <Box flexDirection="row" alignItems="center">
                {renderFriendRequestButton()}
            </Box>
        </Box>
    );
};

export default ProfileCard;
