import { Center, HStack, Link } from '@chakra-ui/core';
import React from 'react';
import { Link as ReactLink, useLocation } from 'react-router-dom';

export function Navigation() {
  const { pathname } = useLocation();

  return (
    <Center color="green.700">
      <HStack>
        <Link as={ReactLink} to="/" varian="nav" aria-current={pathname === '/' ? '' : undefined}>
          Početna
        </Link>

        <Link as={ReactLink} to="/login" varian="nav" aria-current={pathname === '/login' ? '' : undefined}>
          Prijava
        </Link>

        <Link
          as={ReactLink}
          to="/registration"
          varian="nav"
          aria-current={pathname === '/registration' ? '' : undefined}
        >
          Registracija
        </Link>
      </HStack>
    </Center>
  );
}
