import { Box, Heading, VStack, Text, Input, HStack, Button, Link, Checkbox } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { usePrivateRoute } from '../../hooks/usePrivateRoute';

import { useStore } from '../../store/StoreProvider';
import { EMAIL_REGEX } from '../../utils/constants';
import { post } from '../../utils/network';

export function RegistrationFormCompany() {
  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, errors, handleSubmit, watch } = useForm();
  const history = useHistory();

  function onRegisterCompany(formData) {
    const requestBody = {
      data: {
        email: formData['register-company-email'],
        name: formData['register-company-name'],
        password: formData['register-company-password'],
        OIB: formData['register-company-oib'],
        address: formData['register-company-address'],
      },
    };

    post('registration/company', requestBody)
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

  const { currentUser } = usePrivateRoute({ redirectIfFound: true });

  if (currentUser) {
    return null;
  }

  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4">
        Registriraj se
      </Heading>

      <form onSubmit={handleSubmit(onRegisterCompany)}>
        <VStack flex="1" marginY="8" spacing="4" align="stretch">
          <HStack align="stretch">
            <VStack flex="1" align="baseline">
              <Text as="label">Naziv tvrtke</Text>
              <Input
                ref={register({
                  required: 'Naziv tvrtke je obavezan',
                })}
                isInvalid={errors['register-company-name']}
                name="register-company-name"
                placeholder="Naziv tvrtke"
              />
              {errors['register-company-name'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['register-company-name'].message}
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
              isInvalid={errors['register-company-email']}
              name="register-company-email"
              placeholder="Va??a e-mail adresa"
            />
            {errors['register-company-email'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['register-company-email'].message}
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
                isInvalid={errors['register-company-password']}
                name="register-company-password"
                type="password"
                placeholder="Va??a lozinka"
              />
              {errors['register-company-password'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['register-company-password'].message}
                </Text>
              ) : null}
            </VStack>

            <VStack flex="1" align="baseline">
              <Text as="label">Ponovljena lozinka</Text>
              <Input
                ref={register({
                  required: 'Lozinka je obavezna',
                  validate: (value) => value === watch('register-company-password') || 'Lozinke nisu jednake',
                })}
                isInvalid={errors['register-company-password-repeat']}
                name="register-company-password-repeat"
                type="password"
                placeholder="Ponovljena lozinka"
              />
              {errors['register-company-password-repeat'] ? (
                <Text color="error.500" fontSize="sm">
                  {errors['register-company-password-repeat'].message}
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
                  message: 'OIB mora sadr??avati samo brojeve',
                },
                validate: (value) => value.length === 11 || 'OIB mora sadr??avati to??no 11 brojeva',
              })}
              isInvalid={errors['register-company-oib']}
              name="register-company-oib"
              placeholder="Va?? OIB"
            />
            {errors['register-company-oib'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['register-company-oib'].message}
              </Text>
            ) : null}
          </VStack>

          <VStack flex="1" align="stretch">
            <Text as="label">Adresa sjedi??ta</Text>
            <Input
              ref={register({
                required: 'Adresa sjedi??ta je obavezan',
              })}
              isInvalid={errors['register-company-address']}
              name="register-company-address"
              placeholder="Va??a adresa sjedi??ta"
            />
            {errors['register-company-address'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['register-company-address'].message}
              </Text>
            ) : null}
          </VStack>

          <VStack align="start">
            <Checkbox
              ref={register({
                required: 'Potrebno je prihvatiti uvjete kori??tenja aplikacije',
              })}
              isInvalid={errors['register-company-term']}
              name="register-company-term"
              border="1rem"
            >
              Prihva??am uvjete kori??tenja aplikacije
            </Checkbox>
            {errors['register-company-term'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['register-company-term'].message}
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
          Ve?? imate korisni??ki ra??un?
          <Link fontWeight="bold" marginLeft="2" as={ReactLink} to="/login">
            Prijava
          </Link>
        </Text>
      </HStack>
    </Box>
  );
}
