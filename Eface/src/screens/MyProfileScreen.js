import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Center, HStack, Image } from 'native-base';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';

import GeneralInfo from '../components/profile/GeneralInfo';
import WhiteButton from '../components/buttons/WhiteButton';

const MyProfileScreen = ({ navigation }) => {
    const { user, userToken } = useSelector(state => state.authReducer);

    return (
        <Box>
            <Box style={styles.cover}>
                <Image
                    style={styles.coverImg}
                    source={require('../assets/images/cover-avt.jpeg')}
                    alt="cover"
                />
            </Box>
            <Box style={styles.profile} paddingHorizontal={15}>
                <Center>
                    <UserAvatar
                        size={140}
                        bgColor="#f472b6"
                        name={user.name}
                    />
                </Center>
                <GeneralInfo user={user} />
                <HStack justifyContent="space-between" alignItems="center" marginTop="5">
                    <WhiteButton
                        text="Edit Profile"
                        icon="account-edit"
                        width="100%"
                    />
                </HStack>
            </Box>
        </Box>
    );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
    cover: {
        height: scale(200),
        marginBottom: scale(85),
    },
    coverImg: {
        height: '100%',
        width: '100%',
    },
    profile: {
        width: '100%',
        position: 'absolute',
        height: scale(100),
        top: scale(140),
    },
    avatar: {
        height: scale(150),
        width: scale(150),
        borderRadius: scale(75),
        borderColor: 'white',
        borderWidth: scale(3),
    },
});
