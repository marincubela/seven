import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../../store/StoreProvider';
import { PublicNavigation } from './Public';
import { PrivateNavigation } from './Private';

const getDisplayName = (user) => {
  if (user.tvrtka) return user.tvrtka.name;

  if (user.klijent) return `${user.klijent.firstName} ${user.klijent.lastName}`;

  return null;
};

export const Navigation = observer((props) => {
  const store = useStore();

  const isUserLoggedIn = Boolean(store.currentUser);

  const displayName = getDisplayName(store.currentUser);

  return (
    <Box
      p={2}
      borderRadius="base"
      bgColor="white"
      boxShadow="lg"
      border={({ space, colors }) => `${space[1]} solid ${colors.primary[500]}`}
      {...props}
    >
      <Center p={2}>
        <Text fontWeight="bold" fontSize="xl">
          {displayName ? `Pozdrav, ${displayName}!` : 'Dobrodošli!'}
        </Text>
      </Center>

      {isUserLoggedIn && <PrivateNavigation />}

      {!isUserLoggedIn && <PublicNavigation />}
    </Box>
  );
});
