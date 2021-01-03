import { Button, Center, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/core';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { get } from '../../../utils/network';

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

  console.log(users);

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
    <Tabs {...props}>
      <TabList>
        <Tab>Klijenti</Tab>
        <Tab>Tvrtke</Tab>
      </TabList>

      <TabPanels>
        <TabPanel width="full">
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Ime</Th>
                <Th>Prezime</Th>
                <Th>E-mail</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {users.clients.map(({ idRacun, firstName, lastName, email }) => (
                <Tr key={idRacun}>
                  <Td>{idRacun}</Td>
                  <Td>{firstName}</Td>
                  <Td>{lastName}</Td>
                  <Td>{email}</Td>
                  <Td>
                    <Button>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TabPanel>
        <TabPanel>
          {users.companies.map(({ idRacun, name }) => (
            <Text key={idRacun}>{name}</Text>
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
