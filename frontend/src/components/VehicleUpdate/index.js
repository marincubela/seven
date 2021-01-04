import React, { useState } from 'react';
import { Box, Heading, VStack, Text, Input, Button } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { TwitterPicker } from 'react-color';

// import { post } from '../../utils/network';

export function VehicleUpdate() {
  const { handleSubmit, register, errors } = useForm();
  const [carColor, setCarColor] = useState(null);
  //   const history = useHistory();
  const location = useLocation();
  //   console.log(location);
  //   console.log(location.search);

  function onVehicleInput(formData) {
    // const requestBody = {
    //   data: {
    //     registration: formData['add-vehicle-registration'],
    //     carName: formData['add-vehicle-name'],
    //     color: carColor.hex,
    //   },
    // };
    // post('vehicle', requestBody)
    //   .then((res) => {
    //     console.log('odgovor je: ' + res);
    //     history.replace('/vehicles');
    //   })
    //   .catch((res) => {
    //     if (res.errors && res.errors[0] && res.errors[0].message) {
    //       // setErrorMessage(res.errors[0].message);
    //       console.log(res.errors[0].message);
    //     }
    //   });
  }

  const colorsForPicker = [
    '#000000',
    '#ABB8C3',
    '#FF6900',
    '#FCB900',
    '#7BDCB5',
    '#00D084',
    '#8ED1FC',
    '#0693E3',
    '#A52A2A',
    '#800000',
    '#EB144C',
    '#F78DA7',
    '#9900EF',
    '#FFFFFF',
  ];

  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4">
        Uredi podatke o vozilu
      </Heading>

      <form onSubmit={handleSubmit(onVehicleInput)}>
        <VStack flex="1" marginY="8" spacing="4" align="stretch">
          <Text>Naziv</Text>
          <Input
            ref={register({
              required: 'Naziv je obavezan',
            })}
            isInvalid={errors['add-vehicle-name']}
            name="add-vehicle-name"
            placeholder="Naziv vozila"
            defaultValue={location.state.carName}
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
            defaultValue={location.state.registration}
          />
          {errors['add-vehicle-registration'] ? (
            <Text color="error.500" fontSize="sm">
              {errors['add-vehicle-registration'].message}
            </Text>
          ) : null}
          <Text>Boja</Text>

          <TwitterPicker
            defaultValue={location.state.color}
            // value={location.state.color}
            colors={colorsForPicker}
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
            Spremi promjene
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
