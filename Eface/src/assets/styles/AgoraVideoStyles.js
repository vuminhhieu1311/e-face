import { VideoRenderMode } from 'react-native-agora';
import { screenHeight, screenWidth } from '../../utils/Dimensions';

// Custom Agora UI Kit style
const localBtnStyles = {
    backgroundColor: '#6F4299',
    borderColor: '#6F4299',
}

const agoraStyleProps = {
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

export default agoraStyleProps;
