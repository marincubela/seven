import React from 'react';
import { Text, Box, Button, Stack, Link, HStack } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

import { useStore } from '../../../store/StoreProvider';

export const MapPin = ({ parking }) => {
  const store = useStore();

  const isKlijentLoggedIn = store.currentUser?.klijent;
  const isLoggedInTvrtkaOwner = store.currentUser?.tvrtka && store.currentUser?.idRacun === parking.idRacun;

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
          flex={1}
        >
          Pokaži put
        </Button>

        {isKlijentLoggedIn && (
          <Button
            aria-label="Add reservation"
            as={ReactLink}
            flex={1}
            to={{ pathname: '/addReservation', state: parking }}
          >
            Rezerviraj
          </Button>
        )}

        {isLoggedInTvrtkaOwner && (
          <Button
            aria-label="Add reservation"
            as={ReactLink}
            flex={1}
            to={{ pathname: '/parkings/edit', state: parking }}
          >
            Uredi
          </Button>
        )}
      </HStack>
    </Box>
  );
};
