import {
  Box,
  Heading,
  Text,
  HStack,
  Button,
  Stack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react';
import { Link as ReactLink, useHistory, Link } from 'react-router-dom';
import { DeleteIcon, EditIcon, AddIcon, CloseIcon } from '@chakra-ui/icons';
import { destroy } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export const ProfilePage = observer(() => {
  const [errorMessage, setErrorMessage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const store = useStore();
  const history = useHistory();

  if (!store.currentUser) {
    history.push('/');

    return null;
  }

  const user = store.currentUser;

  function destroyUser() {
    destroy(`user/${user.idRacun}`).then(() => {
      store.setCurrentUser(null);
      history.push('/');
    });
  }

  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4">
        Osobni podaci
      </Heading>
      <Stack>
        {user.klijent ? (
          <Fragment>
            <Box>
              <Text fontSize="sm">Ime</Text>
              <Text fontSize="lg" fontWeight="bold" color="primary.600">
                {user.klijent.firstName}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm">Prezime</Text>
              <Text fontSize="lg" fontWeight="bold" color="primary.600">
                {user.klijent.lastName}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm">Broj kreditne kartice</Text>
              <Text fontSize="lg" fontWeight="bold" color="primary.600">
                {user.klijent.cardNumber}
              </Text>
            </Box>
          </Fragment>
        ) : null}

        {user.tvrtka ? (
          <Fragment>
            <Box>
              <Text fontSize="sm">Ime</Text>
              <Text fontSize="lg" fontWeight="bold" color="primary.600">
                {user.tvrtka.name}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm">Adresa sjedišta</Text>
              <Text fontSize="lg" fontWeight="bold" color="primary.600">
                {user.tvrtka.address}
              </Text>
            </Box>
          </Fragment>
        ) : null}

        <Box>
          <Text fontSize="sm">E-mail</Text>
          <Text fontSize="lg" fontWeight="bold" color="primary.600">
            {user.email}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm">OIB</Text>
          <Text fontSize="lg" fontWeight="bold" color="primary.600">
            {user.OIB}
          </Text>
        </Box>

        <HStack spacing="10" padding="5">
          <Button>
            {user.klijent ? (
              <Link fontWeight="bold" marginLeft="2" as={ReactLink} to="/profile/edit/person">
                Uredi korisnički račun
              </Link>
            ) : null}

            {user.tvrtka ? (
              <Link fontWeight="bold" marginLeft="2" as={ReactLink} to="/profile/edit/company">
                Uredi korisnički račun
              </Link>
            ) : null}
          </Button>
          <Button colorScheme="error" onClick={onOpen}>
            Izbriši korisnički račun
          </Button>
        </HStack>
      </Stack>

      <Text color="error.500">{errorMessage}</Text>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Izbriši račun
            </AlertDialogHeader>

            <AlertDialogBody>Jeste li sigurni da želite izbrisati račun?</AlertDialogBody>

            <AlertDialogFooter>
              <Button leftIcon={<CloseIcon />} onClick={onClose}>
                Odustani
              </Button>
              <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={() => destroyUser()} ml={3}>
                Obriši
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
});
