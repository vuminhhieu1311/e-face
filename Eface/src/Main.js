import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, logout } from './redux/actions';
import { ActivityIndicator, View, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';

import { AuthContext } from './utils/Context';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

const Main = () => {
    const [loading, setLoading] = useState(true);
    const { user, userToken } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const authContext = useMemo(() => ({
        login: async (user, userToken) => {
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
        console.log('Auth user: ', user);
        console.log('User token: ', userToken);
        dispatch(setUserData(user, userToken));
        setLoading(false);
    };

    // Set up permission on IOS when using firebase cloud messaging
    // const setupCloudMessaging = async () => {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //         console.log('Authorization status:', authStatus);
    //     }
    // };

    useEffect(() => {
        retrieveUserData();
        // setupCloudMessaging();

        // // Listen to message in the foreground
        // messaging().onMessage(async remoteMessage => {
        //     channelName = remoteMessage.data.channel_name;
        //     displayIncomingCallNow(remoteMessage.data);
        // });

        // // Listen to message in the background
        // messaging().setBackgroundMessageHandler(async remoteMessage => {
        //     console.log('Message handled in the background!', remoteMessage);
        // });
    }, []);

    if (loading) {
        return (
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6F4299' }}>
                <ActivityIndicator size="large" color="#FFF" />
            </View>
        );
    }

    return (
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
