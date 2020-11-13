import {
  Box,
  Heading,
  VStack,
  Text,
  Input,
  HStack,
  Button,
  Link,
  Checkbox,
  Divider,
  PinInput,
  PinInputField,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { EMAIL_REGEX } from '../../utils/constants';
import { post } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export function RegistrationFormPerson() {
  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, errors, handleSubmit, watch, control } = useForm();
  const history = useHistory();

  function onRegisterUser(formData) {
    const requestBody = {
      data: {
        email: formData['register-user-email'],
        firstName: formData['register-user-firstname'],
        lastName: formData['register-user-lastname'],
        password: formData['register-user-password'],
        OIB: formData['register-user-oib'],
        cardNumber: formData['register-user-credit-card'],
      },
    };

    post('registration/user', requestBody)
      .then((res) => {
        if (res.data && res.data.user) {
          store.setCurrentUser(res.data.user);

          history.replace('/');
        }
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
        Registriraj se
      </Heading>

      <form onSubmit={handleSubmit(onRegisterUser)}>
        <VStack flex="1" align="stretch" marginY="8" spacing="4">
          <HStack align="stretch">
            <VStack flex="1" align="baseline">
              <Text as="label">Ime</Text>
              <Input
                ref={register({
                  required: 'Ime je obavezno',
                })}
                isInvalid={errors['register-user-firstname']}
                name="register-user-firstname"
                placeholder="Vaše ime"
              />
              {errors['register-user-firstname'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['register-user-firstname'].message}
                </Text>
              ) : null}
            </VStack>

            <VStack flex="1" align="baseline">
              <Text as="label">Prezime</Text>
              <Input
                ref={register({
                  required: 'Prezime je obavezno',
                })}
                isInvalid={errors['register-user-lastname']}
                name="register-user-lastname"
                placeholder="Vaše prezime"
              />
              {errors['register-user-lastname'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['register-user-lastname'].message}
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
              isInvalid={errors['register-user-email']}
              name="register-user-email"
              placeholder="Vaša e-mail adresa"
            />
            {errors['register-user-email'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['register-user-email'].message}
              </Text>
            ) : null}
          </VStack>

          <HStack align="stretch">
            <VStack flex="1" align="baseline">
              <Text as="label">Lozinka</Text>
              <Input
                ref={register({
                  required: 'Lozinka je obavezna',
                  minLength: {
                    value: 8,
                    message: 'Lozinka je prekratka',
                  },
                })}
                isInvalid={errors['register-user-password']}
                name="register-user-password"
                type="password"
                placeholder="Vaša lozinka"
              />
              {errors['register-user-password'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['register-user-password'].message}
                </Text>
              ) : null}
            </VStack>

            <VStack flex="1" align="baseline">
              <Text as="label">Ponovljena lozinka</Text>
              <Input
                ref={register({
                  required: 'Lozinka je obavezna',
                  validate: (value) => value === watch('register-user-password') || 'Lozinke nisu jednake',
                })}
                isInvalid={errors['register-user-password-repeat']}
                name="register-user-password-repeat"
                type="password"
                placeholder="Ponovljena lozinka"
              />
              {errors['register-user-password-repeat'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['register-user-password-repeat'].message}
                </Text>
              ) : null}
            </VStack>
          </HStack>

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
              isInvalid={errors['register-user-oib']}
              name="register-user-oib"
              placeholder="Vaš OIB"
            />
            {errors['register-user-oib'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['register-user-oib'].message}
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
                  name="register-user-credit-card"
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
                      isInvalid={errors['register-user-credit-card']}
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
              {errors['register-user-credit-card'] ? (
                <Text color="error.500" fontSize="sm" alignSelf="flex-start">
                  {errors['register-user-credit-card'].message}
                </Text>
              ) : null}
            </VStack>
          </VStack>

          <VStack align="start">
            <Checkbox
              ref={register({
                required: 'Potrebno je prihvatiti uvjete korištenja aplikacije',
              })}
              isInvalid={errors['register-user-term']}
              name="register-user-term"
              border="1rem"
            >
              Prihvaćam uvjete korištenja aplikacije
            </Checkbox>
            {errors['register-user-term'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['register-user-term'].message}
              </Text>
            ) : null}
          </VStack>

          <Text color="error.500">{errorMessage}</Text>

          <Button type="submit" variant="solid">
            Registracija
          </Button>
        </VStack>
      </form>

      <HStack>
        <Text as="label">
          Već imate korisnički račun?
          <Link fontWeight="bold" marginLeft="2" as={ReactLink} to="/login">
            Prijava
          </Link>
        </Text>
      </HStack>
    </Box>
  );
}
