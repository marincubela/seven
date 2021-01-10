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
import { add, isAfter, getHours, setHours, format, setMinutes, differenceInHours, sub } from 'date-fns';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import 'react-datepicker/dist/react-datepicker.css';

import { get, update } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';
import { usePrivateRoute } from '../../hooks/usePrivateRoute';

export function EditOnetimeReservationForm() {
  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const user = store.currentUser;
  const location = useLocation();
  const [parking] = useState(location.state);
  const [vehicles] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const { register, errors, trigger, handleSubmit, watch, control } = useForm({
    defaultValues: {
      'edit-reservation-vehicle': user.idVozilo,
      'edit-reservation-starttime': format(user.startTime, 'dd.MM.yyyy HH:mm'),
      'edit-reservation-endtime': format(user.endTime, 'dd.MM.yyyy HH:mm'),
    },
  });

  const history = useHistory();

  useEffect(() => {
    if (!parking) {
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

    update(`reservation/onetime/${user.idRezervacija}`, requestBody)
      .then(() => {
        toast({
          title: 'Rezervacija uspješna',
          description: `Napravljena je jednokratna rezervacija od ${format(
            formData['edit-reservation-starttime'],
            'dd.MM.yyyy HH:mm',
          )} do ${format(formData['edit-reservation-endtime'], 'dd.MM.yyyy HH:mm')}.`,
          position: 'top-right',
          status: 'success',
        });
        return get('session');
      })
      .then((res) => {
        store.setCurrentUser(res.data.user);
        history.push('/');
      })
      .catch((res) => {
        if (res.errors && res.errors[0] && res.errors[0].message) {
          setErrorMessage(res.errors[0].message);
        }
        onClose();
      });
  }

  const { currentUser } = usePrivateRoute({ redirectOn: (user) => !user?.klijent });

  if (!currentUser?.klijent || !parking) {
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
        Uređivanje jednokratne rezervacije
      </Heading>

      <VStack align="flex-start">
        <Text>Odabrano parkiralište</Text>
        <Text fontWeight="bold" fontSize="lg">
          {parking.parkingName}
        </Text>
      </VStack>

      <form onSubmit={handleSubmit(onEdit)} id="editOnetime" autoComplete="off">
        <VStack flex="1" align="stretch" marginY="8" spacing="4">
          <VStack
            flex="1"
            align="baseline"
            sx={{ '.react-datepicker-wrapper, .react-datepicker__input-container': { width: 'full' } }}
          >
            <Text as="label">Početak</Text>
            <Controller
              control={control}
              name="reservation-starttime"
              defaultValue={minDate}
              render={({ onChange, value }) => (
                <DatePicker
                  name="reservation-starttime"
                  selected={value}
                  onChange={(date) => onChange(date)}
                  showTimeSelect
                  minDate={sub(minDate, { hours: 1 })}
                  timeIntervals={60}
                  filterTime={(time) => isAfter(setHours(value, getHours(time)), sub(minDate, { hours: 1 }))}
                  timeFormat="HH:mm"
                  customInput={<Input />}
                  dateFormat="dd.MM.yyyy HH:mm"
                />
              )}
            />
            {errors['reservation-starttime'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['reservation-starttime'].message}
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
              name="reservation-endtime"
              defaultValue={add(minDate, { hours: 1 })}
              rules={{
                validate: (value) =>
                  (differenceInHours(value, watch('reservation-starttime')) <= 24 &&
                    differenceInHours(value, watch('reservation-starttime')) >= 0) ||
                  'Krajnje vrijeme neispravno',
              }}
              render={({ onChange, value }) => (
                <DatePicker
                  name="reservation-endtime"
                  selected={value}
                  onChange={(date) => onChange(date)}
                  showTimeSelect
                  minDate={minDate}
                  timeIntervals={60}
                  filterTime={(time) => isAfter(setHours(value, getHours(time)), minDate)}
                  timeFormat="HH:mm"
                  customInput={<Input width="full" />}
                  dateFormat="dd.MM.yyyy HH:mm"
                />
              )}
            />
            {errors['reservation-endtime'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['reservation-endtime'].message}
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
              defaultValue={vehicles[0]?.idVozilo}
              variant="filled"
              placeholder="Odaberi vozilo"
              ref={register({
                required: 'Vozilo je obvezno',
              })}
              isInvalid={errors['reservation-vehicle']}
              name="reservation-vehicle"
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
