import { Box, Button, FlatList, Input, VStack } from 'native-base'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import getUsers from '../api/friend/getUsers';
import searchUsers from '../api/friend/searchUsers';
import ProfileCard from '../components/profile/ProfileCard';
import { showErrorToast } from '../components/ToastMessage';
import isIOS from '../utils/isIOS';

const SearchScreen = ({ navigation }) => {
    const { user, userToken } = useSelector(state => state.authReducer);
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = async () => {
        try {
            await getUsers(userToken)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.users) {
                        console.log(data.users);
                        setUsers(data.users);
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

    const onSearchUser = async (keyword) => {
        try {
            await searchUsers(userToken, keyword)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.users) {
                        console.log(data.users);
                        setUsers(data.users);
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
        <VStack paddingBottom={isIOS ? '22%' : '37%'} padding={15} bgColor="#FFFFFF" height="100%">
            <Input
                w="100%"
                py="0"
                value={keyword}
                size="sm"
                onChangeText={(text) => {
                    setKeyword(text);
                    onSearchUser(text);
                }}
                InputRightElement={
                    <Button 
                        size="sm" 
                        rounded="none"
                        w="1/5" 
                        h="full" 
                        bgColor="#6F4299"
                        onPress={() => onSearchUser(keyword)}
                    >
                        Search
                    </Button>
                }
                placeholder="Enter name/email/phone"
                marginBottom={2}
            />
            <FlatList
                data={users}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ProfileCard user={item} navigation={navigation} />
                )}
            />
        </VStack>
    )
};

export default SearchScreen;
