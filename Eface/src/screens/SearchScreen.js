import { Box, FlatList, VStack } from 'native-base'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import getUsers from '../api/friend/getUsers';
import ProfileCard from '../components/profile/ProfileCard';
import { showErrorToast } from '../components/ToastMessage';

const SearchScreen = ({ navigation }) => {
    const { user, userToken } = useSelector(state => state.authReducer);
    const [users, setUsers] = useState([]);

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

    return (
        <VStack paddingBottom={20} padding={15} bgColor="#FFFFFF">
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
