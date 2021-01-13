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
import { add, setMinutes, differenceInHours, sub, format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { get, post } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';
import { usePrivateRoute } from '../../hooks/usePrivateRoute';

export function AddRepetitiveReservationForm() {
  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, errors, trigger, handleSubmit, watch, control } = useForm();
  const history = useHistory();
  const location = useLocation();
  const [parking] = useState(location.state);
  const [vehicles, setVehicles] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  useEffect(() => {
    if (store.currentUser && parking) {
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
    }
  }, []);

  useEffect(() => {
    if (!parking) {
      history.replace('/');
    }
  }, []);

  const { currentUser } = usePrivateRoute({ redirectOn: (user) => !user?.klijent });

  if (!currentUser?.klijent || !parking) {
    return null;
  }

  function onAddReservation(formData) {
    const requestBody = {
      data: {
        idParkiraliste: parking.idParkiraliste,
        idVozilo: formData['reservation-vehicle'],
        reservationDate: format(formData['reservation-startdate'], 'yyyy-MM-dd'),
        reservationEndDate: format(formData['reservation-enddate'], 'yyyy-MM-dd'),
        repeatDays: formData['reservation-days'],
        startTime: format(formData['reservation-starthour'], 'HH:mm:ss'),
        endTime: format(formData['reservation-endhour'], 'HH:mm:ss'),
      },
    };

    post('reservation/repetitive', requestBody)
      .then(() => {
        history.push('/');
        toast({
          title: 'Rezervacija dodana',
          description: `Napravljena je ponavljajuća rezervacija od ${format(
            formData['reservation-startdate'],
            'dd.MM.yyyy',
          )} do ${format(formData['reservation-enddate'], 'dd.MM.yyyy')}.`,
          position: 'top-right',
          status: 'success',
        });
      })
      .catch((res) => {
        if (res.errors && res.errors[0] && res.errors[0].message) {
          setErrorMessage(res.errors[0].message);
        }
        onClose();
      });
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
        Napravi ponavljajuću rezervaciju
      </Heading>

      <VStack align="flex-start">
        <Text>Odabrano parkiralište</Text>
        <Text fontWeight="bold" fontSize="lg">
          {parking.parkingName}
        </Text>
      </VStack>

      <form onSubmit={handleSubmit(onAddReservation)} id="reservation" autoComplete="off">
        <VStack flex="1" align="stretch" marginY="8" spacing="4">
          <VStack
            flex="1"
            align="baseline"
            sx={{ '.react-datepicker-wrapper, .react-datepicker__input-container': { width: 'full' } }}
          >
            <Text as="label">Datum početka rezervacije</Text>
            <Controller
              control={control}
              name="reservation-startdate"
              defaultValue={minDate}
              render={({ onChange, value }) => (
                <DatePicker
                  name="reservation-startdate"
                  selected={value}
                  onChange={(date) => onChange(date)}
                  minDate={sub(minDate, { hours: 1 })}
                  customInput={<Input />}
                  dateFormat="dd.MM.yyyy"
                />
              )}
            />
            {errors['reservation-startdate'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['reservation-startdate'].message}
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
              name="reservation-enddate"
              defaultValue={minDate}
              render={({ onChange, value }) => (
                <DatePicker
                  name="reservation-enddate"
                  selected={value}
                  onChange={(date) => onChange(date)}
                  minDate={sub(minDate, { hours: 1 })}
                  customInput={<Input />}
                  dateFormat="dd.MM.yyyy"
                />
              )}
            />
            {errors['reservation-enddate'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['reservation-enddate'].message}
              </Text>
            ) : null}
          </VStack>

          <Text fontSize="2xl" as="b">
            Period ponavljanja rezervacije
          </Text>
          <Box>
            <Controller
              control={control}
              name="reservation-days"
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
              name="reservation-starthour"
              render={({ onChange, value }) => (
                <DatePicker
                  name="reservation-starthour"
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
            {errors['reservation-starthour'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['reservation-starthour'].message}
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
              name="reservation-endhour"
              rules={{
                validate: (value) =>
                  differenceInHours(value, watch('reservation-starthour')) > 0 || 'Krajnje vrijeme neispravno',
              }}
              render={({ onChange, value }) => (
                <DatePicker
                  name="reservation-endhour"
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
            {errors['reservation-endhour'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['reservation-endhour'].message}
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
              isInvalid={errors['reservation-vehicle']}
              name="reservation-vehicle"
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
            {errors['reservation-vehicle'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['reservation-vehicle'].message}
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
          Rezerviraj
        </Button>

        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Plati rezervaciju
              </AlertDialogHeader>

              <AlertDialogBody>Jeste li sigurni da želite izvršiti uplatu?</AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} colorScheme="red" variant="outline" onClick={onClose}>
                  Odustani
                </Button>
                <Button form="reservation" type="submit" ml="4" rightIcon={<ArrowForwardIcon />}>
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
