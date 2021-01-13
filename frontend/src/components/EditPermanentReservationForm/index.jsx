import {
  Box,
  Heading,
  VStack,
  Text,
  Input,
  Button,
  Select,
  Spinner,
  Center,
  Link,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { get, update } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';
import { usePrivateRoute } from '../../hooks/usePrivateRoute';

export function EditPermanentReservationForm() {
  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const [reservation] = useState(location.state);
  const [vehicles, setVehicles] = useState();
  const [parking, setParking] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const { register, errors, trigger, handleSubmit, control } = useForm({
    defaultValues: {
      'edit-reservation-vehicle': reservation.idVozilo,
      'edit-reservation-starttime': new Date(reservation.startTime),
      'edit-reservation-endtime': new Date(reservation.endTime),
    },
  });

  const history = useHistory();

  useEffect(() => {
    if (store.currentUser && reservation) {
      get(`vehicle?client=${store.currentUser.idRacun}`)
        .then((res) => {
          if (res.data?.vehicles) {
            setVehicles(res.data.vehicles);
          }
        })
        .catch((res) => {
          console.log('eror');
          console.log(res);
        });
      get(`parking/${reservation.idParkiraliste}`)
        .then((res) => {
          if (res.data && res.data.parking) {
            setParking(res.data.parking);
          }
        })
        .catch((res) => {
          if (res.errors && res.errors[0] && res.errors[0].message) {
            setErrorMessage(res.errors[0].message);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (!reservation) {
      history.replace('/');
    }
  }, []);

  function onEdit(formData) {
    const requestBody = {
      data: {
        idVozilo: formData['edit-reservation-vehicle'],
        startTime: format(formData['edit-reservation-starttime'], 'yyyy-MM-dd HH:mm:ss'),
        endTime: format(formData['edit-reservation-endtime'], 'yyyy-MM-dd HH:mm:ss'),
      },
    };

    update(`reservation/permanent/${reservation.idRezervacija}`, requestBody)
      .then(() => {
        toast({
          title: 'Rezervacija uspješno promijenjena',
          description: `Promijenjena je jednokratna rezervacija od ${format(
            formData['edit-reservation-starttime'],
            'dd.MM.yyyy HH:mm',
          )} do ${format(formData['edit-reservation-endtime'], 'dd.MM.yyyy HH:mm')}.`,
          position: 'top-right',
          status: 'success',
        });
        return get('session');
      })
      .then((res) => {
        console.log(res);
        history.replace('/reservations');
      })
      .catch((res) => {
        if (res.errors && res.errors[0] && res.errors[0].message) {
          setErrorMessage(res.errors[0].message);
        }
        onClose();
      });
  }

  const { currentUser } = usePrivateRoute({ redirectOn: (user) => !user?.klijent });

  if (!currentUser?.klijent || !reservation) {
    return null;
  }

  if (!vehicles) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4">
        Uređivanje trajne rezervacije
      </Heading>

      <VStack align="flex-start">
        <Text>Odabrano parkiralište</Text>
        <Text fontWeight="bold" fontSize="lg">
          {parking?.parkingName}
        </Text>
      </VStack>

      <form onSubmit={handleSubmit(onEdit)} id="edit-reservation" autoComplete="off">
        <VStack flex="1" align="stretch" marginY="8" spacing="4">
          <VStack
            flex="1"
            align="baseline"
            sx={{ '.react-datepicker-wrapper, .react-datepicker__input-container': { width: 'full' } }}
          >
            <Text as="label">Početak</Text>
            <Controller
              control={control}
              name="edit-reservation-starttime"
              render={({ onChange, value }) => (
                <DatePicker
                  showTimeSelect
                  selected={value}
                  onChange={(date) => onChange(date)}
                  minDate={new Date()}
                  timeIntervals={60}
                  timeFormat="HH:mm"
                  customInput={<Input />}
                  dateFormat="dd.MM.yyyy HH:mm"
                />
              )}
            />
            {errors['edit-reservation-starttime'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-reservation-starttime'].message}
              </Text>
            ) : null}
          </VStack>

          <VStack
            flex="1"
            align="baseline"
            sx={{ '.react-datepicker-wrapper, .react-datepicker__input-container': { width: 'full' } }}
          >
            <Text as="label">Kraj</Text>
            <Controller
              control={control}
              name="edit-reservation-endtime"
              render={({ onChange, value }) => (
                <DatePicker
                  name="edit-reservation-endtime"
                  selected={value}
                  onChange={(date) => onChange(date)}
                  showTimeSelect
                  minDate={new Date()}
                  timeIntervals={60}
                  timeFormat="HH:mm"
                  customInput={<Input width="full" />}
                  dateFormat="dd.MM.yyyy HH:mm"
                />
              )}
            />
            {errors['edit-reservation-endtime'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-reservation-endtime'].message}
              </Text>
            ) : null}
          </VStack>

          <VStack
            flex="1"
            align="baseline"
            sx={{ '.react-datepicker-wrapper, .react-datepicker__input-container': { width: 'full' } }}
          >
            <Text as="label">Vozilo</Text>
            <Select
              variant="filled"
              placeholder="Odaberi vozilo"
              ref={register({
                required: 'Vozilo je obvezno',
              })}
              isInvalid={errors['edit-reservation-vehicle']}
              name="edit-reservation-vehicle"
            >
              {vehicles.map((v) => (
                <option value={v.idVozilo} key={v.idVozilo}>
                  {v.carName} | {v.registration}
                </option>
              ))}
            </Select>

            {!vehicles.length && (
              <Link as={RouterLink} variant="link" to="/vehicles/add">
                Nema vozila. Dodaj Vozilo
              </Link>
            )}

            {errors['edit-reservation-vehicle'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-reservation-vehicle'].message}
              </Text>
            ) : null}
          </VStack>
        </VStack>

        <Box padding="2">
          <Text color="error.500">{errorMessage}</Text>
        </Box>

        <Button
          onClick={() => {
            trigger().then((isValid) => {
              if (isValid) onOpen();
            });
          }}
        >
          Spremi
        </Button>

        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Uredi rezervaciju
              </AlertDialogHeader>

              <AlertDialogBody>Jeste li sigurni da želite promijeniti rezervaciju?</AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} colorScheme="red" variant="outline" onClick={onClose}>
                  Odustani
                </Button>
                <Button form="edit-reservation" type="submit" ml="4" rightIcon={<ArrowForwardIcon />}>
                  Potvrdi
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </form>
    </Box>
  );
}
