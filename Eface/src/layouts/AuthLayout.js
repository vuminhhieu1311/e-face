import React from 'react';
import {
    StyleSheet,
    StatusBar,
    View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Center, ScrollView } from 'native-base';
import { screenHeight } from '../utils/Dimensions';

const AuthLayout = (props) => {
    return (
        <View style={styles.container}>
            <Center style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={1500}
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                />
            </Center>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {props.children}
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default AuthLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6F4299'
    },
    header: {
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        justifyContent: 'center',
        flex: 1
    },
    footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        flex: 3
    },
    logo: {
        height: screenHeight * 0.4,
        width: screenHeight * 0.5,
    }
});
