import { Box, Heading, VStack, Text, Input, HStack, Button, Link } from '@chakra-ui/core';
import React, { useState } from 'react';
// import { Link as ReactLink, useHistory } from 'react-router-dom';
import { Link as ReactLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const EMAIL_REGEX = /^\S+@\S+$/;

export function LoginForm() {
  // const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage] = useState('');
  const { handleSubmit, register, errors } = useForm({
    // defaultValues: {
    //   ['login-email']: 'mojemail',
    // },
    mode: 'onBlur',
  });
  // const history = useHistory();

  function onLoginAction(formData) {
    console.log('submitted', formData);

    // fetch('parkamlf/session', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    // })
    //   .then((user) => {
    //     if (user) {
    //       history.replace('/');
    //     }
    //   })
    //   .catch((err) => {
    //     setErrorMessage(err.message);
    //   });
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
