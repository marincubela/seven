import { Box, HStack, Link } from '@chakra-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { Link as ReactLink, useLocation } from 'react-router-dom';

import { useStore } from '../../store/StoreProvider';

export const Navigation = observer(() => {
  const { pathname } = useLocation();
  const store = useStore();

  const isUserLoggedIn = Boolean(store.currentUser);

  return (
    <Box color="teal.700">
      <HStack spacing="5">
        <Link as={ReactLink} to="/" variant="nav" aria-current={pathname === '/' ? '' : undefined}>
          Početna
        </Link>

        {isUserLoggedIn && (
          <Link as={ReactLink} to="/" variant="nav" aria-current={pathname === '/login' ? '' : undefined}>
            Profil
          </Link>
        )}

        {!isUserLoggedIn && (
          <Link as={ReactLink} to="/login" variant="nav" aria-current={pathname === '/login' ? '' : undefined}>
            Prijava
          </Link>
        )}

        {!isUserLoggedIn && (
          <Link
            as={ReactLink}
            to="/registration"
            variant="nav"
            aria-current={
              pathname === '/registration' ||
              pathname === '/registration/company' ||
              pathname === '/registration/person'
                ? ''
                : undefined
            }
          >
            Registracija
          </Link>
        )}
      </HStack>
    </Box>
  );
});
