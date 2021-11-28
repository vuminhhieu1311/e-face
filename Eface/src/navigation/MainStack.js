import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import BottomTab from './BottomTab';
import ChatScreen from '../screens/ChatScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import createAgoraToken from '../api/createAgoraToken';
import { showErrorToast } from '../components/ToastMessage';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    const { user, userToken } = useSelector(state => state.authReducer);

    const startVideoCall = async (navigation, partner) => {
        const channelName = `${user.id}-${partner.id}`;
        try {
            await createAgoraToken(channelName, userToken)
                .then(([statusCode, data]) => {
                    console.log(data);
                    if (statusCode === 200) {
                        navigation.navigate('VideoCall', {
                            agoraToken: data.agora_token,
                            channelName,
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Can not retrieve Agora token.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Can not retrieve Agora token.");
        }
    }

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
                    title: route.params.user.name,
                    headerRight: () => (
                        <TouchableOpacity>
                            <Icon
                                name="videocam"
                                size={25}
                                onPress={() => { startVideoCall(navigation, route.params.user) }}
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
