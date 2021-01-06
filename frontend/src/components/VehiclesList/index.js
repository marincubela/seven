import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Button,
  Heading,
  Link,
  HStack,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  // Divider,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CloseIcon } from '@chakra-ui/icons';
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
          }
        })
        .catch((res) => {
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
        setTimeout(() => {
          history.replace('/vehicles');
        }, 5);
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
      });
  }

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const [deleteVehicle, setdeleteVehicle] = useState([]);

  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4" textAlign="center" marginBottom="6">
        Vaša vozila
      </Heading>

      {vehicles.map((veh) => (
        <Box key={veh.idVozilo} h={10} marginBottom="4" marginTop="2" borderRadius="lg" background="white">
          <HStack h="inherit">
            <Box
              bgColor={`${veh.color}`}
              w="10%"
              h={10}
              borderBottomLeftRadius="base"
              borderTopLeftRadius="base"
              marginRight={4}
            />
            <Box w="30%" paddingLeft={1}>
              <Text fontSize="lg">{veh.carName}</Text>
            </Box>
            {/* <Divider orientation="vertical" bgColor="primary.200" w={1} /> */}
            <Box w="30%" paddingLeft={2}>
              <Text fontSize="lg">{veh.registration}</Text>
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
                // handleDelete(veh.idVozilo);
                setIsOpen(true);
                setdeleteVehicle(veh);
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
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Izbriši vozilo
            </AlertDialogHeader>

            <AlertDialogBody>
              Jeste li sigurni da želite izbrisati vozilo <b>{deleteVehicle.carName}</b>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button leftIcon={<CloseIcon />} ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleDelete(deleteVehicle.idVozilo)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
