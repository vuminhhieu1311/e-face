import React, { useContext, useState } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
} from 'react-native';
import { FormControl, Stack } from 'native-base';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import AuthLayout from '../layouts/AuthLayout';
import TextHeader from '../components/TextHeader';
import VioletButton from '../components/buttons/VioletButton';
import WhiteButton from '../components/buttons/WhiteButton';
import { AuthContext } from '../utils/Context';
import { useDeviceName } from 'react-native-device-info';
import createToken from '../api/createToken';
import { showErrorToast } from '../components/ToastMessage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecured, setPasswordSecured] = useState(true);
    const { result } = useDeviceName();
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            await createToken(email, password, result)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.user) {
                        login(data.user, data.token);
                    } else if (statusCode == 422) {
                        showErrorToast(data.errors.email[0]);
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

            <FormControl isRequired mb="5">
                <Stack mx="4">
                    <FormControl.Label
                        _text={{
                            fontSize: 'lg',
                        }}>Email</FormControl.Label>
                    <View style={styles.action}>
                        <Feather
                            name="mail"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your email"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            keyboardType="email-address"
                            onChangeText={(value) => setEmail(value)}
                        />
                    </View>
                </Stack>
            </FormControl>

            <FormControl isRequired mb="5">
                <Stack mx="4">
                    <FormControl.Label
                        _text={{
                            fontSize: 'lg',
                        }}>Password</FormControl.Label>
                    <View style={styles.action}>
                        <Feather
                            name="key"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={passwordSecured}
                            style={styles.textInput}
                            onChangeText={(value) => setPassword(value)}
                        />
                        <TouchableOpacity
                            onPress={() => setPasswordSecured(!passwordSecured)}
                        >
                            {passwordSecured ?
                                <Feather
                                    name="eye-off"
                                    color="#6F4299"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="#6F4299"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                </Stack>
            </FormControl>

            <View style={styles.button}>
                <VioletButton text="Sign In" onPress={handleLogin} />
                <WhiteButton text="Sign Up" onPress={() => navigation.navigate('RegisterScreen')} />
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
