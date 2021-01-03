import { Box, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { get } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export const ProfilePage = observer(() => {
  const store = useStore();
  const [user, setUser] = useState([]);
  const history = useHistory();

  if (!store.currentUser) {
    history.push('/');
    return;
  }

  useEffect(() => {
    get(`user/${store.currentUser.idRacun}`)
      .then((res) => setUser(res.data.user))
      .catch(() => {});
  }, []);

  console.log(store);

  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="l" marginY="4">
        Osobni podaci
      </Heading>
    </Box>
  );
});
