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
  toast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { get, post } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export function AddPermanentReservationForm() {
  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, errors, trigger, handleSubmit, watch, control } = useForm();
  const history = useHistory();
  const location = useLocation();
  const [parking] = useState(location.state);
  const [vehicles, setVehicles] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

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
    } else history.replace('/');
  }, []);

  function onAddReservation(formData) {
    const requestBody = {
      data: {
        idParkiraliste: parking.idParkiraliste,
        idVozilo: formData['reservation-vehicle'],
        startTime: format(formData['reservation-starttime'], 'yyyy-MM-dd hh:mm:ss'),
        endTime: format(formData['reservation-endtime'], 'yyyy-MM-dd hh:mm:ss'),
      },
    };

    post('reservation/permanent', requestBody)
      .then(() => {
        history.push('/');
        toast({
          title: 'Rezervacija uspješna',
          description: `Napravljena je trajna rezervacija od ${format(
            formData['reservation-starttime'],
            'dd.MM.yyyy HH:mm',
          )} do ${format(formData['reservation-endtime'], 'dd.MM.yyyy HH:mm')}`,
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
        Napravi trajnu rezervaciju
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
            <Text as="label">Početak</Text>
            <Controller
              control={control}
              name="reservation-starttime"
              render={({ onChange, value }) => (
                <DatePicker
                  name="reservation-starttime"
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
              render={({ onChange, value }) => (
                <DatePicker
                  name="reservation-endtime"
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
