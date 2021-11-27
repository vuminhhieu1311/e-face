import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import SettingStack from './SettingStack';
import BottomTab from './BottomTab';

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#6F4299',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -10,
                    fontSize: 15,
                },
                headerStyle: {
                    backgroundColor: '#6F4299',
                },
                headerTintColor: '#FFF'
            }}>
            <Drawer.Screen
                name="BottomTab"
                component={BottomTab}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="home-outline" size={22} color={color} />
                    ),
                    title: "Home"
                }}
            />
            <Drawer.Screen
                name="Edit Profile"
                component={ProfileScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="account-edit-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Messages"
                component={MessagesScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="message-processing-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Video Call"
                component={VideoCallScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="account-cog-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingStack}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="cog-outline" size={22} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default AppStack;
