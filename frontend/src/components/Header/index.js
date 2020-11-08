import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Text, Flex, Box } from '@chakra-ui/core';

import { Navigation } from '../Navigation';

export const Header = (props) => {
  return (
    <Box paddingY="3" paddingX="5" bgColor="primary.200">
      <Flex as="header" align="center" justifyContent="space-between" maxW="1080" {...props}>
        <Text as={ReactLink} to="/" color="secondary.800" fontWeight="bold" fontSize="3xl" cursor="pointer">
          Parkiraj me
        </Text>

        <Navigation />
      </Flex>
    </Box>
  );
};
