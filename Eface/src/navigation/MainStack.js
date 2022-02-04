import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import BottomTab from './BottomTab';
import ChatScreen from '../screens/ChatScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import ProfileScreen from '../screens/ProfileScreen';
import createAgoraToken from '../api/video-call/createAgoraToken';
import { showErrorToast } from '../components/ToastMessage';
import callUser from '../api/video-call/callUser';
import { GROUP } from '../enums/room/type';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    const { user, userToken } = useSelector(state => state.authReducer);

    const startVideoCall = async (navigation, partner) => {
        console.log(partner)
        const channelName = `${user.id}-${partner.id}`;
        try {
            await callUser(userToken, channelName, partner.id)
                .then(([statusCode, data]) => {
                    console.log(data)
                    if (statusCode === 200) {
                        createAgoraToken(channelName, userToken)
                            .then(([statusCode, data]) => {
                                if (statusCode === 200) {
                                    navigation.navigate('VideoCall', {
                                        agoraToken: data.agora_token,
                                        channelName,
                                    });
                                } else {
                                    showErrorToast("Can not start video call.");
                                }
                            }).catch(error => {
                                console.log(error);
                                showErrorToast("Can not start video call.");
                            });
                    } else {
                        showErrorToast("Can not call user.");
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Can not call user.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Can not start video call.");
        }
    }

    return (
        <Stack.Navigator
            initialRouteName="BottomTab"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6F4299',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontSize: 20
                },
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name="BottomTab"
                component={BottomTab}
                options={{
                    headerShown: false,
                }} 
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={({ route, navigation }) => {
                    const room = route.params.room;
                    return {
                        title: room.type === GROUP ? room.name : room.users[0].name,
                        headerRight: () => (
                            <TouchableOpacity>
                                <Icon
                                    name="videocam"
                                    size={25}
                                    onPress={() => { startVideoCall(navigation, room.users[0]) }}
                                    color="#FFF" />
                            </TouchableOpacity>
                        )
                    }
                }}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
            />
            <Stack.Screen
                name="VideoCall"
                component={VideoCallScreen}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    );
};

export default MainStack;
