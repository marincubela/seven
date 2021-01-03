import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Heading, Link } from '@chakra-ui/core';
import { Link as ReactLink } from 'react-router-dom';
import { get } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export function VehiclesList() {
  const [vehicles, setVehicles] = useState([]);

  const store = useStore();

  // console.log(store.currentUser.idRacun);
  useEffect(() => {
    get(`vehicle/client/${store.currentUser.idRacun}`)
      .then((res) => {
        if (res.data && res.data.vehicles) {
          setVehicles(res.data.vehicles);
          console.log(res.data.vehicles);
        }
      })
      .catch((res) => {
        console.log('erorrrrrrr');
        console.log(res);
      });
  }, []);

  return (
    <Box>
      <Heading>vozila</Heading>

      <Box>
        {vehicles.map((veh) => (
          <Box key={veh.idVozilo}>
            <Text>{veh.color}</Text>
          </Box>
        ))}
      </Box>
      <Button>
        <Link as={ReactLink} to="/vehicles/add" flex="1">
          dodaj
        </Link>
      </Button>
    </Box>
  );
}
