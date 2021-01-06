import React, { useState } from 'react';
import { Box, Heading, VStack, HStack, Text, Input, Button, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { post } from '../../utils/network';

export function ParkingsAdd() {
  const { handleSubmit, register, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  function onParkingInput(formData) {
    const requestBody = {
      data: {
        parkingName: formData['add-parking-name'],
        capacity: formData['add-parking-capacity'],
        disabledCapacity: formData['add-parking-disabledCapacity'],
        parkingType: formData['add-parkingType'],
        coordinates: formData['add-parking-coordinates'],
        oneTimePrice: formData['add-parking-oneTimePrice'],
        repetitivePrice: formData['add-parking-repetitivePrice'],
        permanentPrice: formData['add-parking-permanentPrice'],
      },
    };

    post('parking', requestBody)
      .then((res) => {
        console.log('odgovor je: ' + res);
        history.replace('/parkings');
      })

      .catch((res) => {
        if (res.errors && res.errors[0] && res.errors[0].message) {
          setErrorMessage(res.errors[0].message);
        }
      });
  }
  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4">
        Dodaj parkiralište
      </Heading>

      <form onSubmit={handleSubmit(onParkingInput)}>
        <VStack flex="1" marginY="8" spacing="4" align="stretch">
          <HStack align="stretch">
            <VStack flex="1" align="baseline">
              <Text as="label">Naziv parkirališta</Text>
              <Input
                ref={register({
                  required: 'Naziv parkirališta je obavezan',
                })}
                isInvalid={errors['add-parking-name']}
                name="add-parking-name"
                placeholder="Naziv parkirališta"
              />
              {errors['add-parking-name'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['add-parking-name'].message}
                </Text>
              ) : null}
            </VStack>
          </HStack>

          <HStack align="stretch">
            <VStack flex="1" align="baseline">
              <Text as="label">Broj mjesta</Text>
              <Input
                ref={register({
                  required: 'Broj mjesta je obavezan',
                  pattern: {
                    value: /^\d*$/,
                    message: 'Cijena mora sadržavati samo brojeve',
                  },
                })}
                isInvalid={errors['add-parking-capacity']}
                name="add-parking-capacity"
                placeholder="Broj mjesta"
              />
              {errors['add-parking-capacity'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['add-parking-capacity'].message}
                </Text>
              ) : null}
            </VStack>

            <VStack flex="1" align="baseline">
              <Text as="label">Broj invalidskih mjesta</Text>
              <Input
                ref={register({
                  required: 'Broj invalidskih mjesta je obavezan',
                  pattern: {
                    value: /^\d*$/,
                    message: 'Cijena mora sadržavati samo brojeve',
                  },
                })}
                isInvalid={errors['add-parking-disabledCapacity']}
                name="add-parking-disabledCapacity"
                placeholder="Broj invalidskih mjesta"
              />
              {errors['add-parking-disabledCapacity'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['add-parking-disabledCapacity'].message}
                </Text>
              ) : null}
            </VStack>
          </HStack>

          <VStack flex="1" align="stretch">
            <Text as="label">Tip parkirališta</Text>
            <Select
              variant="filled"
              placeholder="Odaberi tip parkirališta"
              ref={register({
                required: 'Tip parkirališta je obavezan',
              })}
              isInvalid={errors['add-parkingType']}
              name="add-parkingType"
            >
              <option>otvoreno</option>
              <option>zatvoreno</option>
            </Select>
            {errors['add-parkingType'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['add-parkingType'].message}
              </Text>
            ) : null}
          </VStack>

          <VStack flex="1" align="stretch">
            <Text as="label">Koordinate parkirališta</Text>
            <Input
              ref={register({ required: 'Koordinate su obavezne' })}
              isInvalid={errors['add-parking-coordinates']}
              name="add-parking-coordinates"
              placeholder="zemljopisna širina, zemljopisna dužina"
            />
            {errors['add-parking-coordinates'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['add-parking-coordinates'].message}
              </Text>
            ) : null}
          </VStack>

          <Text as="label">Cijena rezervacija</Text>
          <HStack>
            <VStack>
              <Text as="label">Jednokratna</Text>
              <Input
                size="sm"
                ref={register({
                  required: 'Cijena jednokratne je obavezna',
                  pattern: {
                    value: /^\d*$/,
                    message: 'Cijena mora sadržavati samo brojeve',
                  },
                })}
                isInvalid={errors['add-parking-oneTimePrice']}
                name="add-parking-oneTimePrice"
              />
              {errors['add-parking-oneTimePrice'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['add-parking-oneTimePrice'].message}
                </Text>
              ) : null}
            </VStack>

            <VStack>
              <Text as="label">Ponavljajuća</Text>
              <Input
                size="sm"
                ref={register({
                  required: 'Cijena ponavljajuće je obavezna',
                  pattern: {
                    value: /^\d*$/,
                    message: 'Cijena mora sadržavati samo brojeve',
                  },
                })}
                isInvalid={errors['add-parking-repetitivePrice']}
                name="add-parking-repetitivePrice"
              />
              {errors['add-parking-repetitivePrice'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['add-parking-repetitivePrice'].message}
                </Text>
              ) : null}
            </VStack>

            <VStack>
              <Text as="label">Trajna</Text>
              <Input
                size="sm"
                ref={register({
                  required: 'Cijena trajne je obavezna',
                  pattern: {
                    value: /^\d*$/,
                    message: 'Cijena mora sadržavati samo brojeve',
                  },
                })}
                isInvalid={errors['add-parking-permanentPrice']}
                name="add-parking-permanentPrice"
              />
              {errors['add-parking-permanentPrice'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['add-parking-permanentPrice'].message}
                </Text>
              ) : null}
            </VStack>
          </HStack>

          <Text color="error.500">{errorMessage}</Text>

          <Button type="submit" variant="solid">
            Dodaj
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
