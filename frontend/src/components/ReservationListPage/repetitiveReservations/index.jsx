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
import { RepetitiveReservationRow } from './repetitiveReservationRow';

export const RepetitiveReservation = ({ repeated }) => {
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Parkiralište</Th>
          <Th>Vozilo</Th>
          <Th>Datum početka</Th>
          <Th>Datum kraja</Th>
          <Th>Vrijeme početka</Th>
          <Th>Vrijeme kraja</Th>
          <Th>Dani ponavljanja</Th>
          <Th />
        </Tr>
      </Thead>

      <Tbody>
        {repeated?.map((r) => (
          <RepetitiveReservationRow reservation={r} />
        ))}
      </Tbody>
    </Table>
  );
};
