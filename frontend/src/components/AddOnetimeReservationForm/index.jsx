import { Box, Heading, VStack, Text, Input, HStack, Button, Select, Spinner, Center, Link } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { add, isAfter, getHours, setHours, format, setMinutes, differenceInHours, sub } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import { get } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export function AddOnetimeReservationForm() {
  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, errors, handleSubmit, watch, control } = useForm();
  const history = useHistory();
  const location = useLocation();
  const [parking] = useState(location.state);
  const [vehicles, setVehicles] = useState();

  useEffect(() => {
    if (store.currentUser && parking) {
      get(`vehicle?client=${store.currentUser.idRacun}`)
        .then((res) => {
          console.log(res);
          if (res.data?.vehicles) {
            setVehicles(res.data.vehicles);
          }
        })
        .catch((res) => {
          console.log('erorrrrrrr');
          console.log(res);
        });
    } else history.replace('/');
  }, []);

  function onAddReservation(formData) {
    console.log(format(formData['reservation-starttime'], 'yyyy-MM-dd hh:mm:ss'));

    // const requestBody = {
    //   data: {
    //     // idParkiraliste: rezervacija.idParkiraliste,
    //     // idVozilo: rezervacija.idVozilo,
    //     startTime: formData['reservation-starttime'],
    //     endTime: formData['reservation-endtime'],
    //   },
    // };

    // post('reservation/onetime', requestBody)
    //   .then((res) => {
    //     if (res.data && res.data.user) {
    //       store.setCurrentUser(res.data.user);

    //       history.replace('/');
    //     }
    //   })
    //   .catch((res) => {
    //     if (res.errors && res.errors[0] && res.errors[0].message) {
    //       setErrorMessage(res.errors[0].message);
    //     }
    //   });
  }

  // const minDate = addHours(new Date(), 6)
  const minDate = add(setMinutes(new Date(), 0), { hours: 7 });

  console.log(parking);

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
        Napravi jednokratnu rezervaciju
      </Heading>

      <VStack align="flex-start">
        <Text>Odabrano parkiralište</Text>
        <Text fontWeight="bold" fontSize="lg">
          {parking.parkingName}
        </Text>
      </VStack>

      <form onSubmit={handleSubmit(onAddReservation)}>
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
                <option key={v.idVozilo}>
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

        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}
