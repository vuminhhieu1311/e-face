import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { FormControl, Stack, View } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FormInput = ({ label, icon, placeholder, error, children, ...rest }) => {
    return (
        <FormControl isRequired mb="5">
            <Stack mx="4">
                <FormControl.Label
                    _text={{
                        fontSize: 'lg',
                    }}>{label}</FormControl.Label>
                <View style={styles.action}>
                    <Icon
                        name={icon}
                        size={20}
                    />
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        {...rest}
                    />
                    {children}
                </View>
                {error ?
                        <FormControl.HelperText _text={{ color: '#b91c1c' }}>
                            {error}
                        </FormControl.HelperText> : null
                    }
            </Stack>
        </FormControl>
    );
};

export default FormInput;

const styles = StyleSheet.create({
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
});
