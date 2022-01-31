import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MainStack from './MainStack';
import SettingStack from './SettingStack';
import CustomDrawer from '../components/CustomDrawer';
import ProfileStack from './ProfileStack';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
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
                name="MainStack"
                component={MainStack}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="home-outline" size={22} color={color} />
                    ),
                    title: "Home"
                }}
            />
            <Drawer.Screen
                name="My Profile"
                component={ProfileStack}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="account-outline" size={22} color={color} />
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

export default DrawerStack;
