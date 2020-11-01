import { Box, Heading, VStack, Text, Input, HStack, Button, Link } from '@chakra-ui/core';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

export function LoginForm() {
  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4">
        Prijavi se
      </Heading>

      <VStack marginY="8" spacing="4" align="stretch">
        <VStack align="stretch">
          <Text as="label">E-mail adresa</Text>
          <Input placeholder="Tvoja e-mail adresa" />
        </VStack>

        <VStack align="stretch">
          <Text as="label">Lozinka</Text>
          <Input placeholder="Tvoja lozinka" type="password" />
        </VStack>

        <Button variant="solid">Prijava</Button>

        <HStack>
          <Text as="label">
            Nemate korisnički račun?
            <Link fontWeight="bold" marginLeft="2" as={ReactLink} to="/registration">
              Registracija
            </Link>
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
