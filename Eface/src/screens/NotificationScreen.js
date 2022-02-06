import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';

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
import { FRIEND_REQUEST_RECEIVED, FRIEND_REQUEST_ACCEPTED } from '../enums/notification/type';
import {
    HAS_PENDING_REQUEST_FROM,
    IS_FRIEND,
} from '../enums/friend/status';

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
                        onPress={() => {
                            if (item.type === FRIEND_REQUEST_RECEIVED) {
                                const friend = item.data.friend;
                                friend.friend_status = HAS_PENDING_REQUEST_FROM;
                                navigation.navigate('Profile', {
                                    user: friend,
                                });
                            }
                            else if (item.type === FRIEND_REQUEST_ACCEPTED) {
                                const friend = item.data.friend;
                                friend.friend_status = IS_FRIEND;
                                navigation.navigate('Profile', {
                                    user: friend,
                                });
                            }
                        }}
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
