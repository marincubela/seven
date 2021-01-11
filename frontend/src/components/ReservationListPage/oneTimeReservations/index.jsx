import React from 'react';
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import { OneTimeReservationRow } from './oneTimeReservationRow';

export const OneTimeReservation = ({ singleUse }) => {
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Parkiralište</Th>
          <Th>Vozilo</Th>
          <Th>Vrijeme početka</Th>
          <Th>Vrijeme kraja</Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {singleUse?.map((r) => (
          <OneTimeReservationRow key={r.idRezervacija} reservation={r} />
        ))}
      </Tbody>
    </Table>
  );
};
