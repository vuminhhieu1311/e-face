import React, { useState, useContext } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
} from 'react-native';
import { FormControl, Stack } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import AuthLayout from '../layouts/AuthLayout';
import TextHeader from '../components/TextHeader';
import VioletButton from '../components/buttons/VioletButton';
import WhiteButton from '../components/buttons/WhiteButton';
import registerUser from '../api/registerUser';
import { showErrorToast } from '../components/ToastMessage';
import { useDeviceName } from 'react-native-device-info';
import createToken from '../api/createToken';
import { AuthContext } from '../utils/Context';

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

            <FormControl isRequired mb="5">
                <Stack mx="4">
                    <FormControl.Label
                        _text={{
                            fontSize: 'lg',
                        }}>Name</FormControl.Label>
                    <View style={styles.action}>
                        <Feather
                            name="user"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your name"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            onChangeText={(value) => setName(value)}
                        />
                    </View>
                    {errors.name ?
                        <FormControl.HelperText _text={{ color: '#b91c1c' }}>
                            {errors.name}
                        </FormControl.HelperText> : null
                    }
                </Stack>
            </FormControl>

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
                    {errors.email ?
                        <FormControl.HelperText _text={{ color: '#b91c1c' }}>
                            {errors.email}
                        </FormControl.HelperText> : null
                    }
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
                    {errors.password ?
                        <FormControl.HelperText _text={{ color: '#b91c1c' }}>
                            {errors.password}
                        </FormControl.HelperText> : null
                    }
                </Stack>
            </FormControl>

            <FormControl isRequired mb="5">
                <Stack mx="4">
                    <FormControl.Label
                        _text={{
                            fontSize: 'lg',
                        }}>Confirm Password</FormControl.Label>
                    <View style={styles.action}>
                        <Feather
                            name="key"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={passwordConfirmationSecured}
                            style={styles.textInput}
                            onChangeText={(value) => setPasswordConfirmation(value)}
                        />
                        <TouchableOpacity
                            onPress={() => setPasswordConfirmationSecured(!passwordConfirmationSecured)}
                        >
                            {passwordConfirmationSecured ?
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
