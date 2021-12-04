import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import BottomTab from './BottomTab';
import ChatScreen from '../screens/ChatScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import createAgoraToken from '../api/createAgoraToken';
import { showErrorToast } from '../components/ToastMessage';
import callUser from '../api/callUser';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    const { user, userToken } = useSelector(state => state.authReducer);

    const startVideoCall = async (navigation, partner) => {
        const channelName = `${user.id}-${partner.id}`;
        try {
            await callUser(userToken, channelName, partner.id)
                .then(([statusCode, data]) => {
                    if (data.success <= 0) {
                        showErrorToast("Can not call user.");
                    } else {
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
                }} />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={({ route, navigation }) => ({
                    title: route.params.user.name,
                    headerRight: () => (
                        <TouchableOpacity>
                            <Icon
                                name="videocam"
                                size={25}
                                onPress={() => { startVideoCall(navigation, route.params.user) }}
                                color="#FFF"></Icon>
                        </TouchableOpacity>
                    )
                })}
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
