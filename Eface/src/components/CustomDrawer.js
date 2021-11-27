import React, { useContext } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../utils/Context';
import { useSelector } from 'react-redux';
import { showErrorToast } from '../components/ToastMessage';
import deleteToken from '../api/deleteToken';

const CustomDrawer = (props) => {
    const { logout } = useContext(AuthContext);
    const { user, userToken } = useSelector(state => state.authReducer);

    const handleLogout = async () => {
        try {
            await deleteToken(userToken)
                .then(([statusCode, data]) => {
                    if (statusCode === 200) {
                        logout();
                    }
                }).catch(error => {
                    console.log(error);
                    showErrorToast("Logout Fail.");
                });
        } catch (error) {
            console.log(error);
            showErrorToast("Logout Fail.");
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#8200d6' }}>
                <ImageBackground
                    source={require('../assets/images/menu-bg.jpeg')}
                    style={{ padding: 20 }}>
                    <Image
                        source={require('../assets/images/user-profile.jpg')}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 18,
                            marginBottom: 5,
                        }}>
                        {user.name}
                    </Text>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={handleLogout}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="exit-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 13,
                                color: '#333',
                            }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;
