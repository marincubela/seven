import { Center, HStack, Link } from '@chakra-ui/core';
import React from 'react';
import { Link as ReactLink, useLocation } from 'react-router-dom';

export function Navigation() {
  const { pathname } = useLocation();

  return (
    <Center color="green.700">
      <HStack>
        <ReactLink to="/">
          <Link as="span" aria-current={pathname === '/' ? '' : undefined}>
            Početna
          </Link>
        </ReactLink>

        <ReactLink to="/login">
          <Link as="span" aria-current={pathname === '/login' ? '' : undefined}>
            Prijava
          </Link>
        </ReactLink>

        <ReactLink to="/registration">
          <Link as="span" aria-current={pathname === '/registration' ? '' : undefined}>
            Registracija
          </Link>
        </ReactLink>
      </HStack>
    </Center>
  );
}
