import React, { useState, useContext } from 'react';
import {
    View,
    TouchableOpacity,
    Platform,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDeviceName } from 'react-native-device-info';

import AuthLayout from '../layouts/AuthLayout';
import TextHeader from '../components/TextHeader';
import VioletButton from '../components/buttons/VioletButton';
import WhiteButton from '../components/buttons/WhiteButton';
import registerUser from '../api/auth/registerUser';
import { showErrorToast } from '../components/ToastMessage';
import createToken from '../api/auth/createToken';
import { AuthContext } from '../utils/Context';
import FormInput from '../components/forms/FormInput';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordSecured, setPasswordSecured] = useState(true);
    const [passwordConfirmationSecured, setPasswordConfirmationSecured] = useState(true);
    const [errors, setErrors] = useState({});
    const { result } = useDeviceName();
    const { login } = useContext(AuthContext);

    const handleRegister = async () => {
        try {
            await registerUser(name, email, password, passwordConfirmation)
                .then(([statusCode, data]) => {
                    if (statusCode === 201 && data.user) {
                        // Login
                        createToken(email, password, result)
                            .then(([code, res]) => {
                                if (code === 200 && res.user) {
                                    login(res.user, res.token);
                                } else if (code == 422) {
                                    navigation.navigate('Login');
                                }
                            }).catch(error => {
                                console.log(error);
                                navigation.navigate('Login');
                            });
                    } else if (statusCode == 422) {
                        setErrors({
                            name: data.errors.name ? data.errors.name[0] : null,
                            email: data.errors.email ? data.errors.email[0] : null,
                            password: data.errors.password ? data.errors.password[0] : null,
                        })
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Register Fail.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Register Fail.");
        }
    }

    return (
        <AuthLayout>
            <TextHeader text="Register" />
            <FormInput
                label="Name"
                icon="account-outline"
                placeholder="Your name"
                onChangeText={(value) => setName(value)}
                error={errors.name}
            />
            <FormInput
                label="Email"
                icon="email-outline"
                placeholder="Your email"
                keyboardType="email-address"
                onChangeText={(value) => setEmail(value)}
                error={errors.email}
            />
            <FormInput
                label="Password"
                icon="lock-outline"
                placeholder="Your Password"
                secureTextEntry={passwordSecured}
                onChangeText={(value) => setPassword(value)}
                error={errors.password}
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
            <FormInput
                label="Confirm Password"
                icon="lock-outline"
                placeholder="Confirm Password"
                secureTextEntry={passwordConfirmationSecured}
                onChangeText={(value) => setPasswordConfirmation(value)}
                error={errors.password}
            >
                <TouchableOpacity
                    onPress={() => setPasswordConfirmationSecured(!passwordConfirmationSecured)}
                >
                    {passwordConfirmationSecured ?
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
                <VioletButton text="Sign Up" onPress={handleRegister} />
                <WhiteButton text="Sign In" onPress={() => navigation.goBack()} />
            </View>
        </AuthLayout>
    );
};

export default RegisterScreen;

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
