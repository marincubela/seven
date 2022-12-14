import { Box, Heading, VStack, Text, Input, HStack, Button, Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { post } from '../../utils/network';
import { EMAIL_REGEX } from '../../utils/constants';
import { useStore } from '../../store/StoreProvider';
import { usePrivateRoute } from '../../hooks/usePrivateRoute';

export function LoginForm() {
  const store = useStore();
  const [errorMessage, setErrorMessage] = useState('');
  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
  });
  const history = useHistory();

  const { currentUser } = usePrivateRoute({ redirectIfFound: true, redirectPath: '/' });

  function onLoginAction(formData) {
    const requestBody = {
      data: {
        email: formData['login-email'],
        password: formData['login-password'],
      },
    };

    post('session', requestBody)
      .then((res) => {
        if (res.data && res.data.user) {
          store.setCurrentUser(res.data.user);
          history.replace('/');
        }
      })
      .catch((res) => {
        console.log(res);
        if (res.errors && res.errors[0] && res.errors[0].message) {
          setErrorMessage(res.errors[0].message);
        }
      });
  }

  if (currentUser) {
    return null;
  }

  return (
    <Box bgColor="primary.200" marginY="8" padding="6" borderRadius="lg">
      <Heading as="h2" size="xl" marginY="4">
        Prijavi se
      </Heading>

      <form onSubmit={handleSubmit(onLoginAction)}>
        <VStack marginY="8" spacing="4" align="stretch">
          <VStack align="stretch">
            <Text as="label">E-mail adresa</Text>
            <Input
              ref={register({
                required: 'Email je obavezan',
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Email je neispravan',
                },
              })}
              isInvalid={errors['login-email']}
              name="login-email"
              placeholder="Va??a email adresa"
            />
            {errors['login-email'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['login-email'].message}
              </Text>
            ) : null}
          </VStack>

          <VStack align="stretch">
            <Text as="label">Lozinka</Text>
            <Input
              ref={register({
                required: 'Lozinka je obavezna',
              })}
              isInvalid={errors['login-password']}
              name="login-password"
              placeholder="Va??a lozinka"
              type="password"
            />
            {errors['login-password'] ? (
              <Text color="error.500" fontSize="sm">
                {errors['login-password'].message}
              </Text>
            ) : null}
          </VStack>

          <Text color="error.500">{errorMessage}</Text>

          <Button variant="solid" type="submit">
            Prijava
          </Button>
        </VStack>
      </form>

      <HStack>
        <Text as="label">
          Nemate korisni??ki ra??un?
          <Link fontWeight="bold" marginLeft="2" as={ReactLink} to="/registration">
            Registracija
          </Link>
        </Text>
      </HStack>
    </Box>
  );
}
