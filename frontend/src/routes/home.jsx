import {
  Box,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';

import 'leaflet/dist/leaflet.css';

import { Map } from '../components/home/Map';
import { Search } from '../components/home/Search';
import { Navigation } from '../components/home/Navigation';

export const Home = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w="100vw" h="100vh">
      <Map />

      <Box
        display={['none', null, 'block']}
        maxW={[null, null, 'lg']}
        minWidth={[null, null, 'sm']}
        w={['full', null, '45%']}
        zIndex="400"
        position="fixed"
        top={2}
        left={2}
        borderRadius="base"
        bgColor="white"
        boxShadow="lg"
        border={({ space, colors }) => `${space[1]} solid ${colors.primary[500]}`}
      >
        <Search mb={4} display="none" />

        <Navigation />
      </Box>

      <IconButton
        as={HamburgerIcon}
        display={[null, null, 'none']}
        onClick={onOpen}
        zIndex="400"
        position="fixed"
        bottom="4"
        left="4"
        borderRadius="full"
        p={2}
      />

      <Modal isOpen={isOpen} onClose={onClose} closeOnEsc closeOnOverlayClick zIndex="500" motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent containerProps={{ bottom: '0', top: 'unset', alignItems: 'flex-end' }} mb="0">
          <ModalCloseButton />
          <ModalBody>
            <Navigation />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
});
