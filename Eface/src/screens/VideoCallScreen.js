import React from 'react';
import AgoraUIKit, { VideoRenderMode } from 'agora-rn-uikit';

import { screenHeight, screenWidth } from '../utils/Dimensions';
import { AGORA_APP_ID } from '../utils/Config';

const VideoCallScreen = ({ navigation, route }) => {
    const rtcProps = {
        appId: AGORA_APP_ID,
        channel: route.params?.channelName,
        token: route.params?.agoraToken,
    };

    const callbacks = {
        EndCall: () => {
            navigation.goBack();
        }
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
        <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} styleProps={styleProps} />
    );
};

export default VideoCallScreen;
