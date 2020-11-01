import { Box, Heading, VStack, Text, Input, HStack } from '@chakra-ui/core';
import React from 'react';

export function LoginForm() {
  return (
    <Box bgColor="blue.100" marginY="8" padding="4" borderRadius="lg">
      <Heading as="h2" size="xl" textAlign="center">
        Prijavi se
      </Heading>

      <VStack>
        <HStack>
          <Text as="label">E-mail adresa</Text>
          <Input placeholder="Tvoja e-mail adresa" />
        </HStack>

        <HStack>
          <Text as="label">Lozinka</Text>
          <Input placeholder="Tvoja lozinka" type="password" />
        </HStack>
      </VStack>
    </Box>
  );
}
