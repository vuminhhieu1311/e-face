import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pusher from 'pusher-js/react-native';
import { useSelector } from 'react-redux';
import AgoraUIKit from 'agora-rn-uikit';
import { v4 as uuid } from 'uuid';
import RNCallKeep, { CONSTANTS as CK_CONSTANTS } from 'react-native-callkeep';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import createAgoraToken from '../api/createAgoraToken';
import agoraStyleProps from '../assets/styles/AgoraVideoStyles';
import { showErrorToast } from '../components/ToastMessage';
import initPusher from '../utils/Pusher';
import { AGORA_APP_ID } from '../utils/Config';
import MainStack from './MainStack';
import SettingStack from './SettingStack';
import CustomDrawer from '../components/CustomDrawer';
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import isIOS from '../utils/isIOS';

const Drawer = createDrawerNavigator();

var channelName = '';

const AppStack = () => {
    const [videoCall, setVideoCall] = useState(false);
    const [agoraToken, setAgoraToken] = useState('');
    const { user, userToken } = useSelector(state => state.authReducer);

    // Set up Agora UI Kit
    const rtcProps = {
        appId: AGORA_APP_ID,
        channel: channelName,
        token: agoraToken,
    };

    const callbacks = {
        EndCall: () => {
            setVideoCall(false);
        }
    };

    // Set up RN CallKeep
    const setup = () => {
        const options = {
            ios: {
                appName: 'Eface',
                supportsVideo: true,
            },
            android: {
                alertTitle: 'Permissions required',
                alertDescription: 'This application needs to access your phone accounts',
                cancelButton: 'Cancel',
                okButton: 'ok',
            },
        };

        try {
            RNCallKeep.setup(options);
            RNCallKeep.setAvailable(true);
        } catch (err) {
            console.error('Initialize CallKeep Error:', err.message);
        }
    }

    const displayIncomingCallNow = (callingData) => {
        console.log("Event: Display Incoming Call: ", callingData);
        const callUUID = uuid();
        const number = callingData.from_number;
        const name = callingData.from_name

        if (isIOS) {
            RNCallKeep.displayIncomingCall(callUUID, number, name, 'generic', true);
        } else {
            RNCallKeep.displayIncomingCall(callUUID, name, number, 'generic', true);
        }

        BackgroundTimer.setTimeout(() => {
            RNCallKeep.endCall(callUUID);
            RNCallKeep.reportEndCallWithUUID(callUUID, CK_CONSTANTS.END_CALL_REASONS.MISSED);
        }, 10000);
    };

    const answerCall = ({ callUUID }) => {
        console.log("Event: Answer Call", callUUID);

        RNCallKeep.endCall(callUUID);
        startVideoCall();
    };

    const startVideoCall = async () => {
        try {
            const userToken = await AsyncStorage.getItem('USER_TOKEN');
            await createAgoraToken(channelName, userToken)
                .then(([statusCode, data]) => {
                    if (statusCode === 200) {
                        setAgoraToken(data.agora_token);
                        setVideoCall(true);
                    } else {
                        showErrorToast("Can not start video call.");
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Can not start video call.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Can not start video call.");
        }
    }

    useEffect(() => {
        Pusher.logToConsole = true;
        const pusher = initPusher(userToken);
        var channel = pusher.subscribe('presence-agora-online-channel');

        channel.bind('incoming_call', (event) => {
            const callingData = event.data;
            if (callingData.to === user.id) {
                channelName = callingData.channel_name;
                displayIncomingCallNow(callingData);
            }
        });

        // RN CallKeep event listener
        setup();
        RNCallKeep.addEventListener('answerCall', answerCall);

        return () => {
            RNCallKeep.removeEventListener('answerCall', answerCall);
        }
    }, [])

    return videoCall ? <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} styleProps={agoraStyleProps} /> :
        (
            <Drawer.Navigator
                drawerContent={props => <CustomDrawer {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerActiveBackgroundColor: '#6F4299',
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#333',
                    drawerLabelStyle: {
                        marginLeft: -10,
                        fontSize: 15,
                    },
                    headerStyle: {
                        backgroundColor: '#6F4299',
                    },
                    headerTintColor: '#FFF'
                }}>
                <Drawer.Screen
                    name="MainStack"
                    component={MainStack}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon name="home-outline" size={22} color={color} />
                        ),
                        title: "Home"
                    }}
                />
                <Drawer.Screen
                    name="Edit Profile"
                    component={ProfileScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon name="account-edit-outline" size={22} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Messages"
                    component={MessagesScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon name="message-processing-outline" size={22} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Video Call"
                    component={VideoCallScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon name="account-cog-outline" size={22} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Settings"
                    component={SettingStack}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon name="cog-outline" size={22} color={color} />
                        ),
                    }}
                />
            </Drawer.Navigator>
        );
};

export default AppStack;
