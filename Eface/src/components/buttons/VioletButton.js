import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../utils/Colors';

const VioletButton = ({ text, icon, width, ...rest }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            {...rest}
        >
            <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.button}
            >
                <Icon style={styles.btnIcon} name={icon} size={22} />
                <Text style={styles.text} color="white">{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};
export default VioletButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        color: Colors.white,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    btnIcon: {
        marginRight: 10,
        color: 'white',
    }
});
