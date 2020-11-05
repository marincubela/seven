import { Box, Button, Heading, HStack, Text, Link } from '@chakra-ui/core';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

export function RegistrationChoose() {
  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading fontWeight="400" textAlign="center" marginBottom="0.6em">
        <Text fontSize="smaller">Registriraj se kao:</Text>
      </Heading>

      <HStack flex="1">
        <Button variant="solid" height="3em" flex="1">
          <Link as={ReactLink} to="/registrationFirm" flex="1">
            Firma
          </Link>
        </Button>

        <Button variant="solid" height="3em" flex="1">
          <Link as={ReactLink} to="/registrationPerson" flex="1">
            Osoba
          </Link>
        </Button>
      </HStack>
    </Box>
  );
}
