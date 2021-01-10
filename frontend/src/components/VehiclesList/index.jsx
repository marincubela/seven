import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Icon,
  Button,
  Heading,
  Link,
  HStack,
  VStack,
  Stack,
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
import { useMediaQuery } from 'react-responsive';

import { get, destroy } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';
import { ReactComponent as CarIcon } from '../../assets/icons/carIcon.svg';
import { usePrivateRoute } from '../../hooks/usePrivateRoute';

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
  const isDesktop = useMediaQuery({ maxDeviceWidth: 500 });

  const { currentUser } = usePrivateRoute({ redirectOn: (user) => !user?.klijent });

  if (!currentUser) {
    return null;
  }

  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4" textAlign="center" marginBottom="6">
        Vaša vozila
      </Heading>

      {!isDesktop ? (
        vehicles.map((veh) => (
          <Box key={veh.idVozilo} h={10} marginBottom="4" marginTop="2" borderRadius="lg" background="white">
            <HStack h="inherit">
              <Box
                bgColor="primary.100"
                className="car-icon-box"
                w="10%"
                h={10}
                borderBottomLeftRadius="base"
                borderTopLeftRadius="base"
                marginRight={4}
                alignItems="center"
                display="flex"
              >
                <Icon
                  className="car-icon"
                  as={CarIcon}
                  margin="0 auto"
                  h="inherit"
                  w="stretch"
                  padding={1}
                  style={{ color: `${veh.color}` }}
                />
              </Box>
              <Box w="30%" paddingLeft={1}>
                <Text fontSize="lg">{veh.carName}</Text>
              </Box>
              <Box w="30%" paddingLeft={2}>
                <Text fontSize="lg">{veh.registration}</Text>
              </Box>
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
                  setIsOpen(true);
                  setdeleteVehicle(veh);
                }}
              />
            </HStack>
          </Box>
        ))
      ) : (
        <Stack flexDir="row" flexWrap="wrap" gridColumnGap={8} gridRowGap={6}>
          {vehicles.map((veh) => (
            <Box w="40%" key={veh.idVozilo} style={{ marginTop: '0rem', marginLeft: '0.5rem' }} margin="0 auto">
              <VStack>
                <Box
                  bgColor="primary.100"
                  h="1.7rem"
                  w="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderTopRadius="base"
                >
                  <Icon
                    className="car-icon"
                    as={CarIcon}
                    w="auto"
                    h="inherit"
                    style={{ color: `${veh.color}` }}
                    paddingY="0.2rem"
                  />
                </Box>
                <Box
                  h="5rem"
                  w="100%"
                  bgColor="primary.100"
                  style={{ marginTop: '0rem', paddingTop: '0.25rem' }}
                  textAlign="center"
                >
                  <Text>
                    <b>{veh.carName}</b>
                  </Text>
                  <Text marginTop={2}>{veh.registration}</Text>
                </Box>
                <Box h="2rem" w="100%" bgColor="primary.100" style={{ marginTop: '0rem' }} borderBottomRadius="base">
                  <HStack h="100%">
                    <Box margin="0 auto">
                      <IconButton
                        size="xs"
                        as={ReactLink}
                        // marginLeft={4}
                        to={{ pathname: `/vehicles/update`, state: veh }}
                        aria-label="Edit vehicle"
                        icon={<EditIcon />}
                      />
                      <IconButton
                        size="xs"
                        marginLeft={3}
                        aria-label="Delete vehicle"
                        icon={<DeleteIcon />}
                        onClick={() => {
                          setIsOpen(true);
                          setdeleteVehicle(veh);
                        }}
                      />
                    </Box>
                  </HStack>
                </Box>
              </VStack>
            </Box>
          ))}
        </Stack>
      )}

      <Box flex="1" alignItems="center" display="flex" marginTop={4}>
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
