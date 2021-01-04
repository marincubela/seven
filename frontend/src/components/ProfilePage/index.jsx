import { Box, Heading, Text, HStack, Button, Stack } from '@chakra-ui/react';
import React, { Fragment } from 'react';
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
      <Heading as="h2" size="xl" marginY="4">
        Osobni podaci
      </Heading>
      <Stack>
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

        {user.klijent ? (
          <Fragment>
            <Box>
              <Text fontSize="sm">Ime</Text>
              <Text fontSize="lg" fontWeight="bold" color="primary.600">
                {user.klijent.firstName}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm">Ime</Text>
              <Text fontSize="lg" fontWeight="bold" color="primary.600">
                {user.klijent.lastName}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm">Ime</Text>
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
          <Button colorScheme="error" onClick={destroyUser}>
            Izbriši korisnički račun
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
});
