import React from 'react';
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import { PermanentReservationRow } from './permanentReservationRow';

export const PermanentReservation = ({ permanent }) => {
  console.log(permanent);

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Parkiralište</Th>
          <Th>Vozilo</Th>
          <Th>Vrijeme trajanja</Th>
          <Th />
        </Tr>
      </Thead>

      <Tbody>
        {permanent?.map((r) => (
          <PermanentReservationRow key={r.idRezervacija} reservation={r} />
        ))}
      </Tbody>
    </Table>
  );
};
