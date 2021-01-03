import React, { useState } from 'react';
import { Box, Heading, VStack, Text, Input, Button, Select } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { TwitterPicker } from 'react-color';

import { post } from '../../utils/network';

export function VehiclesAdd() {
  const { handleSubmit, register, errors } = useForm();
  const [carColor, setCarColor] = useState(null);
  const history = useHistory();

  function onVehicleInput(formData) {
    const requestBody = {
      data: {
        registration: formData['add-vehicle-registration'],
        carName: formData['add-vehicle-name'],
        // color: formData['add-vehicle-color'],
        // mozda nije najbolje rjesenje???
        color: carColor.hex,
      },
    };

    post('vehicle', requestBody)
      .then((res) => {
        console.log('odgovor je: ' + res);
        history.replace('/vehicles');
      })

      .catch((res) => {
        if (res.errors && res.errors[0] && res.errors[0].message) {
          // setErrorMessage(res.errors[0].message);
          console.log(res.errors[0].message);
        }
      });
  }

  // function handleChangeComplete = (color) => {
  //   this.inputColor = color;
  // };

  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4">
        Dodaj vozilo
      </Heading>

      <form onSubmit={handleSubmit(onVehicleInput)}>
        <VStack flex="1" marginY="8" spacing="4" align="stretch">
          <Text>Ime</Text>
          <Input
            ref={register({
              required: 'Ime je obavezno',
            })}
            isInvalid={errors['add-vehicle-name']}
            name="add-vehicle-name"
            placeholder="Naziv vozila"
          />
          {errors['add-vehicle-name'] ? (
            <Text color="error.500" fontSize="sm">
              {errors['add-vehicle-name'].message}
            </Text>
          ) : null}
          <Text>Registracija</Text>
          <Input
            ref={register({ required: 'Registracija je obavezna' })}
            isInvalid={errors['add-vehicle-registration']}
            name="add-vehicle-registration"
            placeholder="Registracija"
          />
          {errors['add-vehicle-registration'] ? (
            <Text color="error.500" fontSize="sm">
              {errors['add-vehicle-registration'].message}
            </Text>
          ) : null}
          <Text>Boja</Text>
          {/* <Select
            variant="filled"
            placeholder="Odaberi boju"
            ref={register({
              required: 'Boja je obavezna',
            })}
            isInvalid={errors['add-vehicle-color']}
            name="add-vehicle-color"
          >
            <option value="#FF0000" style={{ color: '#FF0000' }}>
              Crvena
            </option>
            <option value="#00FF00" style={{ color: '#00FF00' }}>
              zelena
            </option>

            <option value="#FFFF00" style={{ color: '#FFFF00' }}>
              žuta
            </option>
            <option value="#0000FF" style={{ color: '#0000FF' }}>
              plava
            </option>
          </Select> */}
          <TwitterPicker
            onChangeComplete={(color) => {
              setCarColor(color);
            }}
          />

          {errors['add-vehicle-color'] ? (
            <Text color="error.500" fontSize="sm">
              {errors['add-vehicle-color'].message}
            </Text>
          ) : null}
          <Button type="submit" variant="solid">
            Dodaj
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
