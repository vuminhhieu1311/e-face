import React, { useState, useEffect } from 'react';
import { Box, Image, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

import VioletIconButton from '../buttons/VioletIconButton';
import RedIconButton from '../buttons/RedIconButton';

const ProfileCard = ({ user }) => {
    const [isFriend, setIsFriend] = useState(false);

    useEffect(() => {
        setIsFriend(user.is_friend);
    }, []);

    return (
        <Box paddingVertical={10} flexDirection="row" justifyContent="space-between" width="100%">
            <Box>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        maxWidth: '64%',
                    }}>
                    <Image
                        source={require('../../assets/images/user-1.jpg')}
                        alt="avatar"
                        size={50}
                        borderRadius={100}
                        marginRight={6}
                    />
                    <Box width="100%">
                        <Text fontSize="lg" bold>
                            {user.name}
                        </Text>
                        <Text fontSize="md" opacity="0.5">
                            {user.email}
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
            <Box flexDirection="row" alignItems="center">
                {isFriend ?
                    <RedIconButton icon="account-minus" style={{ width: 45 }} />
                    :
                    <VioletIconButton icon="account-plus" style={{ width: 45 }} />
                }
            </Box>
        </Box>
    );
};

export default ProfileCard;
