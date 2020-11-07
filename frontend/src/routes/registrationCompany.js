import { Box, Text, HStack } from '@chakra-ui/core';
import React from 'react';

import { Navigation } from '../components/Navigation';
import { RegistrationFormCompany } from '../components/RegistrationFormCompany';

export function RegistrationCompany() {
  return (
    <Box marginX="auto" maxWidth="500px" paddingX="2">
      <Box as="header" paddingY="4">
        <HStack spacing="16">
          <Text>Parkiraj me - login</Text>
          <Navigation />
        </HStack>
      </Box>

      <RegistrationFormCompany />
    </Box>
  );
}
