import React from 'react';
import { Text, Box, Button, Stack, Link, HStack } from '@chakra-ui/react';
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
        <Text fontSize="sm">
          Ukupni broj mjesta: <b>{parking.capacity}</b>
        </Text>
      </Box>
      {parking.freeCapacity <= 10 && (
        <Box>
          <Text fontSize="sm" color="red.500">
            Broj slobodnih mjesta: <b>{parking.freeCapacity}</b>
          </Text>
        </Box>
      )}
      {parking.freeCapacity > 10 && (
        <Box>
          <Text fontSize="sm" color="green.500">
            Broj slobodnih mjesta: <b>{parking.freeCapacity}</b>
          </Text>
        </Box>
      )}

      <HStack color="white">
        <Button
          as={Link}
          href={`https://www.google.com/maps/search/?api=1&query=${parking.coordinates.replace(' ', '')}`}
          target="_blank"
        >
          Pokaži put
        </Button>

        <Stack align="center">
          <Button aria-label="Add reservation" as={ReactLink} to={{ pathname: '/addReservation', state: parking }}>
            Rezerviraj
          </Button>
        </Stack>
      </HStack>
    </Box>
  );
};
