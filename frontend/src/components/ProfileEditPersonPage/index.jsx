import { Box, Heading, VStack, Text, Input, HStack, Button, Divider, PinInput, PinInputField } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { EMAIL_REGEX } from '../../utils/constants';
import { update, get } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';
import { usePrivateRoute } from '../../hooks/usePrivateRoute';

export function ProfileEditPersonPage() {
  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const user = store.currentUser;

  const { register, errors, handleSubmit, control } = useForm({
    defaultValues: {
      'edit-user-email': user.email,
      'edit-user-firstname': user.klijent?.firstName,
      'edit-user-lastname': user.klijent?.lastName,
      'edit-user-oib': user.OIB,
      'edit-user-credit-card': user.klijent?.cardNumber,
    },
  });

  const history = useHistory();

  function onEdit(formData) {
    const requestBody = {
      data: {
        email: formData['edit-user-email'],
        firstName: formData['edit-user-firstname'],
        lastName: formData['edit-user-lastname'],
        OIB: formData['edit-user-oib'],
        cardNumber: formData['edit-user-credit-card'],
      },
    };

    update(`user/client/${user.idRacun}`, requestBody)
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

  const { currentUser } = usePrivateRoute({ redirectOn: (user) => !user?.klijent });

  if (!currentUser) {
    return null;
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
                isInvalid={errors['edit-user-firstname']}
                name="edit-user-firstname"
                placeholder="Vaše ime"
              />
              {errors['edit-user-firstname'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['edit-user-firstname'].message}
                </Text>
              ) : null}
            </VStack>

            <VStack flex="1" align="baseline">
              <Text as="label">Prezime</Text>
              <Input
                ref={register({
                  required: 'Prezime je obavezno',
                })}
                isInvalid={errors['edit-user-lastname']}
                name="edit-user-lastname"
                placeholder="Vaše prezime"
              />
              {errors['edit-user-lastname'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['edit-user-lastname'].message}
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
              isInvalid={errors['edit-user-email']}
              name="edit-user-email"
              placeholder="Vaša e-mail adresa"
            />
            {errors['edit-user-email'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-user-email'].message}
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
              isInvalid={errors['edit-user-oib']}
              name="edit-user-oib"
              placeholder="Vaš OIB"
            />
            {errors['edit-user-oib'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['edit-user-oib'].message}
              </Text>
            ) : null}
          </VStack>

          <VStack align="baseline">
            <VStack>
              <Text as="label">Broj kartice</Text>
            </VStack>

            <VStack>
              <HStack spacing="0">
                <Controller
                  name="edit-user-credit-card"
                  rules={{
                    required: 'Broj kartice je obavezan',
                    validate: (value) => value.length === 16 || 'Broj kartice mora sadržavati točno 16 brojeva',
                  }}
                  control={control}
                  render={({ onChange, onBlur }) => (
                    <PinInput
                      size="1em"
                      variant="filled"
                      placeholder="•"
                      onChange={onChange}
                      isInvalid={errors['edit-user-credit-card']}
                      defaultValue={user.klijent.cardNumber}
                    >
                      <PinInputField onBlur={onBlur} data-end="left" />
                      <PinInputField onBlur={onBlur} />
                      <PinInputField onBlur={onBlur} />
                      <PinInputField onBlur={onBlur} data-end="right" />

                      <Divider orientation="vertical" width="80%" />

                      <PinInputField onBlur={onBlur} data-end="left" />
                      <PinInputField onBlur={onBlur} />
                      <PinInputField onBlur={onBlur} />
                      <PinInputField onBlur={onBlur} data-end="right" />

                      <Divider orientation="vertical" width="80%" />

                      <PinInputField onBlur={onBlur} data-end="left" />
                      <PinInputField onBlur={onBlur} />
                      <PinInputField onBlur={onBlur} />
                      <PinInputField onBlur={onBlur} data-end="right" />

                      <Divider orientation="vertical" width="80%" />

                      <PinInputField onBlur={onBlur} data-end="left" />
                      <PinInputField onBlur={onBlur} />
                      <PinInputField onBlur={onBlur} />
                      <PinInputField onBlur={onBlur} data-end="right" />
                    </PinInput>
                  )}
                />
              </HStack>
              {errors['edit-user-credit-card'] ? (
                <Text color="error.500" fontSize="sm" alignSelf="flex-start">
                  {errors['edit-user-credit-card'].message}
                </Text>
              ) : null}
            </VStack>
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
