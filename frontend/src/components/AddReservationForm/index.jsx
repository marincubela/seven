import { Box, Heading, Text, HStack, Button, Center } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

export function AddReservationForm() {
  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Center>
        <Heading as="h2" size="xl" marginY="4" padding="4">
          Odaberi tip rezervacije
        </Heading>
      </Center>

      <Center>
        <HStack align="stretch">
          <Button as={ReactLink} variant="solid" px={2} to="/addOneTimeReservation">
            <HStack spacing={6}>
              <Text>Jednokratna</Text>
            </HStack>
          </Button>

          <Button as={ReactLink} variant="solid" px={2} to="/addRepetitiveReservation">
            <HStack spacing={6}>
              <Text>Ponavljajuća</Text>
            </HStack>
          </Button>

          <Button as={ReactLink} variant="solid" px={2} to="/addPermanentReservation">
            <HStack spacing={6}>
              <Text>Trajna</Text>
            </HStack>
          </Button>
        </HStack>
      </Center>
    </Box>
  );
}
