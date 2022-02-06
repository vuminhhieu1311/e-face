import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import MyProfileScreen from '../screens/MyProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6F4299',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontSize: 20
                },
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name="Profile"
                component={MyProfileScreen}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity>
                            <Icon
                                name="menu"
                                size={25}
                                onPress={() => { navigation.openDrawer(); }}
                                color="#FFF" 
                            />
                        </TouchableOpacity>
                    ),
                    headerTitle: "My Profile",
                }} 
            />
            <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
        </Stack.Navigator>
    );
};

export default ProfileStack;
