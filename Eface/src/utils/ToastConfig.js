import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#14532d', backgroundColor: '#dcfce7' }}
            text1Style={{
                fontSize: 14,
                color: '#14532d',
                fontWeight: '500',
            }}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#b91c1c', backgroundColor: '#fee2e2' }}
            text1Style={{
                fontSize: 14,
                color: '#b91c1c',
                fontWeight: '500',
            }}
        />
    ),
};

export default toastConfig;