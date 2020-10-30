import React from 'react';
import { ChakraProvider, extendTheme, Box, Text } from '@chakra-ui/core';

import logo from './logo.svg';
import customTheme from './styles/theme';

function App() {
  return (
    <ChakraProvider theme={extendTheme(customTheme)}>
      <div className="App">
        <Box bgColor="blue.100" py={3}>
          <Text fontSize="lg">Parkiraj me</Text>
        </Box>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
