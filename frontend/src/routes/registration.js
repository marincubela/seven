// import { Box, Center, Text } from '@chakra-ui/core';
import { Box, Text, HStack } from '@chakra-ui/core';
import React from 'react';

import { Navigation } from '../components/Navigation';
import { RegistrationForm } from '../components/RegistrationForm';

export function Registration() {
  return (
    <Box marginX="auto" maxWidth="500px" paddingX="2">
      <Box as="header" paddingY="4">
        <HStack spacing="16">
          <Text>Parkiraj me - login</Text>
          <Navigation />
        </HStack>
      </Box>

      <RegistrationForm />
    </Box>
  );
}
