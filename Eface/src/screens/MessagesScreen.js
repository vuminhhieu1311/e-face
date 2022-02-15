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
    RoomName,
    PostTime,
    MessageText,
    TextSection,
} from '../assets/styles/MessagesStyles';
import getRooms from '../api/chat-room/getRooms';
import { GROUP } from '../enums/room/type';

const MessagesScreen = ({ navigation }) => {
    const { user, userToken } = useSelector(state => state.authReducer);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getRoomList();
    }, []);

    const getRoomList = async () => {
        try {
            await getRooms(userToken)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.rooms) {
                        setRooms(data.rooms);
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

    return (
        <Container>
            <FlatList
                data={rooms}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Card
                        onPress={() =>
                            navigation.navigate('Chat', {
                                room: item,
                                refresh: () => getRoomList(),
                            })
                        }
                    >
                        <UserInfo>
                            <UserImgWrapper>
                                <UserAvatar 
                                    size={40} 
                                    bgColors={['#6F4299', '#c084fc', '#ccaabb', '#f472b6', '#a78bfa', '#60a5fa']} 
                                    name={item.type === GROUP ? item.name : item.not_auth_users[0].name}
                                    style={{marginRight: 8}}
                                />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <RoomName>
                                        {item.type === GROUP ? item.name : item.not_auth_users[0].name}
                                    </RoomName>
                                    <PostTime>1 day ago</PostTime>
                                </UserInfoText>
                                <MessageText>
                                    {item.last_message ? item.last_message.text : 'Hey there, this is my test.'}
                                </MessageText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
        </Container>
    );
};

export default MessagesScreen;
