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
  CheckboxGroup,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { add, setMinutes, differenceInHours, sub, format, parse } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { get, update } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';
import { usePrivateRoute } from '../../hooks/usePrivateRoute';

export function EditRepetitiveReservationForm() {
  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const [reservation] = useState(location.state);
  const [vehicles, setVehicles] = useState();
  const [parking, setParking] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const { register, errors, trigger, handleSubmit, watch, control } = useForm({
    defaultValues: {
      'edit-reservation-vehicle': reservation.idVozilo,
      'edit-reservation-startdate': new Date(reservation.reservationDate),
      'edit-reservation-enddate': new Date(reservation.reservationEndDate),
      'edit-reservation-days': reservation.repeatDays.toString(),
      'edit-reservation-starthour': parse(reservation.startTime, 'HH:mm:ss', new Date()),
      'edit-reservation-endhour': parse(reservation.endTime, 'HH:mm:ss', new Date()),
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
        reservationDate: format(formData['edit-reservation-startdate'], 'yyyy-MM-dd'),
        reservationEndDate: format(formData['edit-reservation-enddate'], 'yyyy-MM-dd'),
        repeatDays: formData['edit-reservation-days'],
        startTime: format(formData['edit-reservation-starthour'], 'HH:mm:ss'),
        endTime: format(formData['edit-reservation-endhour'], 'HH:mm:ss'),
      },
    };

    update(`reservation/repetitive/${reservation.idRezervacija}`, requestBody)
      .then(() => {
        toast({
          title: 'Rezervacija uspješno promijenjena',
          description: `Promijenjena je ponavljajuća rezervacija od ${format(
            formData['edit-reservation-startdate'],
            'dd.MM.yyyy',
          )} do ${format(formData['edit-reservation-enddate'], 'dd.MM.yyyy')}.`,
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

  // const minDate = addHours(new Date(), 6)
  const minDate = add(setMinutes(new Date(), 0), { hours: 7 });

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
        Uređivanje ponavljajuće rezervacije
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
            <Text as="label">Datum početka rezervacije</Text>
            <Controller
              control={control}
              name="edit-reservation-startdate"
              defaultValue={minDate}
              render={({ onChange, value }) => (
                <DatePicker
                  name="edit-reservation-startdate"
                  selected={value}
                  onChange={(date) => onChange(date)}
                  minDate={sub(minDate, { hours: 1 })}
                  customInput={<Input />}
                  dateFormat="dd.MM.yyyy"
                />
              )}
            />
            {errors['edit-reservation-startdate'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-reservation-startdate'].message}
              </Text>
            ) : null}
          </VStack>

          <VStack
            flex="1"
            align="baseline"
            sx={{ '.react-datepicker-wrapper, .react-datepicker__input-container': { width: 'full' } }}
          >
            <Text as="label">Datum kraja rezervacije</Text>
            <Controller
              control={control}
              name="edit-reservation-enddate"
              defaultValue={minDate}
              render={({ onChange, value }) => (
                <DatePicker
                  name="edit-reservation-enddate"
                  selected={value}
                  onChange={(date) => onChange(date)}
                  minDate={sub(minDate, { hours: 1 })}
                  customInput={<Input />}
                  dateFormat="dd.MM.yyyy"
                />
              )}
            />
            {errors['edit-reservation-enddate'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-reservation-enddate'].message}
              </Text>
            ) : null}
          </VStack>

          <Text fontSize="2xl" as="b">
            Period ponavljanja rezervacije
          </Text>
          <Box>
            <Controller
              control={control}
              name="edit-reservation-days"
              defaultValue=""
              render={({ onChange, value }) => (
                <CheckboxGroup
                  colorScheme="green"
                  value={value.split('')}
                  onChange={(newValue) => onChange(newValue.join(''))}
                >
                  <VStack align="stretch">
                    <Checkbox value="1">ponedjeljak</Checkbox>
                    <Checkbox value="2">utorak</Checkbox>
                    <Checkbox value="3">srijeda</Checkbox>
                    <Checkbox value="4">četvrtak</Checkbox>
                    <Checkbox value="5">petak</Checkbox>
                    <Checkbox value="6">subota</Checkbox>
                    <Checkbox value="0">nedjelja</Checkbox>
                  </VStack>
                </CheckboxGroup>
              )}
            />
          </Box>

          <VStack
            flex="1"
            align="baseline"
            sx={{ '.react-datepicker-wrapper, .react-datepicker__input-container': { width: 'full' } }}
          >
            <Text as="label">Početak rezervacije (sat)</Text>
            <Controller
              control={control}
              name="edit-reservation-starthour"
              render={({ onChange, value }) => (
                <DatePicker
                  name="edit-reservation-starthour"
                  selected={value}
                  onChange={(date) => onChange(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  timeCaption="Time"
                  minDate={minDate}
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                  customInput={<Input width="full" />}
                />
              )}
            />
            {errors['edit-reservation-starthour'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-reservation-starthour'].message}
              </Text>
            ) : null}
          </VStack>

          <VStack
            flex="1"
            align="baseline"
            sx={{ '.react-datepicker-wrapper, .react-datepicker__input-container': { width: 'full' } }}
          >
            <Text as="label">Kraj rezervacije (sat)</Text>
            <Controller
              control={control}
              name="edit-reservation-endhour"
              rules={{
                validate: (value) =>
                  differenceInHours(value, watch('edit-reservation-starthour')) > 0 || 'Krajnje vrijeme neispravno',
              }}
              render={({ onChange, value }) => (
                <DatePicker
                  name="edit-reservation-endhour"
                  selected={value}
                  onChange={(date) => onChange(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  timeCaption="Time"
                  minDate={minDate}
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                  customInput={<Input width="full" />}
                />
              )}
            />
            {errors['edit-reservation-endhour'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-reservation-endhour'].message}
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
              defaultChecked={1}
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
