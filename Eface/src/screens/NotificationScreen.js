import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';

import { showErrorToast } from '../components/ToastMessage';
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserInfoText,
    NotificationText,
    PostTime,
    TextSection,
} from '../assets/styles/MessagesStyles';
import getRooms from '../api/chat-room/getRooms';
import { GROUP } from '../enums/room/type';

const NotificationScreen = ({ navigation }) => {
    const { user, userToken } = useSelector(state => state.authReducer);

    return (
        <Container>
            <FlatList
                data={user.notifications}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Card
                        onPress={() =>
                            navigation.navigate('Chat', {
                                room: item,
                            })
                        }
                    >
                        <UserInfo>
                            <UserImgWrapper>
                                <UserAvatar 
                                    size={40} 
                                    bgColors={['#6F4299', '#c084fc', '#ccaabb', '#f472b6', '#a78bfa', '#60a5fa']} 
                                    name={item.data.friend.name}
                                    style={{marginRight: 8}}
                                />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <NotificationText>{item.data.message}</NotificationText>
                                    <PostTime>1 day ago</PostTime>
                                </UserInfoText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
        </Container>
    );
};

export default NotificationScreen;
