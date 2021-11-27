import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const WhiteButton = ({ text, ...rest }) => {
    return (
        <TouchableOpacity
            style={[styles.signIn, {
                borderColor: '#6F4299',
                borderWidth: 1,
                marginTop: 15
            }]}
            {...rest}
        >
            <Text style={[styles.textSign, {
                color: '#6F4299'
            }]}>{text}</Text>
        </TouchableOpacity>
    );
};
export default WhiteButton;

const styles = StyleSheet.create({
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
