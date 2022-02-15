import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import LogoTitle from '../components/LogoTitle';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MessagesScreen from '../screens/MessagesScreen';
import SearchScreen from '../screens/SearchScreen';
import isIOS from '../utils/isIOS';
import CreateGroupScreen from '../screens/CreateGroupScreen';

const Tab = createBottomTabNavigator();

const BottomTab = ({ navigation }) => {
    const { user, userToken } = useSelector(state => state.authReducer);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#FFF',
                    position: 'absolute',
                    bottom: 10,
                    marginHorizontal: 20,
                    height: 60,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    },
                    padding: 10,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#6F4299',
                headerStyle: {
                    backgroundColor: '#6F4299',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontSize: 20
                },
                headerTitleAlign: 'center'
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
                        <TouchableOpacity style={{ marginLeft: 20 }}>
                            <Icon
                                name="menu"
                                size={25}
                                onPress={() => { navigation.openDrawer(); }}
                                color="#FFF" />
                        </TouchableOpacity>
                    ),
                    headerTitle: (props) => <LogoTitle {...props} />
                }}
            />

            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{
                            position: 'absolute',
                            top: 5
                        }}>
                            <Icon name="search" size={30} color={color} />
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="Create Group"
                component={CreateGroupScreen}
                options={{
                    tabBarIcon: () => (
                        <View style={{
                            width: 55,
                            height: 55,
                            backgroundColor: '#6F4299',
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: isIOS ? 40 : 60
                        }}>
                            <Icon name="add" size={45} color="#FFF" />
                        </View>
                    ),
                    unmountOnBlur: true
                }}
                listeners={({ navigation }) => ({
                    blur: () => navigation.setParams({ screen: undefined }),
                })}
            />

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
                    tabBarBadge: user.unread_notifications_count,
                }}
            />

            <Tab.Screen
                name="Messages"
                component={MessagesScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{
                            position: 'absolute',
                            top: 5
                        }}>
                            <Icon name="chatbubbles" size={30} color={color} />
                        </View>
                    ),
                    unmountOnBlur: true
                }}
                listeners={({ navigation }) => ({
                    blur: () => navigation.setParams({ screen: undefined }),
                })}
            />
        </Tab.Navigator>
    );
}

export default BottomTab;
