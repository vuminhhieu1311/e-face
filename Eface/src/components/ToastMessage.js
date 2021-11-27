import Toast from 'react-native-toast-message';

export const showErrorToast = (text) => {
    Toast.show({
        position: 'bottom',
        type: 'error',
        text1: text,
    });
}

export const showSuccessToast = (text) => {
    Toast.show({
        position: 'bottom',
        type: 'success',
        text1: text,
    });
}
