import { Box, Heading, VStack, Text, Input, HStack, Button, Link } from '@chakra-ui/core';
import React, { useState } from 'react';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { post } from '../../utils/network';
import { EMAIL_REGEX } from '../../utils/constants';

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
  });
  const history = useHistory();

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
          history.replace('/');
        }
      })
      .catch((res) => {
        if (res.errors && res.errors[0] && res.errors[0].message) {
          setErrorMessage(res.errors[0].message);
        }
      });
  }

  const emailErrorMessage = errors['login-email'] ? errors['login-email'].message : '';
  const passwordErrorMessage = errors['login-password'] ? errors['login-password'].message : '';

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
              isInvalid={emailErrorMessage}
              name="login-email"
              placeholder="Tvoja e-mail adresa"
            />
            {emailErrorMessage ? (
              <Text color="error.500" fontSize="sm">
                {emailErrorMessage}
              </Text>
            ) : null}
          </VStack>

          <VStack align="stretch">
            <Text as="label">Lozinka</Text>
            <Input
              ref={register({
                required: 'Lozinka je obavezna',
              })}
              isInvalid={passwordErrorMessage}
              name="login-password"
              placeholder="Tvoja lozinka"
              type="password"
            />
            {passwordErrorMessage ? (
              <Text color="error.500" fontSize="sm">
                {passwordErrorMessage}
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
          Nemate korisnički račun?
          <Link fontWeight="bold" marginLeft="2" as={ReactLink} to="/registration">
            Registracija
          </Link>
        </Text>
      </HStack>
    </Box>
  );
}
