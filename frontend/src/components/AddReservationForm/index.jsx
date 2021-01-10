import { Box, Heading, Text, HStack, Button, Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link as ReactLink, useHistory, useLocation } from 'react-router-dom';

import { useStore } from '../../store/StoreProvider';

export function AddReservationForm() {
  const { state: parking } = useLocation();
  const store = useStore();
  const history = useHistory();

  useEffect(() => {
    if (!store.currentUser || !parking) {
      history.replace('/');
    }
  }, []);

  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Center>
        <Heading as="h2" size="xl" marginY="4" padding="4">
          Odaberi tip rezervacije
        </Heading>
      </Center>

      <Center>
        <HStack align="stretch">
          <Button as={ReactLink} variant="solid" px={2} to={{ pathname: '/addOneTimeReservation', state: parking }}>
            <HStack spacing={6}>
              <Text>Jednokratna</Text>
            </HStack>
          </Button>

          <Button as={ReactLink} variant="solid" px={2} to={{ pathname: '/addRepetitiveReservation', state: parking }}>
            <HStack spacing={6}>
              <Text>Ponavljajuća</Text>
            </HStack>
          </Button>

          <Button as={ReactLink} variant="solid" px={2} to={{ pathname: '/addPermanentReservation', state: parking }}>
            <HStack spacing={6}>
              <Text>Trajna</Text>
            </HStack>
          </Button>
        </HStack>
      </Center>
    </Box>
  );
}
