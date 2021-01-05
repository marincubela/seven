import { Box, Button, HStack, Link } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { Link as ReactLink, useLocation } from 'react-router-dom';

import { useStore } from '../../store/StoreProvider';
import { destroy } from '../../utils/network';

export const Navigation = observer(() => {
  const { pathname } = useLocation();
  const store = useStore();

  const isUserLoggedIn = Boolean(store.currentUser);

  const handleLogout = () => {
    destroy('session')
      .then(() => {
        store.setCurrentUser(null);
      })
      .catch(() => {});
  };

  return (
    <Box color="secondary.700">
      <HStack spacing="5">
        <Link as={ReactLink} to="/" variant="nav" aria-current={pathname === '/' ? '' : undefined}>
          Početna
        </Link>

        {isUserLoggedIn && (
          <Link as={ReactLink} to="/profil" variant="nav" aria-current={pathname === '/login' ? '' : undefined}>
            Profil
          </Link>
        )}

        {isUserLoggedIn && <Button onClick={handleLogout}>Odjava</Button>}

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
