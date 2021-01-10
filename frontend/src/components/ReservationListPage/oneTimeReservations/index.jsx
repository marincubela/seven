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
import { destroy } from '../../../utils/network';
import { useStore } from '../../../store/StoreProvider';
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
          <OneTimeReservationRow reservation={r} />
        ))}
      </Tbody>
    </Table>
  );
};
