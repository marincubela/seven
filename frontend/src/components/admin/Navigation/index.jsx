import React from 'react';
import { Link, HStack, Heading, Divider } from '@chakra-ui/react';
import { useRouteMatch, Link as ReactLink, useHistory } from 'react-router-dom';

export const AdminNavigation = (props) => {
  const { url } = useRouteMatch();
  const {
    location: { pathname },
  } = useHistory();

  return (
    <HStack spacing={4} p={4} color="primary.600" {...props}>
      <Heading size="md">
        <Link as={ReactLink} to="/">
          Parkiraj me
        </Link>
      </Heading>

      <Divider orientation="vertical" h="2rem" />

      <Link variant="nav" as={ReactLink} to={`${url}/users`} aria-current={pathname === `/${url}/users`}>
        Korisnici
      </Link>
    </HStack>
  );
};
