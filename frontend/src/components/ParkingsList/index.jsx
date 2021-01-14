import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Flex,
  Heading,
  HStack,
  Button,
  Spacer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { destroy, get } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';
import { usePrivateRoute } from '../../hooks/usePrivateRoute';

export function ParkingsList() {
  const [parkings, setParkings] = useState([]);

  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const toast = useToast();

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const [deleteParking, setdeleteParking] = useState([]);

  useEffect(() => {
    if (store.currentUser) {
      get(`parking?company=${store.currentUser.idRacun}`)
        .then((res) => {
          if (res.data && res.data.parkings) {
            setParkings(res.data.parkings);
          }
        })
        .catch((res) => {
          if (res.errors && res.errors[0] && res.errors[0].message) {
            setErrorMessage(res.errors[0].message);
          }
        });
    } else {
      history.replace('/');
    }
  }, []);

  function handleDelete(id) {
    destroy(`parking/${id}`)
      .then(() => {
        setIsOpen(false);
        history.replace('/');
        setTimeout(() => history.push('/parkings'), 1);
        toast({
          title: 'Parkiralište obrisano',
          status: 'success',
          position: 'top-right',
        });
      })
      .catch((err) => {
        console.log('eror');
        console.log(err);

        toast({
          title: 'Problem prilikom brisanja parkirališta',
          status: 'error',
          position: 'top-right',
        });
      });
  }

  const { currentUser } = usePrivateRoute({ redirectOn: (user) => !user?.tvrtka });

  if (!currentUser?.tvrtka) {
    return null;
  }

  return (
    <Box>
      <Flex>
        <Heading>Moja parkirališta</Heading>
        <Spacer />
        <Button aria-label="Add parking" as={ReactLink} to="/parkings/add" leftIcon={<AddIcon />} size="lg">
          Dodaj
        </Button>
      </Flex>

      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Naziv</Th>
            <Th isNumeric>Broj mjesta</Th>
            <Th isNumeric>Broj invalidskih mjesta</Th>
            <Th>Tip parkirališta</Th>
            <Th isNumeric>Jednokratna rezervacija</Th>
            <Th isNumeric>Ponavljajuća rezervacija</Th>
            <Th isNumeric>Trajna rezervacija</Th>
          </Tr>
        </Thead>
        <Tbody>
          {parkings.map((p) => (
            <Tr key={p.idParkiraliste}>
              <Td>{p.parkingName}</Td>
              <Td isNumeric>{p.capacity}</Td>
              <Td isNumeric>{p.disabledCapacity}</Td>
              <Td>{p.parkingType}</Td>
              <Td isNumeric>{p.oneTimePrice} kn</Td>
              <Td isNumeric>{p.repetitivePrice} kn</Td>
              <Td isNumeric>{p.permanentPrice} kn</Td>
              <Td>
                <HStack align="center">
                  <IconButton
                    aria-label="Edit parking"
                    icon={<EditIcon />}
                    as={ReactLink}
                    to={{ pathname: '/parkings/edit', state: p }}
                  />

                  <IconButton
                    colorScheme="red"
                    aria-label="Delete parking"
                    icon={<DeleteIcon />}
                    onClick={() => {
                      setIsOpen(true);
                      setdeleteParking(p);
                    }}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Text color="error.500">{errorMessage}</Text>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Izbriši parkiralište
            </AlertDialogHeader>

            <AlertDialogBody>
              Jeste li sigurni da želite izbrisati parkiralište <b>{deleteParking.parkingName}</b>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button leftIcon={<CloseIcon />} ref={cancelRef} onClick={onClose}>
                Odustani
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleDelete(deleteParking.idParkiraliste)}
                ml={3}
              >
                Izbriši
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
