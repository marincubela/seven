import { Box, Heading, VStack, Text, Input, HStack, Button, Link, Checkbox, Divider } from '@chakra-ui/core';
import { PinInput, PinInputField } from '@chakra-ui/core';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

export function RegistrationForm() {
  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4">
        Registriraj se
      </Heading>

      <VStack marginY="8" spacing="4" align="stretch">
        <HStack align="stretch">
          <VStack align="baseline">
            <Text as="label">Ime</Text>
            <Input placeholder="Vaše ime" />
          </VStack>
          <VStack align="baseline">
            <Text as="label">Prezime</Text>
            <Input placeholder="Vaše prezime" />
          </VStack>
        </HStack>

        <VStack align="stretch">
          <Text as="label">E-mail adresa</Text>
          <Input placeholder="Vaša e-mail adresa" />
        </VStack>

        <HStack align="stretch">
          <VStack align="baseline">
            <Text as="label">Lozinka</Text>
            <Input type="password" placeholder="Vaša lozinka" />
          </VStack>
          <VStack align="baseline">
            <Text as="label">Ponovljena lozinka</Text>
            <Input type="password" placeholder="Ponovljena lozinka" />
          </VStack>
        </HStack>

        <VStack align="baseline">
          <VStack>
            <Text as="label">Broj kartice</Text>
          </VStack>

          <VStack>
            <HStack spacing="0">
              <PinInput size="em" variant="filled" placeholder="•">
                <PinInputField sx={{ borderBottomLeftRadius: 'base', borderTopLeftRadius: 'base' }} />
                <PinInputField />
                <PinInputField />
                <PinInputField sx={{ borderBottomRightRadius: 'base', borderTopRightRadius: 'base' }} />
                <Divider orientation="vertical" width="80%" />
                <PinInputField sx={{ borderBottomLeftRadius: 'base', borderTopLeftRadius: 'base' }} />
                <PinInputField />
                <PinInputField />
                <PinInputField sx={{ borderBottomRightRadius: 'base', borderTopRightRadius: 'base' }} />
                <Divider orientation="vertical" width="80%" />
                <PinInputField sx={{ borderBottomLeftRadius: 'base', borderTopLeftRadius: 'base' }} />
                <PinInputField />
                <PinInputField />
                <PinInputField sx={{ borderBottomRightRadius: 'base', borderTopRightRadius: 'base' }} />
                <Divider orientation="vertical" width="80%" />
                <PinInputField sx={{ borderBottomLeftRadius: 'base', borderTopLeftRadius: 'base' }} />
                <PinInputField />
                <PinInputField />
                <PinInputField sx={{ borderBottomRightRadius: 'base', borderTopRightRadius: 'base' }} />
              </PinInput>
            </HStack>
          </VStack>

          <VStack>
            <Checkbox border="1rem" borderColor="gray.300">
              Prihvaćam...
            </Checkbox>
            <Checkbox border="1rem" borderColor="gray.300">
              Prihvaćam...
            </Checkbox>
          </VStack>
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
