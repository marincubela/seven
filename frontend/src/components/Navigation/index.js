import { Center, HStack, Link } from '@chakra-ui/core';
import React from 'react';
import { Link as ReactLink, useLocation } from 'react-router-dom';

export function Navigation() {
  const { pathname } = useLocation();

  return (
    <Center color="green.700">
      <HStack>
        <ReactLink to="/">
          <Link bgColor={pathname == '/' ? 'red.400' : undefined}>Početna</Link>
        </ReactLink>

        <ReactLink to="/login">
          <Link bgColor={pathname == '/login' ? 'red.400' : undefined}>Prijava</Link>
        </ReactLink>

        <ReactLink to="/registration">
          <Link bgColor={pathname == '/registration' ? 'red.400' : undefined}>Registracija</Link>
        </ReactLink>
      </HStack>
    </Center>
  );
}
