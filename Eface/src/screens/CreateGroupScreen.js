import { Box, Button, FlatList, Input, Text, VStack, Image, Checkbox, FormControl } from 'native-base'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import UserAvatar from 'react-native-user-avatar';

import getUsers from '../api/friend/getUsers';
import searchUsers from '../api/friend/searchUsers';
import { showErrorToast } from '../components/ToastMessage';
import isIOS from '../utils/isIOS';
import createRoom from '../api/chat-room/createRoom';

const CreateGroupScreen = ({ navigation }) => {
    const { user, userToken } = useSelector(state => state.authReducer);
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [name, setName] = useState('');
    const [userIds, setUserIds] = useState([]);
    const [nameError, setNameError] = useState('');

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

    const onCreateRoom = async () => {
        try {
            await createRoom(userToken, name, userIds)
                .then(([statusCode, data]) => {
                    if (statusCode === 200 && data.room) {
                        navigation.navigate('Messages');
                    } else if (statusCode === 422) {
                        if (data.errors.name) {
                            setNameError(data.errors.name);
                        }
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Can not create group chat.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Can not create group chat.");
        }
    }

    return (
        <VStack paddingBottom={isIOS ? '22%' : '37%'} padding={15} bgColor="#FFFFFF" height="100%">
            <FormControl>
                {nameError ?
                    <FormControl.HelperText _text={{ color: '#b91c1c' }}>
                        {nameError}
                    </FormControl.HelperText> : null
                }
                <Input
                    w="100%"
                    py="0"
                    value={name}
                    size="sm"
                    onChangeText={(text) => {
                        setName(text);
                    }}
                    InputRightElement={
                        <Button
                            size="sm"
                            rounded="none"
                            w="1/5"
                            h="full"
                            bgColor="#6F4299"
                            onPress={onCreateRoom}
                        >
                            Create
                        </Button>
                    }
                    placeholder="Group name"
                    marginBottom={2}
                />
            </FormControl>
            <Text fontSize="md" bold marginBottom={2}>Add members</Text>
            <Input
                w="100%"
                value={keyword}
                size="sm"
                onChangeText={(text) => {
                    setKeyword(text);
                    onSearchUser(text);
                }}
                placeholder="Search"
                marginBottom={2}
            />
            <FlatList
                data={users}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Box paddingVertical={10} flexDirection="row" justifyContent="space-between" width="100%">
                        <Box>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    maxWidth: '80%',
                                }}
                            >
                                <UserAvatar
                                    size={40}
                                    bgColors={['#6F4299', '#c084fc', '#ccaabb', '#f472b6', '#a78bfa', '#60a5fa']}
                                    name={item.name}
                                    style={{ marginRight: 15 }}
                                />
                                <Box width="100%">
                                    <Text fontSize="lg" bold>
                                        {item.name}
                                    </Text>
                                    <Text fontSize="md" opacity="0.5">
                                        {item.email}
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                        </Box>
                        <Box flexDirection="row" alignItems="center">
                            <Checkbox
                                value="test"
                                colorScheme="purple"
                                accessibilityLabel="This is a dummy checkbox"
                                onChange={(state) => {
                                    if (state) {
                                        setUserIds((state) => ([...state, item.id]));
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                )}
            />
        </VStack>
    )
};

export default CreateGroupScreen;
