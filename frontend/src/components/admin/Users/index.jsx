import { Center, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { get } from '../../../utils/network';
import { Clients } from './clients/Clients';
import { Companies } from './companies/Companies';

export const Users = (props) => {
  const [users, setUsers] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    get('user/all')
      .then((res) => setUsers(res.data.users))
      .catch(() => {
        setError(true);
      });
  }, []);

  if (error) {
    return <Center {...props}>Dogodila se pogreška</Center>;
  }

  if (!users) {
    return (
      <Center {...props}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Tabs {...props} isFitted>
      <TabList>
        <Tab>Klijenti</Tab>
        <Tab>Tvrtke</Tab>
      </TabList>

      <TabPanels>
        <TabPanel width="full" p={0}>
          <Clients clients={users.clients} />
        </TabPanel>

        <TabPanel p={0}>
          <Companies companies={users.companies} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
