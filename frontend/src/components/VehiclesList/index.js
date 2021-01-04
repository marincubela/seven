import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Heading, Link, HStack, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Link as ReactLink, useHistory } from 'react-router-dom';

import { get, destroy } from '../../utils/network';
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

  function handleDelete(idVehicle) {
    destroy(`vehicle/${idVehicle}`)
      .then(() => {
        history.replace('/');
        // history.go(0);
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
      });
  }

  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4" textAlign="center">
        vozila
      </Heading>

      {vehicles.map((veh) => (
        <Box key={veh.idVozilo} h={10} marginY="4" borderRadius="lg" background="white">
          <HStack h="inherit">
            <Box
              bgColor={`${veh.color}`}
              w="10%"
              h={10}
              borderBottomLeftRadius="base"
              borderTopLeftRadius="base"
              marginRight={4}
            />
            <Box w="30%">
              <Text>{veh.carName}</Text>
            </Box>
            {/* <Divider orientation="vertical" bgColor="primary.200" w={1} /> */}
            <Box w="30%">
              <Text>{veh.registration}</Text>
            </Box>
            {/* <Divider orientation="vertical" bgColor="primary.200" w={1} /> */}
            <Box w="10%" />
            <IconButton
              as={ReactLink}
              to={{ pathname: `/vehicles/update`, state: veh }}
              aria-label="Edit vehicle"
              icon={<EditIcon />}
            />
            <IconButton
              aria-label="Delete vehicle"
              icon={<DeleteIcon />}
              onClick={() => {
                handleDelete(veh.idVozilo);
              }}
            />
          </HStack>
          {/* <Divider orientation="horizontal" height={2} bgColor="primary.200" /> */}
        </Box>
      ))}
      <Box flex="1" alignItems="center" display="flex">
        <Button margin="auto">
          <Link as={ReactLink} to="/vehicles/add">
            Dodaj
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
