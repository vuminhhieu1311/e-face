import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../utils/Colors';

const VioletIconButton = ({ icon, width, ...rest }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            {...rest}
        >
            <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.button}
            >
                <Icon style={styles.btnIcon} name={icon} size={30} />
            </LinearGradient>
        </TouchableOpacity>
    );
};
export default VioletIconButton;

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
    },
    btnIcon: {
        color: 'white',
    }
});
