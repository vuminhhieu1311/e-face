import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();

const SettingStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="Settings"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6F4299',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontSize: 20
                }
            }}
        >
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity>
                            <Feather
                                name="menu"
                                size={25}
                                onPress={() => { navigation.openDrawer(); }}
                                color="#FFF"></Feather>
                        </TouchableOpacity>
                    )
                }} />
            <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
        </Stack.Navigator>
    );
};
export default SettingStack;
