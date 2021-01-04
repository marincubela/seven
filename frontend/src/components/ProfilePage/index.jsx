import { Box, Heading, VStack, Text, HStack, Button } from '@chakra-ui/react';
import React from 'react';
import { observer } from 'mobx-react';
import { Link as ReactLink, useHistory, Link } from 'react-router-dom';
import { destroy } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export const ProfilePage = observer(() => {
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
      <Heading as="h2" size="l" marginY="4">
        Osobni podaci
      </Heading>
      <VStack flex="1" align="baseline">
        <Text as="label">E-mail: {user.email}</Text>
        <Text as="label">OIB: {user.OIB}</Text>
        {user.klijent ? (
          <VStack flex="1" align="baseline">
            <Text as="label">Ime: {user.klijent.firstName}</Text>
            <Text as="label">Prezime: {user.klijent.lastName}</Text>
            <Text as="label">Broj kartice: {user.klijent.cardNumber}</Text>
          </VStack>
        ) : null}

        {user.tvrtka ? (
          <VStack flex="1" align="baseline">
            <Text as="label">Ime: {user.tvrtka.name}</Text>
            <Text as="label">Adresa: {user.tvrtka.address}</Text>
          </VStack>
        ) : null}
      </VStack>

      <HStack spacing="10" padding="5">
        <Button>
          <Link fontWeight="bold" marginLeft="2" as={ReactLink} to="/profile/edit">
            Uredi korisnički račun
          </Link>
        </Button>
        <Button colorScheme="error" onClick={destroyUser}>
          Izbriši korisnički račun
        </Button>
      </HStack>
    </Box>
  );
});
