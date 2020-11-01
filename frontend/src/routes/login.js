import { Box, Text } from '@chakra-ui/core';
import React from 'react';

import logo from '../icons/logo.svg';

export function Login() {
  return (
    <div>
      <Box bgColor="blue.100" py={3}>
        <Text fontSize="lg">Parkiraj me | Login</Text>
      </Box>
      <header>
        <img src={logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}
