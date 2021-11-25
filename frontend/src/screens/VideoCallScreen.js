import React, { useState, useEffect } from 'react';
import { Text } from 'native-base';
import AgoraUIKit, { VideoRenderMode, layout } from 'agora-rn-uikit';
import { SafeAreaView, StatusBar } from 'react-native';
import { screenHeight, screenWidth } from '../utils/Dimensions';
import { AGORA_APP_ID } from '../utils/Config';

const VideoCallScreen = ({ navigation, route }) => {
    const [videoCall, setVideoCall] = useState(true);

    const rtcProps = {
        appId: AGORA_APP_ID,
        channel: 'test',
        token: route.params?.agoraToken,
        // layout: layout.pin,
    };

    const callbacks = {
        EndCall: () => setVideoCall(false),
        LocalMuteVideo: (muted) => {

        },
        // LocalMuteAudio: (muted) => console.log(muted),
    };

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

    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#6F4299' barStyle="light-content" />
            {videoCall ?
                <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} styleProps={styleProps} />
                :
                <Text onPress={() => setVideoCall(true)}>Start Call</Text>
            }
        </SafeAreaView>
    );
};

export default VideoCallScreen;
