import { Box, Button, Heading, HStack, Text } from '@chakra-ui/core';
import React from 'react';
// import { Link as ReactLink } from 'react-router-dom';

export function RegistrationChoose() {
  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading fontWeight="400" textAlign="center" marginBottom="0.6em">
        <Text fontSize="smaller">Registriraj se kao:</Text>
      </Heading>

      <HStack>
        <Button variant="solid" height="3em" flex="1">
          Firma
        </Button>
        <Button variant="solid" height="3em" flex="1">
          Osoba
        </Button>
      </HStack>
    </Box>
  );
}
