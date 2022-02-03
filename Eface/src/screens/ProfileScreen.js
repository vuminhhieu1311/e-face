import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Center, HStack, Image } from 'native-base';
import { scale } from 'react-native-size-matters';
import VioletButton from '../components/buttons/VioletButton';
import GeneralInfo from '../components/profile/GeneralInfo';
import WhiteButton from '../components/buttons/WhiteButton';

const ProfileScreen = () => {
    return (
        <Box>
            <Box style={styles.cover}>
                <Image
                    style={styles.coverImg}
                    source={require('../assets/images/cover.jpg')}
                    alt="cover"
                />
            </Box>
            <Box style={styles.profile} paddingHorizontal={15}>
                <Center>
                    <Image
                        style={styles.avatar}
                        source={require('../assets/images/user-1.jpg')}
                        alt="avatar"
                    />
                </Center>
                <GeneralInfo />
                <HStack justifyContent="space-between" alignItems="center" marginTop="5">
                    <VioletButton text="Add friend" icon="account-plus" style={{width: "47%"}} />
                    <WhiteButton text="Message" icon="message-bulleted" width="47%" />
                </HStack>
            </Box>
        </Box>
    );
};

export default ProfileScreen;

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
