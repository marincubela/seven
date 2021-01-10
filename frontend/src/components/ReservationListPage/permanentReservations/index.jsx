import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  HStack,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { destroy, get } from '../../../utils/network';
import { useStore } from '../../../store/StoreProvider';
import { PermanentReservationRow } from './permanentReservationRow';

export const PermanentReservation = ({ permanent }) => {
  console.log(permanent);

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
        {permanent?.map((r) => (
          <PermanentReservationRow reservation={r} />
        ))}
      </Tbody>
    </Table>
  );
};
