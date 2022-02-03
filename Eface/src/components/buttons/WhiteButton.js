import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../utils/Colors';

const WhiteButton = ({ text, icon, width, ...rest }) => {
    return (
        <TouchableOpacity
            style={[styles.button, {
                width,
            }]}
            {...rest}
        >
            <Icon style={styles.btnIcon} name={icon} size={22} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};
export default WhiteButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: Colors.primary,
        borderWidth: 1,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    btnIcon: {
        marginRight: 5,
        color: Colors.primary,
    }
});
