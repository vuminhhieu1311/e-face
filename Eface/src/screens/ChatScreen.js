import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Pusher from 'pusher-js/react-native';
import { Bubble, GiftedChat, InputToolbar, Send, Time } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import createMessage from '../api/chat-room/createMessage';
import getMessages from '../api/chat-room/getMessages';

const ChatScreen = ({ route }) => {
    const { pusher, userToken } = useSelector(state => state.authReducer);
    const [messages, setMessages] = useState([]);
    const room = route.params?.room;

    useEffect(() => {
        Pusher.logToConsole = true;
        var channel = pusher.subscribe(`presence-chat-room.${room.id}`);

        channel.bind('new_message', (event) => {
            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, [event.message]),
            );
        });

        getMessageList();
    }, []);

    const getMessageList = async () => {
        try {
            await getMessages(userToken, room.id)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.messages) {
                        setMessages(data.messages);
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Can not fetch data.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Can not fetch data.");
        }
    }

    const onSend = useCallback(async (messages = []) => {
        try {
            await createMessage(userToken, room.id, messages[0].text)
                .then(([statusCode, data]) => {
                    console.log(data);
                    setMessages((previousMessages) =>
                        GiftedChat.append(previousMessages, messages),
                    );
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Can not send message.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Can not send message.");
        }
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}
                containerStyle={{
                    marginLeft: 20,
                }}
            >
                <View>
                    <Icon
                        name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={32}
                        color="#a855f7"
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#a855f7',
                    },
                    left: {
                        backgroundColor: '#e4e4e7'
                    }
                }}
            />
        );
    };

    const renderTime = (props) => {
        return (
            <Time
                {...props}
                timeTextStyle={{
                    left: {
                        color: '#52525b'
                    }
                }}
            />
        );
    };

    const renderInputToolbar = (props) => {
        return (
            <InputToolbar
                {...props}
                primaryStyle={{
                    borderWidth: 0.2,
                    borderColor: '#d946ef',
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#d946ef' />
        );
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            renderTime={renderTime}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
            alwaysShowSend
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
        />
    );
};

export default ChatScreen;
