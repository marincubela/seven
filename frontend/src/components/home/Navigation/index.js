import { Box, Center, Text } from '@chakra-ui/core';
import React from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../../store/StoreProvider';
import { PublicNavigation } from './Public';
import { PrivateNavigation } from './Private';

export const Navigation = observer((props) => {
  const store = useStore();

  const isUserLoggedIn = Boolean(store.currentUser);

  return (
    <Box
      p={2}
      borderRadius="base"
      bgColor="white"
      boxShadow="lg"
      border={({ space, colors }) => `${space[1]} solid ${colors.accent[500]}`}
      {...props}
    >
      <Center p={2}>
        <Text fontWeight="bold" fontSize="xl">
          {isUserLoggedIn ? `Pozdrav, ${store.currentUser.email}!` : 'Pozdrav!'}
        </Text>
      </Center>

      {isUserLoggedIn && <PrivateNavigation />}

      {!isUserLoggedIn && <PublicNavigation />}
    </Box>
  );
});
