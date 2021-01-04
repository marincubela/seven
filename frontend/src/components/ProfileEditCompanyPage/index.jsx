import { Box, Heading, VStack, Text, Input, HStack, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { EMAIL_REGEX } from '../../utils/constants';
import { update, get } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export function ProfileEditCompanyPage() {
  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const user = store.currentUser;

  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      'edit-company-email': user.email,
      'edit-company-oib': user.OIB,
      'edit-company-name': user.tvrtka.name,
      'edit-company-address': user.tvrtka.address,
    },
  });

  const history = useHistory();

  function onEdit(formData) {
    const requestBody = {
      data: {
        email: formData['edit-company-email'],
        name: formData['edit-company-name'],
        OIB: formData['edit-company-oib'],
        address: formData['edit-company-address'],
      },
    };

    update(`user/company/${user.idRacun}`, requestBody)
      .then(() => {
        return get('session');
      })
      .then((res) => {
        store.setCurrentUser(res.data.user);
        history.push('/profile');
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
        Uređivanje korisničkih podataka
      </Heading>

      <form onSubmit={handleSubmit(onEdit)}>
        <VStack flex="1" align="stretch" marginY="8" spacing="4">
          <HStack align="stretch">
            <VStack flex="1" align="baseline">
              <Text as="label">Ime</Text>
              <Input
                ref={register({
                  required: 'Ime je obavezno',
                })}
                isInvalid={errors['edit-company-name']}
                name="edit-company-name"
                placeholder="Vaše ime"
              />
              {errors['edit-company-name'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['edit-company-name'].message}
                </Text>
              ) : null}
            </VStack>
          </HStack>

          <VStack flex="1" align="stretch">
            <Text as="label">E-mail adresa</Text>
            <Input
              ref={register({
                required: 'Email adresa je obavezna',
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Email je neispravan',
                },
              })}
              isInvalid={errors['edit-company-email']}
              name="edit-company-email"
              placeholder="Vaša e-mail adresa"
            />
            {errors['edit-company-email'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-company-email'].message}
              </Text>
            ) : null}
          </VStack>

          <VStack flex="1" align="stretch">
            <Text as="label">OIB</Text>
            <Input
              ref={register({
                required: 'OIB je obavezan',
                pattern: {
                  value: /^\d*$/,
                  message: 'OIB mora sadržavati samo brojeve',
                },
                validate: (value) => value.length === 11 || 'OIB mora sadržavati točno 11 brojeva',
              })}
              isInvalid={errors['edit-company-oib']}
              name="edit-company-oib"
              placeholder="Vaš OIB"
            />
            {errors['edit-company-oib'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-company-oib'].message}
              </Text>
            ) : null}
          </VStack>

          <Text color="error.500">{errorMessage}</Text>

          <Button type="submit" variant="solid">
            Spremi
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
