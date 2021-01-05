import React from 'react';
import { HStack, Icon, Link, Text, VStack } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { observer } from 'mobx-react';

import { ReactComponent as MapIcon } from '../../../assets/icons/map.svg';
import { ReactComponent as UserIcon } from '../../../assets/icons/user.svg';
import { ReactComponent as AddIcon } from '../../../assets/icons/plus-circle.svg';

export const PublicNavigation = observer((props) => {
  return (
    <VStack spacing={2} mt={4} px={2} alignItems="flex-start" {...props}>
      <Link variant="nav" aria-current px={2}>
        <HStack spacing={4}>
          <Icon as={MapIcon} />
          <Text>Karta</Text>
        </HStack>
      </Link>

      <Link as={ReactLink} variant="nav" px={2} to="/login">
        <HStack spacing={4}>
          <Icon as={UserIcon} />
          <Text>Prijava</Text>
        </HStack>
      </Link>

      <Link as={ReactLink} variant="nav" px={2} to="/registration">
        <HStack spacing={4}>
          <Icon as={AddIcon} />
          <Text>Registracija</Text>
        </HStack>
      </Link>
    </VStack>
  );
});
