import React, { useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../utils/Context';
import { useSelector } from 'react-redux';
import deleteToken from '../api/deleteToken';
import createAgoraToken from '../api/createAgoraToken';
import { showErrorToast } from '../components/ToastMessage';

const HomeScreen = ({ navigation }) => {
    const { logout } = useContext(AuthContext);
    const { user, userToken } = useSelector(state => state.authReducer);

    const handleLogout = async () => {
        try {
            await deleteToken(userToken)
                .then(([statusCode, data]) => {
                    if (statusCode === 200) {
                        logout();
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Logout Fail.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Logout Fail.");
        }
    }

    const startVideoCall = async () => {
        try {
            await createAgoraToken('test', userToken)
                .then(([statusCode, data]) => {
                    console.log(data);
                    if (statusCode === 200) {
                        navigation.navigate('Video Call', {
                            agoraToken: data.agora_token,
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

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#6F4299' barStyle="light-content" />

            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={1500}
                    source={require('../assets/images/logo-full.png')}
                    style={styles.logo}
                    resizeMode="cover"
                />
                <TouchableOpacity
                    onPress={handleLogout}
                >
                    <Text>Log out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={startVideoCall}
                >
                    <Text>Video Call</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5,
        fontSize: 20,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 50
    },
    signIn: {
        width: 170,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
});
