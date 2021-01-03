import React from 'react';
import { Link, HStack, Heading } from '@chakra-ui/react';
import { useRouteMatch, Link as ReactLink } from 'react-router-dom';

export const AdminNavigation = (props) => {
  const { url } = useRouteMatch();

  return (
    <HStack spacing={4} p={4} color="primary.600" {...props}>
      <Heading size="md">
        <Link as={ReactLink} to="/">
          Parkiraj me
        </Link>
      </Heading>

      <Link as={ReactLink} to={`${url}`}>
        Početna
      </Link>

      <Link as={ReactLink} to={`${url}/users`}>
        Korisnici
      </Link>
    </HStack>
  );
};
