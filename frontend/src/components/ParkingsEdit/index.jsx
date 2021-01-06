import React, { useState } from 'react';
import { Box, Heading, VStack, HStack, Text, Input, Button, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';

import { update, get } from '../../utils/network';

export function ParkingsEdit() {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState('');
  const [parking] = useState(location.state);

  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      'edit-parking-name': parking.parkingName,
      'edit-parking-capacity': parking.capacity,
      'edit-parking-disabledCapacity': parking.disabledCapacity,
      'edit-parkingType': parking.parkingType,
      'edit-parking-coordinates': parking.coordinates,
      'edit-parking-oneTimePrice': parking.oneTimePrice,
      'edit-parking-repetitivePrice': parking.repetitivePrice,
      'edit-parking-permanentPrice': parking.permanentPrice,
    },
  });

  const history = useHistory();

  function onParkingEdit(formData) {
    const requestBody = {
      data: {
        parkingName: formData['edit-parking-name'],
        capacity: formData['edit-parking-capacity'],
        disabledCapacity: formData['edit-parking-disabledCapacity'],
        parkingType: formData['edit-parkingType'],
        coordinates: formData['edit-parking-coordinates'],
        oneTimePrice: formData['edit-parking-oneTimePrice'],
        repetitivePrice: formData['edit-parking-repetitivePrice'],
        permanentPrice: formData['edit-parking-permanentPrice'],
      },
    };

    update(`parking/${location.state.idParkiraliste}`, requestBody)
      .then(() => {
        return get('session');
      })
      .then((res) => {
        console.log(res);
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
        Uređivanje podataka parkirališta
      </Heading>

      <form onSubmit={handleSubmit(onParkingEdit)}>
        <VStack flex="1" marginY="8" spacing="4" align="stretch">
          <HStack align="stretch">
            <VStack flex="1" align="baseline">
              <Text as="label">Naziv parkirališta</Text>
              <Input
                ref={register({
                  required: 'Naziv parkirališta je obavezan',
                })}
                isInvalid={errors['edit-parking-name']}
                name="edit-parking-name"
                placeholder="Naziv parkirališta"
              />
              {errors['edit-parking-name'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['edit-parking-name'].message}
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
                isInvalid={errors['edit-parking-capacity']}
                name="edit-parking-capacity"
                placeholder="Broj mjesta"
              />
              {errors['edit-parking-capacity'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['edit-parking-capacity'].message}
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
                isInvalid={errors['edit-parking-disabledCapacity']}
                name="edit-parking-disabledCapacity"
                placeholder="Broj invalidskih mjesta"
              />
              {errors['edit-parking-disabledCapacity'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['edit-parking-disabledCapacity'].message}
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
              isInvalid={errors['edit-parkingType']}
              name="edit-parkingType"
            >
              <option>otvoreno</option>
              <option>zatvoreno</option>
            </Select>
            {errors['edit-parkingType'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-parkingType'].message}
              </Text>
            ) : null}
          </VStack>

          <VStack flex="1" align="stretch">
            <Text as="label">Koordinate parkirališta</Text>
            <Input
              ref={register({ required: 'Koordinate su obavezne' })}
              isInvalid={errors['edit-parking-coordinates']}
              name="edit-parking-coordinates"
              placeholder="zemljopisna širina, zemljopisna dužina"
            />
            {errors['edit-parking-coordinates'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-parking-coordinates'].message}
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
                isInvalid={errors['edit-parking-oneTimePrice']}
                name="edit-parking-oneTimePrice"
              />
              {errors['edit-parking-oneTimePrice'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['edit-parking-oneTimePrice'].message}
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
                isInvalid={errors['edit-parking-repetitivePrice']}
                name="edit-parking-repetitivePrice"
              />
              {errors['edit-parking-repetitivePrice'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['edit-parking-repetitivePrice'].message}
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
                isInvalid={errors['edit-parking-permanentPrice']}
                name="edit-parking-permanentPrice"
              />
              {errors['edit-parking-permanentPrice'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['edit-parking-permanentPrice'].message}
                </Text>
              ) : null}
            </VStack>
          </HStack>

          <Text color="error.500">{errorMessage}</Text>

          <Button type="submit" variant="solid">
            Spremi
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
