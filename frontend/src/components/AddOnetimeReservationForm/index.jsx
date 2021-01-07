import { Box, Heading, VStack, Text, Input, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { add, isAfter, getHours, setHours, differenceInDays, format, setMinutes } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import { post } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export function AddOnetimeReservationForm() {
  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, errors, handleSubmit, watch, control } = useForm();
  const history = useHistory();

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
  const minDate = add(setMinutes(new Date(), 0), { hours: 6 });

  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4">
        Napravi jednokratnu rezervaciju
      </Heading>

      <form onSubmit={handleSubmit(onAddReservation)}>
        <VStack flex="1" align="stretch" marginY="8" spacing="4">
          <HStack align="stretch">
            <VStack flex="1" align="baseline">
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
                    minDate={minDate}
                    timeIntervals={60}
                    filterTime={(time) => isAfter(setHours(value, getHours(time)), minDate)}
                    timeFormat="HH:mm"
                    customInput={<Input />}
                    dateFormat="dd.MM.yyyy HH:mm"
                  />
                )}
              />
            </VStack>
          </HStack>

          <HStack align="stretch">
            <VStack flex="1" align="baseline">
              <Text as="label">Kraj</Text>
              <DatePicker
                name="reservation-endtime"
                selected={new Date()}
                showTimeSelect
                timeFormat="HH:mm"
                customInput={<Input />}
                dateFormat="dd.MM.yyyy HH:mm"
              />
            </VStack>
          </HStack>
        </VStack>

        <button>Submit</button>
      </form>
    </Box>
  );
}
