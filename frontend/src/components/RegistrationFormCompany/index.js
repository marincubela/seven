import {
  Box,
  Heading,
  VStack,
  Text,
  Input,
  HStack,
  Button,
  Link,
  Checkbox,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/core';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

export function RegistrationFormCompany() {
  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4">
        Registriraj se
      </Heading>

      <VStack flex="1" align="stretch">
        <HStack align="stretch">
          <VStack flex="1" align="baseline">
            <Text as="label">Naziv tvrtke</Text>
            <Input placeholder="Naziv tvrtke" />
          </VStack>
        </HStack>

        <VStack flex="1" align="stretch">
          <Text as="label">E-mail adresa</Text>
          <Input placeholder="Vaša e-mail adresa" />
        </VStack>

        <HStack align="stretch">
          <VStack flex="1" align="baseline">
            <Text as="label">Lozinka</Text>
            <Input type="password" placeholder="Vaša lozinka" />
          </VStack>

          <VStack flex="1" align="baseline">
            <Text as="label">Ponovljena lozinka</Text>
            <Input type="password" placeholder="Ponovljena lozinka" />
          </VStack>
        </HStack>

        <VStack flex="1" align="stretch">
          <Text as="label">OIB</Text>
          <NumberInput>
            <NumberInputField placeholder="Vaš OIB" />
          </NumberInput>
        </VStack>

        <VStack align="start">
          <Checkbox border="1rem">Prihvaćam...</Checkbox>
          <Checkbox border="1rem">Prihvaćam...</Checkbox>
        </VStack>

        <Button variant="solid">Registracija</Button>

        <HStack>
          <Text as="label">
            Već imate korisnički račun?
            <Link fontWeight="bold" marginLeft="2" as={ReactLink} to="/login">
              Prijava
            </Link>
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
