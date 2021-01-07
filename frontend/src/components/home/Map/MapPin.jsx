import React from 'react';
import { Text, Box, Button, Stack } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

export const MapPin = ({ parking }) => {
  return (
    <Box position="relative">
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          {parking.parkingName}
        </Text>
      </Box>
      <Box>
        <Text size="lg" fontWeight="bold">
          Ukupni broj mjesta: {parking.capacity}
        </Text>
      </Box>
      {parking.freeCapacity <= 10 && (
        <Box>
          <Text size="lg" fontWeight="bold" color="red.500">
            Broj slobodnih mjesta: {parking.freeCapacity}
          </Text>
        </Box>
      )}
      {parking.freeCapacity > 10 && (
        <Box>
          <Text size="lg" fontWeight="bold" color="green.500">
            Broj slobodnih mjesta: {parking.freeCapacity}
          </Text>
        </Box>
      )}
      <Stack align="center" color="white">
        <Button aria-label="Add reservation" as={ReactLink} to={{ pathname: '/addReservation' }}>
          Rezerviraj
        </Button>
      </Stack>
    </Box>
  );
};
