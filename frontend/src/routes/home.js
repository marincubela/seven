import { Box, Center, Text } from '@chakra-ui/core';
import { observer } from 'mobx-react';
import React from 'react';

import { Navigation } from '../components/Navigation';
import { useStore } from '../store/StoreProvider';

export const Home = observer(() => {
  const store = useStore();

  return (
    <Center w="100vw" h="100vh" bgColor="blue.100">
      <Box>
        {store.currentUser ? <Text>Bok, {store.currentUser.email}</Text> : null}
        <Text fontSize="lg">Parkiraj me | Početna</Text>
        <Navigation />
      </Box>
    </Center>
  );
});
