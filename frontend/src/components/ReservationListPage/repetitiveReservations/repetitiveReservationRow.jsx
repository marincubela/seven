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
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import { destroy, get } from '../../../utils/network';

export const RepetitiveReservationRow = ({ reservation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [parking, setParking] = useState([]);
  const history = useHistory();
  const toast = useToast();

  const days = Array.from(reservation.repeatDays.toString());

  var daysOfReservation = '';

  days.map((d) => {
    if (d == '0') daysOfReservation += 'ned ';
    if (d == '1') daysOfReservation += 'pon ';
    if (d == '2') daysOfReservation += 'uto ';
    if (d == '3') daysOfReservation += 'sri ';
    if (d == '4') daysOfReservation += 'čet ';
    if (d == '5') daysOfReservation += 'pet ';
    if (d == '6') daysOfReservation += 'sub ';
  });

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const [deleteReservation, setdeleteReservation] = useState([]);

  useEffect(() => {
    if (reservation) {
      get(`vehicle/${reservation.idVozilo}`)
        .then((res) => {
          if (res.data?.vozilo) {
            setVehicles(res.data.vozilo);
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
    } else {
      history.replace('/');
    }
  }, []);

  function handleDelete(id) {
    destroy(`reservation/${id}`)
      .then(() => {
        setIsOpen(false);
        history.replace('/');
        setTimeout(() => history.push('/reservations'), 1);

        toast({
          message: 'Rezervacija izbrisana',
          status: 'success',
          position: 'top-right',
        });
      })
      .catch((err) => {
        console.log('eror');
        console.log(err);

        toast({
          message: 'Problem prilikom brisanja rezervacije',
          status: 'error',
          position: 'top-right',
        });
      });
  }

  return (
    <Tr key={reservation.idRezervacija}>
      <Td>{parking.parkingName}</Td>
      <Td>{vehicles.carName}</Td>
      <Td>{format(new Date(reservation.reservationDate), 'dd.MM.yyyy.')}</Td>
      <Td>{format(new Date(reservation.reservationEndDate), 'dd.MM.yyyy.')}</Td>
      <Td>{reservation.startTime}</Td>
      <Td>{reservation.endTime}</Td>
      <Td>{daysOfReservation}</Td>

      <Td>
        <HStack align="center">
          <Button
            aria-label="Edit reservation"
            leftIcon={<EditIcon />}
            as={ReactLink}
            to={{ pathname: '/reservations/edit', state: reservation }}
          >
            Uredi
          </Button>

          <Button
            colorScheme="red"
            aria-label="Delete reservation"
            leftIcon={<DeleteIcon />}
            onClick={() => {
              setIsOpen(true);
              setdeleteReservation(reservation);
            }}
          >
            Izbriši
          </Button>
        </HStack>
      </Td>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Izbriši rezervaciju
            </AlertDialogHeader>

            <AlertDialogBody>Jeste li sigurni da želite izbrisati rezervaciju?</AlertDialogBody>

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
                Izbriši
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Tr>
  );
};
