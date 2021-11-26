import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ChatScreen from '../screens/ChatScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import LogoTitle from '../components/LogoTitle';

const Tab = createBottomTabNavigator();

const BottomTab = ({ navigation }) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#FFF',
                    position: 'absolute',
                    bottom: 40,
                    marginHorizontal: 20,
                    height: 60,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    },
                    paddingHorizontal: 20,
                    paddingVertical: 10
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#6F4299',
                headerStyle: {
                    backgroundColor: '#6F4299',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontSize: 20
                }
            }}>

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{
                            position: 'absolute',
                            top: 5
                        }}>
                            <Icon name="home" size={30} color={color} />
                        </View>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity style={{marginLeft: 20}}>
                            <Icon
                                name="menu"
                                size={25}
                                onPress={() => { navigation.openDrawer(); }}
                                color="#FFF" />
                        </TouchableOpacity>
                    ),
                    headerTitle: (props) => <LogoTitle {...props} />
                }} />

            <Tab.Screen
                name="Search"
                component={LoginScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{
                            position: 'absolute',
                            top: 5
                        }}>
                            <Icon name="search" size={30} color={color} />
                        </View>
                    )
                }} />

            <Tab.Screen
                name="FloatingActionButton"
                component={SplashScreen}
                options={{
                    tabBarIcon: () => (
                        <TouchableOpacity>
                            <View style={{
                                width: 55,
                                height: 55,
                                backgroundColor: '#6F4299',
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: Platform.OS == "android" ? 50 : 30
                            }}>
                                <Icon name="add" size={45} color="#FFF" />
                            </View>
                        </TouchableOpacity>
                    )
                }}></Tab.Screen>

            <Tab.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{
                            position: 'absolute',
                            top: 5
                        }}>
                            <Icon name="notifications" size={30} color={color} />
                        </View>
                    ),
                    tabBarBadge: "2"
                }} />

            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{
                            position: 'absolute',
                            top: 5
                        }}>
                            <Icon name="person" size={30} color={color} />
                        </View>
                    )
                }} />
        </Tab.Navigator>
    );
}

export default BottomTab;
