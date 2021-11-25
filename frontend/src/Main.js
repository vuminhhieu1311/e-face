import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, logout } from './redux/actions';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './utils/Context';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

const Main = () => {
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


    useEffect(() => {
        retrieveUserData();
    }, []);

    const retrieveUserData = async () => {
        let user, userToken;
        try {
            await AsyncStorage.getItem('USER')
                .then(value => {
                    user = value ? JSON.parse(value) : null;
                })
            userToken = await AsyncStorage.getItem('USER_TOKEN');
        } catch (e) {
            console.log(e);
        }
        console.log('user: ', user);
        console.log('user token: ', userToken);
        dispatch(setUserData(user, userToken));
        setLoading(false);
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        // user ?
            <AuthContext.Provider value={authContext}>
                <NativeBaseProvider>
                    <NavigationContainer>
                        <AppStack />
                    </NavigationContainer>
                </NativeBaseProvider>
            </AuthContext.Provider>
            // :
            // <AuthContext.Provider value={authContext}>
            //     <NativeBaseProvider>
            //         <NavigationContainer>
            //             <AuthStack />
            //         </NavigationContainer>
            //     </NativeBaseProvider>
            // </AuthContext.Provider>
    );
};
export default Main;
