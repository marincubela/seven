import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Heading, Link } from '@chakra-ui/core';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { get } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export function VehiclesList() {
  const history = useHistory();
  const [vehicles, setVehicles] = useState([]);

  const store = useStore();

  useEffect(() => {
    if (store.currentUser) {
      get(`vehicle?client=${store.currentUser.idRacun}`)
        .then((res) => {
          if (res.data && res.data.vehicles) {
            setVehicles(res.data.vehicles);
            console.log(res.data.vehicles);
          }
        })
        .catch((res) => {
          // handle error
          console.log('erorrrrrrr');
          console.log(res);
        });
    } else {
      history.replace('/');
    }
  }, []);

  //registration: string;
  // carName: string;
  // color: boolean;
  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4">
        vozila
      </Heading>

      {vehicles
        ? vehicles.map((veh) => (
            <Box key={veh.idVozilo}>
              <Text>{veh.color}</Text>
            </Box>
          ))
        : null}

      <Button>
        <Link as={ReactLink} to="/vehicles/add" flex="1">
          Dodaj
        </Link>
      </Button>
    </Box>
  );
}
