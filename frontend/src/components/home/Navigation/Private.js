import React, { Fragment } from 'react';
import { Button, Divider, HStack, Icon, Link, Text, VStack } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { observer } from 'mobx-react';

import { destroy } from '../../../utils/network';
import { useStore } from '../../../store/StoreProvider';

import { ReactComponent as MapIcon } from '../../../assets/icons/map.svg';
import { ReactComponent as UserIcon } from '../../../assets/icons/user.svg';
import { ReactComponent as ClockIcon } from '../../../assets/icons/clock.svg';
import { ReactComponent as CarIcon } from '../../../assets/icons/car.svg';
import { ReactComponent as AdminIcon } from '../../../assets/icons/admin.svg';

export const PrivateNavigation = observer((props) => {
  const store = useStore();

  const handleLogout = () => {
    destroy('session')
      .then(() => {
        store.setCurrentUser(null);
      })
      .catch(() => {});
  };

  return (
    <VStack spacing={2} mt={4} px={2} alignItems="flex-start" {...props}>
      <Link variant="nav" aria-current px={2}>
        <HStack spacing={4}>
          <Icon as={MapIcon} />
          <Text>Karta</Text>
        </HStack>
      </Link>

      <Link as={ReactLink} variant="nav" px={2} to="/profile">
        <HStack spacing={4}>
          <Icon as={UserIcon} />
          <Text>Moj profil</Text>
        </HStack>
      </Link>

      <Link as={ReactLink} variant="nav" px={2} to="/reservations">
        <HStack spacing={4}>
          <Icon as={ClockIcon} />
          <Text>Moje rezervacije</Text>
        </HStack>
      </Link>

      <Link as={ReactLink} variant="nav" px={2} to="/vehicles">
        <HStack spacing={4}>
          <Icon as={CarIcon} />
          <Text>Moja vozila</Text>
        </HStack>
      </Link>

      {store.currentUser?.isAdmin && (
        <Fragment>
          <Divider />

          <Link as={ReactLink} variant="nav" px={2} to="/admin">
            <HStack spacing={4}>
              <Icon as={AdminIcon} />
              <Text>Admin panel</Text>
            </HStack>
          </Link>
        </Fragment>
      )}

      <Divider />

      <Button variant="link.nav" onClick={handleLogout} px={2}>
        Odjava
      </Button>
    </VStack>
  );
});
