import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import React from 'react';

import { CompanyRow } from './CompanyRow';

export const Companies = ({ companies, ...rest }) => {
  return (
    <Table variant="striped" {...rest}>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Naziv</Th>
          <Th>E-mail</Th>
          <Th />
        </Tr>
      </Thead>

      <Tbody>
        {companies
          .sort((a, b) => a.idRacun - b.idRacun)
          .map((user) => (
            <CompanyRow key={user.idRacun} user={user} />
          ))}
      </Tbody>
    </Table>
  );
};
