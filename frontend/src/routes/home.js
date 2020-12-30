import { Box, Center, HStack, Icon, Input, InputGroup, InputRightElement, Text, Link, VStack } from '@chakra-ui/core';
import { observer } from 'mobx-react';
import React from 'react';

import 'leaflet/dist/leaflet.css';

import { useStore } from '../store/StoreProvider';
import { Map } from '../components/home/Map';

import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as MapIcon } from '../assets/icons/map.svg';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';
import { ReactComponent as AddIcon } from '../assets/icons/plus-circle.svg';
import { ReactComponent as ClockIcon } from '../assets/icons/clock.svg';
import { ReactComponent as CarIcon } from '../assets/icons/car.svg';

export const Home = observer(() => {
  const store = useStore();

  return (
    <Box w="100vw" h="100vh">
      <Map />

      <Box p={3} maxW="450px" w={['100%', '40%']} zIndex="400" position="fixed" top="0" left="0">
        <InputGroup size="lg" mb={4} display="none">
          <Input variant="map" placeholder="Traži parkiralište" />
          <InputRightElement pointerEvents="none">
            <Icon as={SearchIcon} />
          </InputRightElement>
        </InputGroup>

        <Box
          p={2}
          borderRadius="base"
          bgColor="white"
          boxShadow="lg"
          border={({ space, colors }) => `${space[1]} solid ${colors.accent[500]}`}
        >
          <Center p={2}>
            <Text fontWeight="bold" fontSize="xl">
              {store.currentUser ? `Pozdrav, ${store.currentUser.email}!` : 'Pozdrav!'}
            </Text>
          </Center>

          <VStack spacing={2} fontSize="xl" mt={4} px={2} alignItems="flex-start">
            <Link aria-current px={2}>
              <HStack spacing={4}>
                <Icon as={MapIcon} />
                <Text>Karta</Text>
              </HStack>
            </Link>

            {!store.currentUser && (
              <Link px={2}>
                <HStack spacing={4}>
                  <Icon as={UserIcon} />
                  <Text>Prijava</Text>
                </HStack>
              </Link>
            )}

            {!store.currentUser && (
              <Link px={2}>
                <HStack spacing={4}>
                  <Icon as={AddIcon} />
                  <Text>Registracija</Text>
                </HStack>
              </Link>
            )}

            {store.currentUser && (
              <Link px={2}>
                <HStack spacing={4}>
                  <Icon as={UserIcon} />
                  <Text>Moj profil</Text>
                </HStack>
              </Link>
            )}

            {store.currentUser && (
              <Link px={2}>
                <HStack spacing={4}>
                  <Icon as={ClockIcon} />
                  <Text>Moje rezervacije</Text>
                </HStack>
              </Link>
            )}

            {store.currentUser && (
              <Link px={2}>
                <HStack spacing={4}>
                  <Icon as={CarIcon} />
                  <Text>Moja vozila</Text>
                </HStack>
              </Link>
            )}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
});
