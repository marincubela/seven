import { Box, Text, HStack } from '@chakra-ui/core';
import React from 'react';

import { Navigation } from '../components/Navigation';
import { LoginForm } from '../components/LoginForm';

export function Login() {
  return (
    <Box marginX="auto" maxWidth="500px" paddingX="2">
      <Box as="header" paddingY="4">
        <HStack spacing="16">
          <Text>Parkiraj me - login</Text>
          <Navigation />
        </HStack>
      </Box>

      <LoginForm />
    </Box>
  );
}
