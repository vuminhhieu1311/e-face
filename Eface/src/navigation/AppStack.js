import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js/react-native';
import { useSelector, useDispatch } from 'react-redux';
import AgoraUIKit from 'agora-rn-uikit';
import { v4 as uuid } from 'uuid';
import RNCallKeep, { CONSTANTS as CK_CONSTANTS } from 'react-native-callkeep';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import createAgoraToken from '../api/video-call/createAgoraToken';
import agoraStyleProps from '../assets/styles/AgoraVideoStyles';
import { showErrorToast } from '../components/ToastMessage';
import initPusher from '../utils/Pusher';
import { AGORA_APP_ID } from '../utils/Config';
import isIOS from '../utils/isIOS';
import DrawerStack from './DrawerStack';
import { setPusher } from '../redux/actions';

var channelName = '';

const AppStack = () => {
    const [videoCall, setVideoCall] = useState(false);
    const [agoraToken, setAgoraToken] = useState('');
    const { user, userToken } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

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
        dispatch(setPusher(pusher));
        var channel = pusher.subscribe('presence-agora-online-channel');

        channel.bind('incoming_call', (event) => {
            const callingData = event.data;
            const called = callingData.to.find((called) => {
                return called.id === user.id;
            });
            if (called) {
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

    return (videoCall ?
        <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} styleProps={agoraStyleProps} />
        :
        <DrawerStack />
    );
};

export default AppStack;
