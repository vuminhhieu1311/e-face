import React from 'react';
import { Box, Center, Container, HStack, Text } from 'native-base';

const GeneralInfo = () => {
    return (
        <Box marginTop="15">
            <Center>
                <Text fontSize="3xl" bold>Vu Minh Hieu</Text>
            </Center>
            <HStack justifyContent="space-around" margin="15">
                <Container style={{ alignItems: 'center' }}>
                    <Text fontSize="xl" bold>18</Text>
                    <Text>Posts</Text>
                </Container>
                <Container style={{ alignItems: 'center' }}>
                    <Text fontSize="xl" bold>20M</Text>
                    <Text>Followers</Text>
                </Container>
                <Container style={{ alignItems: 'center' }}>
                    <Text fontSize="xl" bold>32</Text>
                    <Text>Following</Text>
                </Container>
            </HStack>
        </Box>
    );
};

export default GeneralInfo;
