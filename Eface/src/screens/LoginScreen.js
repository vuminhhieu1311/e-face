import React, { useContext, useState } from 'react';
import {
    View,
    TouchableOpacity,
    Platform,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDeviceName } from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

import AuthLayout from '../layouts/AuthLayout';
import TextHeader from '../components/TextHeader';
import VioletButton from '../components/buttons/VioletButton';
import WhiteButton from '../components/buttons/WhiteButton';
import { AuthContext } from '../utils/Context';
import createToken from '../api/createToken';
import { showErrorToast } from '../components/ToastMessage';
import FormInput from '../components/forms/FormInput';
import isIOS from '../utils/isIOS';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecured, setPasswordSecured] = useState(true);
    const { result } = useDeviceName();
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const firebaseToken = !isIOS ? await messaging().getToken() : '';
            await createToken(email, password, result, firebaseToken)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.user) {
                        console.log(data.user);
                        login(data.user, data.token);
                    } else if (statusCode == 422) {
                        showErrorToast(data.errors.email[0]);
                    } else {
                        console.log(error);
                        showErrorToast("Login Fail.");
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Login Fail.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Login Fail.");
        }
    }

    return (
        <AuthLayout>
            <TextHeader text="Login" />
            <FormInput
                label="Email"
                icon="email-outline"
                placeholder="Your email"
                keyboardType="email-address"
                onChangeText={(value) => setEmail(value)}
            />
            <FormInput
                label="Password"
                icon="lock-outline"
                placeholder="Your Password"
                secureTextEntry={passwordSecured}
                onChangeText={(value) => setPassword(value)}
            >
                <TouchableOpacity
                    onPress={() => setPasswordSecured(!passwordSecured)}
                >
                    {passwordSecured ?
                        <Icon
                            name="eye-off-outline"
                            color="#6F4299"
                            size={20}
                        />
                        :
                        <Icon
                            name="eye-outline"
                            color="#6F4299"
                            size={20}
                        />
                    }
                </TouchableOpacity>
            </FormInput>
            <View style={styles.button}>
                <VioletButton text="Sign In" onPress={handleLogin} />
                <WhiteButton text="Sign Up" onPress={() => navigation.navigate('Register')} />
            </View>
        </AuthLayout>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        marginHorizontal: 10
    },
});
