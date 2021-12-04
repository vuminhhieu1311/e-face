import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import getFriends from '../api/getFriends';
import { showErrorToast } from '../components/ToastMessage';
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
} from '../assets/styles/MessagesStyles';

const MessagesScreen = ({ navigation }) => {
    const { user, userToken } = useSelector(state => state.authReducer);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getFriendList();
    }, []);

    const getFriendList = async () => {
        try {
            await getFriends(userToken)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.users) {
                        setFriends(data.users);
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
                data={friends}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Card
                        onPress={() =>
                            navigation.navigate('Chat', {
                                user: item,
                            })
                        }>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={require('../assets/images/user-1.jpg')} />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.name}</UserName>
                                    <PostTime>1 day ago</PostTime>
                                </UserInfoText>
                                <MessageText>Hey there, this is my test. Hey there, this is my test.</MessageText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
        </Container>
    );
};

export default MessagesScreen;
