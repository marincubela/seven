import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  Link,
  Stack,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { Link as ReactLink, useHistory, useLocation } from 'react-router-dom';

import { useStore } from '../../store/StoreProvider';
import { destroy } from '../../utils/network';

export const MobileNavigation = ({ sx, ...rest }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const store = useStore();
  const { isOpen, onClose, onOpen } = useDisclosure();

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
    <Box sx={{ ...sx }} {...rest}>
      <HamburgerIcon onClick={onOpen} />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody>
              <Stack spacing="5" mt={6}>
                <Link as={ReactLink} to="/" variant="nav" aria-current={pathname === '/' ? '' : undefined}>
                  Karta
                </Link>

                {isUserLoggedIn && (
                  <Link
                    as={ReactLink}
                    to="/profile"
                    variant="nav"
                    aria-current={pathname === '/profile' ? '' : undefined}
                  >
                    Profil
                  </Link>
                )}

                {isClientLoggedIn && (
                  <Link
                    as={ReactLink}
                    to="/vehicles"
                    variant="nav"
                    aria-current={pathname === '/vehicles' ? '' : undefined}
                  >
                    Vozila
                  </Link>
                )}

                {isCompanyLoggedIn && (
                  <Link
                    as={ReactLink}
                    to="/parkings"
                    variant="nav"
                    aria-current={pathname === '/parkings' ? '' : undefined}
                  >
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
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};
