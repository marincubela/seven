import React from 'react';
import { Text, Box } from '@chakra-ui/react';

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
    </Box>
  );
};
