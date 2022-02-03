import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../utils/Colors';

const GrayButton = ({ text, icon, width, ...rest }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            {...rest}
        >
            <LinearGradient
                colors={[Colors.gray, Colors.muted]}
                style={styles.button}
            >
                <Icon style={styles.btnIcon} name={icon} size={22} />
                <Text style={styles.text} color={Colors.white}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default GrayButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        color: Colors.white,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    btnIcon: {
        color: 'white',
    }
});
