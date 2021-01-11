import { Box, Button, HStack, Link } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Link as ReactLink, useHistory, useLocation } from 'react-router-dom';

import { useStore } from '../../store/StoreProvider';
import { destroy } from '../../utils/network';
import { MobileNavigation } from './MobileNavigation';

export const Navigation = observer(() => {
  const { pathname } = useLocation();
  const history = useHistory();
  const store = useStore();

  const isClientLoggedIn = Boolean(store.currentUser?.klijent);
  const isCompanyLoggedIn = Boolean(store.currentUser?.tvrtka);
  const isUserLoggedIn = Boolean(store.currentUser);

  const handleLogout = () => {
    destroy('session')
      .then(() => {
        store.setCurrentUser(null);
        history.push('/');
      })
      .catch(() => {});
  };

  return (
    <Fragment>
      <MobileNavigation display={[null, null, 'none']} />

      <Box color="secondary.700" display={['none', null, 'block']}>
        <HStack spacing="5">
          <Link as={ReactLink} to="/" variant="nav" aria-current={pathname === '/' ? '' : undefined}>
            Karta
          </Link>

          {isUserLoggedIn && (
            <Link as={ReactLink} to="/profile" variant="nav" aria-current={pathname === '/profile' ? '' : undefined}>
              Profil
            </Link>
          )}

          {isClientLoggedIn && (
            <Link as={ReactLink} to="/vehicles" variant="nav" aria-current={pathname === '/vehicles' ? '' : undefined}>
              Vozila
            </Link>
          )}

          {isClientLoggedIn && (
            <Link
              as={ReactLink}
              to="/reservations"
              variant="nav"
              aria-current={pathname.startsWith('/reservations') ? '' : undefined}
            >
              Rezervacije
            </Link>
          )}

          {isCompanyLoggedIn && (
            <Link as={ReactLink} to="/parkings" variant="nav" aria-current={pathname === '/parkings' ? '' : undefined}>
              Parkirališta
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
    </Fragment>
  );
});
