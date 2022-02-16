import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { IMAGE_URL } from '../../utils/Config';

const FriendCard = ({ user, navigation }) => {
    return (
        <View
            style={{
                paddingBottom: 10,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.1,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 15,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={{ uri: `${IMAGE_URL}${user.profile.avatar}` }}
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                    />
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {user.name}
                        </Text>
                    </View>
                </View>
                <Feather name="more-vertical" style={{ fontSize: 20 }} />
            </View>
            <View
                style={{
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    source={{ uri: `${IMAGE_URL}${user.profile.cover_photo}` }}
                    style={{ width: '100%', height: 300 }}
                />
            </View>
        </View>
    );
}

export default FriendCard;
