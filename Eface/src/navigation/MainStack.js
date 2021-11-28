import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import ChatScreen from '../screens/ChatScreen';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoCallScreen from '../screens/VideoCallScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="BottomTab"
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
                name="BottomTab"
                component={BottomTab}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={({ route, navigation }) => ({
                    title: route.params.userName,
                    headerRight: () => (
                        <TouchableOpacity>
                            <Icon
                                name="videocam"
                                size={25}
                                onPress={() => { navigation.navigate('VideoCall'); }}
                                color="#FFF"></Icon>
                        </TouchableOpacity>
                    )
                })}
            />
            <Stack.Screen
                name="VideoCall"
                component={VideoCallScreen}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    );
};

export default MainStack;
