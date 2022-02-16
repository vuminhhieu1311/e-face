import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import getFriends from '../api/friend/getFriends';

import FriendCard from '../components/friend/FriendCard';
import { showErrorToast } from '../components/ToastMessage';

const HomeScreen = ({ navigation }) => {
    const { user, userToken } = useSelector(state => state.authReducer);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getFriendList();
    }, []);

    const getFriendList = async () => {
        try {
            await getFriends(userToken)
                .then(([statusCode, data]) => {
                    console.log(data);
                    if (statusCode === 200 && data.friends) {
                        setFriends(data.friends);
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
        <View style={styles.container}>
            <FlatList
                data={friends}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <FriendCard user={item} />
                )}
            />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 55,
    },
});
