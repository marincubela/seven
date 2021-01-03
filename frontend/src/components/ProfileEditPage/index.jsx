import { Box, Heading, VStack, Text, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { get } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export const ProfileEditPage = observer(() => {
  const store = useStore();
  const history = useHistory();

  if (!store.currentUser) {
    history.push('/');

    return;
  }

  const user = store.currentUser;

  return <Text>Bok</Text>;
});
