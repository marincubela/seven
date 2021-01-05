import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';

import 'leaflet/dist/leaflet.css';

import { Map } from '../components/home/Map';
import { Search } from '../components/home/Search';
import { Navigation } from '../components/home/Navigation';

export const Home = observer(() => {
  return (
    <Box w="100vw" h="100vh">
      <Map />

      <Box p={2} maxW="450px" w={['100%', '40%']} zIndex="400" position="fixed" top="0" left="0">
        <Search mb={4} display="none" />

        <Navigation />
      </Box>
    </Box>
  );
});
