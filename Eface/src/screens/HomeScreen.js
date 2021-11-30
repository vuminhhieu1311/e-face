import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { v4 as uuid } from 'uuid';
import RNCallKeep, { CONSTANTS as CK_CONSTANTS }  from 'react-native-callkeep';
import BackgroundTimer from 'react-native-background-timer';
import createAgoraToken from '../api/createAgoraToken';
import { showErrorToast } from '../components/ToastMessage';
import { useSelector } from 'react-redux';

BackgroundTimer.start();

const isIOS = Platform.OS === 'ios';

const HomeScreen = ({ navigation }) => {
    const [callId, setCallId] = useState('');
    const { user, userToken } = useSelector(state => state.authReducer);

    const setup = () => {
        const options = {
            ios: {
                appName: 'Eface',
                imageName: 'sim_icon',
                supportsVideo: true,
                maximumCallGroups: '1',
                maximumCallsPerCallGroup: '1',
            },
            android: {
                alertTitle: 'Permissions required',
                alertDescription: 'This application needs to access your phone accounts',
                cancelButton: 'Cancel',
                okButton: 'ok',
                imageName: 'sim_icon',
            },
        };

        try {
            RNCallKeep.setup(options);
            RNCallKeep.setAvailable(true);
        } catch (err) {
            console.error('Initialize CallKeep Error:', err.message);
        }
    }

    const displayIncomingCallNow = () => {
        console.log("Event: Display Incoming Call");

        const callUUID = uuid();
        setCallId(callUUID);

        if (isIOS) {
            RNCallKeep.displayIncomingCall(callUUID, '11111', 'HieuVM', 'generic', true);
        } else {
            RNCallKeep.displayIncomingCall(callUUID, 'HieuVM', '11111', 'generic', true);
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


    const endCall = ({ callUUID }) => {
        setCallId('');
        console.log("Event: End Call", callUUID);
    };


    const startVideoCall = async () => {
        // const channelName = `${user.id}-${partner.id}`;
        const channelName = 'test';
        try {
            await createAgoraToken(channelName, userToken)
                .then(([statusCode, data]) => {
                    console.log(data);
                    if (statusCode === 200) {
                        navigation.navigate('VideoCall', {
                            agoraToken: data.agora_token,
                            channelName,
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Can not retrieve Agora token.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Can not retrieve Agora token.");
        }
    }

    useEffect(() => {
        setup();
        RNCallKeep.addEventListener('answerCall', answerCall);
        RNCallKeep.addEventListener('endCall', endCall);

        return () => {
            RNCallKeep.removeEventListener('answerCall', answerCall);
            RNCallKeep.removeEventListener('endCall', endCall);
        }
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={displayIncomingCallNow}>
                <Text>Display incoming call now</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
