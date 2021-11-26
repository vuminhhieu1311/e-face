import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = createMaterialBottomTabNavigator();

const HomeStack = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#FFF"
            barStyle={{ backgroundColor: '#6F4299' }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarLabel: 'Updates',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={30} />
                    ),
                    tabBarBadge: "2"
                }}
            />
        </Tab.Navigator>
    );
}

export default HomeStack;
