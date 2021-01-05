import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import React from 'react';

import { ClientRow } from './ClientRow';

export const Clients = ({ clients, ...rest }) => {
  return (
    <Table variant="striped" {...rest}>
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
        {clients
          .sort((a, b) => a.idRacun - b.idRacun)
          .map((user) => (
            <ClientRow key={user.idRacun} user={user} />
          ))}
      </Tbody>
    </Table>
  );
};
