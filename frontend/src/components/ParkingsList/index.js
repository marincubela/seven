import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Link, Text } from '@chakra-ui/core';
import { Link as ReactLink } from 'react-router-dom';
import { get } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export function ParkingsList() {
  const [parkings, setParkings] = useState([]);

  const store = useStore();

  useEffect(() => {
    get(`parking/company/${store.currentUser.idRacun}`)
      .then((res) => {
        if (res.data && res.data.parkings) {
          setParkings(res.data.parkings);
          console.log(res.data.parkings);
        }
      })
      .catch((res) => {
        console.log('eror');
        console.log(res);
      });
  }, []);

  return (
    <Box>
      <Heading>Parkirališta</Heading>
      <Box>
        {parkings.map((p) => (
          <Box key={p.idParkiraliste}>
            <Text>{p.nazivParkiralista}</Text>
          </Box>
        ))}
      </Box>
      <Button>
        <Link as={ReactLink} to="/parkings/add" flex="1">
          Dodaj
        </Link>
      </Button>
    </Box>
  );
}
