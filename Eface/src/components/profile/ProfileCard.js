import React, { useState, useEffect } from 'react';
import { Box, Button, Image, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import addFriend from '../../api/friend/addFriend';
import { showErrorToast } from '../ToastMessage';
import deleteFriend from '../../api/friend/deleteFriend';
import {
    HAS_PENDING_SENT_REQUEST_TO,
    IS_NOT_FRIEND
} from '../../enums/friend/status';

const ProfileCard = ({ user, navigation }) => {
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
        if (friendStatus === HAS_PENDING_SENT_REQUEST_TO) {
            return (
                <TouchableOpacity>
                    <Icon
                        name="account-arrow-right"
                        color="#6F4299"
                        size={30}
                        onPress={sendDeleteFriendRequest}
                    />
                </TouchableOpacity>
            );
        }
        if (friendStatus === IS_NOT_FRIEND) {
            return (
                <TouchableOpacity>
                    <Icon
                        name="account-plus-outline"
                        color="#6F4299"
                        size={30}
                        onPress={sendFriendRequest}
                    />
                </TouchableOpacity>
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
                        maxWidth: '80%',
                    }}
                    onPress={() => {
                        navigation.navigate('Profile', {
                            user,
                        });
                    }}
                >
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
