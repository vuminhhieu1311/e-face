import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Center, HStack, Image } from 'native-base';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import VioletButton from '../components/buttons/VioletButton';
import GeneralInfo from '../components/profile/GeneralInfo';
import WhiteButton from '../components/buttons/WhiteButton';
import {
    IS_FRIEND,
    HAS_PENDING_REQUEST_FROM,
    HAS_PENDING_SENT_REQUEST_TO,
    IS_NOT_FRIEND
} from '../enums/friend/status';
import addFriend from '../api/friend/addFriend';
import deleteFriend from '../api/friend/deleteFriend';
import { showErrorToast } from '../components/ToastMessage';
import acceptFriend from '../api/friend/acceptFriend';
import denyFriend from '../api/friend/denyFriend';
import getRoom from '../api/chat-room/getRoom';

const ProfileScreen = ({ navigation, route }) => {
    const [friendStatus, setFriendStatus] = useState('');
    const { userToken } = useSelector(state => state.authReducer);
    const user = route.params?.user;

    useEffect(() => {
        setFriendStatus(user.friend_status);
    }, []);

    const sendFriendRequest = async () => {
        try {
            await addFriend(userToken, user.id)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.friend_request) {
                        setFriendStatus(HAS_PENDING_SENT_REQUEST_TO);
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Something went wrong.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Something went wrong.");
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
                    showErrorToast("Something went wrong.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Something went wrong.");
        }
    }

    const sendAcceptFriendRequest = async () => {
        try {
            await acceptFriend(userToken, user.id)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.friend_request) {
                        setFriendStatus(IS_FRIEND);
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Something went wrong.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Something went wrong.");
        }
    }

    const sendDenyFriendRequest = async () => {
        try {
            await denyFriend(userToken, user.id)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.message) {
                        setFriendStatus(IS_NOT_FRIEND);
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Something went wrong.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Something went wrong.");
        }
    }

    const moveToChatScreen = async () => {
        try {
            await getRoom(userToken, user.id)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.room) {
                        console.log(data.room)
                        navigation.navigate('Chat', {
                            room: data.room,
                        })
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Something went wrong.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Something went wrong.");
        }
    }

    const renderFriendRequestButton = () => {
        if (friendStatus === IS_FRIEND) {
            return (
                <VioletButton
                    text="Delete Friend"
                    icon="account-minus"
                    style={{ width: '47%' }}
                    onPress={sendDeleteFriendRequest}
                />
            );
        }
        if (friendStatus === HAS_PENDING_REQUEST_FROM) {
            return (
                <>
                    <VioletButton
                        text="Accept"
                        icon="account-check"
                        style={{ width: '24%' }}
                        onPress={sendAcceptFriendRequest}
                    />
                    <WhiteButton
                        text="Deny"
                        icon="account-remove"
                        width="24%"
                        onPress={sendDenyFriendRequest}
                    />
                </>
            );
        }
        if (friendStatus === HAS_PENDING_SENT_REQUEST_TO) {
            return (
                <VioletButton
                    text="Pending"
                    icon="account-arrow-right"
                    style={{ width: '47%' }}
                    onPress={sendDeleteFriendRequest}
                />
            );
        }
        if (friendStatus === IS_NOT_FRIEND) {
            return (
                <VioletButton
                    text="Add friend"
                    icon="account-plus"
                    style={{ width: '47%' }}
                    onPress={sendFriendRequest}
                />
            );
        }

        return null;
    }

    return (
        <Box>
            <Box style={styles.cover}>
                <Image
                    style={styles.coverImg}
                    source={require('../assets/images/cover.jpg')}
                    alt="cover"
                />
            </Box>
            <Box style={styles.profile} paddingHorizontal={15}>
                <Center>
                    <Image
                        style={styles.avatar}
                        source={require('../assets/images/user-1.jpg')}
                        alt="avatar"
                    />
                </Center>
                <GeneralInfo user={user} />
                <HStack justifyContent="space-between" alignItems="center" marginTop="5">
                    {renderFriendRequestButton()}
                    <WhiteButton 
                        text="Message" 
                        icon="message-bulleted" 
                        width="47%" 
                        onPress={moveToChatScreen}
                    />
                </HStack>
            </Box>
        </Box>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    cover: {
        height: scale(200),
        marginBottom: scale(85),
    },
    coverImg: {
        height: '100%',
        width: '100%',
    },
    profile: {
        width: '100%',
        position: 'absolute',
        height: scale(100),
        top: scale(140),
    },
    avatar: {
        height: scale(150),
        width: scale(150),
        borderRadius: scale(75),
        borderColor: 'white',
        borderWidth: scale(3),
    },
});
