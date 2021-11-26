import React from 'react';
import { Image } from 'native-base';

const LogoTitle = () => {
    return (
        <Image
            style={{ width: 250, height: 60, marginTop: -20 }}
            source={require('../assets/images/logo.png')}
            alt="logo-title"
        />
    );
}

export default LogoTitle;
