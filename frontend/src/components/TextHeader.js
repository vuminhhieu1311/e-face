import React from 'react';
import { Heading } from 'native-base';

const TextHeader = ({ text }) => {
    return (
        <Heading size="lg" fontSize={30} color="#6F4299" textAlign="center" my="3">
            {text}
        </Heading>
    );
};
export default TextHeader;
