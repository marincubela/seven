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
  Td,
  Tr,
  Text,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { format, isAfter } from 'date-fns';

import { destroy, get } from '../../../utils/network';

export const PermanentReservationRow = ({ reservation }) => {
  const [vehicle, setVehicle] = useState([]);
  const [parking, setParking] = useState([]);
  const history = useHistory();
  const toast = useToast();

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const [deleteReservation, setdeleteReservation] = useState([]);

  useEffect(() => {
    get(`vehicle/${reservation.idVozilo}`)
      .then((res) => {
        if (res.data?.vehicle) {
          setVehicle(res.data.vehicle);
        }
      })
      .catch((res) => {
        console.log('eror');
        console.log(res);
      });
    get(`parking/${reservation.idParkiraliste}`)
      .then((res) => {
        if (res.data?.parking) {
          setParking(res.data.parking);
        }
      })
      .catch((res) => {
        console.log('eror');
        console.log(res);
      });
  }, []);

  function handleDelete(id) {
    destroy(`reservation/${id}`)
      .then(() => {
        setIsOpen(false);
        history.replace('/');
        setTimeout(() => history.push('/reservations'), 1);

        toast({
          title: 'Rezervacija izbrisana',
          status: 'success',
          position: 'top-right',
        });
      })
      .catch((err) => {
        console.log('eror');
        console.log(err);

        toast({
          title: 'Problem prilikom brisanja rezervacije',
          status: 'error',
          position: 'top-right',
        });
      });
  }

  return (
    <Tr key={reservation.idRezervacija}>
      <Td>{parking.parkingName}</Td>
      <Td>{vehicle.carName}</Td>
      <Td>
        {format(new Date(reservation.startTime), 'dd.MM.yyyy. HH')}h -{' '}
        {format(new Date(reservation.endTime), 'dd.MM.yyyy. HH')}h
      </Td>

      <Td>
        <HStack align="center">
          {isAfter(new Date(reservation.startTime), new Date()) && (
            <IconButton
              aria-label="Edit reservation"
              icon={<EditIcon />}
              as={ReactLink}
              to={{ pathname: '/reservations/permanent/edit', state: reservation }}
            />
          )}

          <IconButton
            colorScheme="red"
            aria-label="Delete reservation"
            icon={<DeleteIcon />}
            onClick={() => {
              setIsOpen(true);
              setdeleteReservation(reservation);
            }}
          />
        </HStack>
      </Td>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Izbri??i rezervaciju
            </AlertDialogHeader>

            <AlertDialogBody>Jeste li sigurni da ??elite izbrisati rezervaciju?</AlertDialogBody>

            <AlertDialogFooter>
              <Button leftIcon={<CloseIcon />} ref={cancelRef} onClick={onClose}>
                Odustani
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleDelete(deleteReservation.idRezervacija)}
                ml={3}
              >
                Izbri??i
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Tr>
  );
};
