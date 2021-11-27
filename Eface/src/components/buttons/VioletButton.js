import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const VioletButton = ({ text, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.signIn}
            onPress={onPress}
        >
            <LinearGradient
                colors={['#6F4299', '#c084fc']}
                style={styles.signIn}
            >
                <Text style={[styles.textSign, {
                    color: '#fff'
                }]}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};
export default VioletButton;

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
