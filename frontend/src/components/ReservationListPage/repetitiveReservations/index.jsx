import React from 'react';
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import { RepetitiveReservationRow } from './repetitiveReservationRow';

export const RepetitiveReservation = ({ repeated }) => {
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Parkiralište</Th>
          <Th>Vozilo</Th>
          <Th>Datum trajanja</Th>
          <Th>Vrijeme trajanja</Th>
          <Th>Dani ponavljanja</Th>
          <Th />
        </Tr>
      </Thead>

      <Tbody>
        {repeated?.map((r) => (
          <RepetitiveReservationRow key={r.idRezervacija} reservation={r} />
        ))}
      </Tbody>
    </Table>
  );
};
