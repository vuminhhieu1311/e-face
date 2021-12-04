import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, logout } from './redux/actions';
import { ActivityIndicator, View, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import AgoraUIKit, { VideoRenderMode } from 'agora-rn-uikit';
import { v4 as uuid } from 'uuid';
import RNCallKeep, { CONSTANTS as CK_CONSTANTS }  from 'react-native-callkeep';
import BackgroundTimer from 'react-native-background-timer';

import { AuthContext } from './utils/Context';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
import { screenHeight, screenWidth } from './utils/Dimensions';
import { AGORA_APP_ID } from './utils/Config';
import createAgoraToken from './api/createAgoraToken';
import { showErrorToast } from './components/ToastMessage';

// Custom Agora UI Kit style
const localBtnStyles = {
    backgroundColor: '#6F4299',
    borderColor: '#6F4299',
}

const styleProps = {
    videoMode: {
        max: VideoRenderMode.Hidden,
        min: VideoRenderMode.Hidden
    },
    minViewStyles: {
        width: screenWidth * 0.5,
        height: screenHeight * 0.3,
        // display: "none"
    },
    localBtnStyles: {
        muteLocalAudio: localBtnStyles,
        muteLocalVideo: localBtnStyles,
        switchCamera: localBtnStyles,
    },
}

const isIOS = Platform.OS === 'ios';

let channelName = '';

const Main = () => {
    const [videoCall, setVideoCall] = useState(false);
    const [agoraToken, setAgoraToken] = useState('');
    const [loading, setLoading] = useState(true);
    const { user, userToken } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const authContext = useMemo(() => ({
        login: async (user, userToken) => {
            console.log("user token", userToken);
            try {
                await AsyncStorage.setItem('USER', JSON.stringify(user));
                await AsyncStorage.setItem('USER_TOKEN', userToken);
            } catch (e) {
                console.log(e);
            }
            dispatch(setUserData(user, userToken));
        },
        logout: async () => {
            try {
                await AsyncStorage.removeItem('USER');
                await AsyncStorage.removeItem('USER_TOKEN');
            } catch (e) {
                console.log(e);
            }
            dispatch(logout());
        },
        signUp: () => {

        },
    }), []);

    const retrieveUserData = async () => {
        let user, userToken;
        try {
            await AsyncStorage.getItem('USER')
                .then(value => {
                    user = value ? JSON.parse(value) : null;
                })
            userToken = await AsyncStorage.getItem('USER_TOKEN');
        } catch (err) {
            console.log(err);
        }
        console.log('user: ', user);
        console.log('user token: ', userToken);
        dispatch(setUserData(user, userToken));
        setLoading(false);
    };

    // Set up permission on IOS when using firebase cloud messaging
    const setupCloudMessaging = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    };

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
        const number = callingData?.from_number;
        const name = callingData?.from_name

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
        retrieveUserData();
        setupCloudMessaging();

        // Listen to message in the foreground
        messaging().onMessage(async remoteMessage => {
            channelName = remoteMessage.data.channel_name;
            displayIncomingCallNow(remoteMessage.data);
        });

        // Listen to message in the background
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });

        // RN CallKeep event listener
        setup();
        RNCallKeep.addEventListener('answerCall', answerCall);

        return () => {
            RNCallKeep.removeEventListener('answerCall', answerCall);
        }
    }, []);

    if (loading) {
        return (
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6F4299' }}>
                <ActivityIndicator size="large" color="#FFF" />
            </View>
        );
    }

    return videoCall ? <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} styleProps={styleProps} /> :
        (
            <AuthContext.Provider value={authContext}>
                <NativeBaseProvider>
                    <NavigationContainer>
                        {user ? <AppStack /> : <AuthStack />}
                    </NavigationContainer>
                </NativeBaseProvider>
            </AuthContext.Provider>
        );
};

export default Main;
