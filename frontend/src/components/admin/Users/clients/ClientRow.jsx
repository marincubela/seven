import { HStack, Td, Tr } from '@chakra-ui/react';
import React from 'react';

import { DeleteAction } from '../shared/DeleteAction';
import { ClientViewAction } from './ClientViewAction';

export const ClientRow = ({ user, ...rest }) => {
  const { idRacun, firstName, lastName, email } = user;

  return (
    <Tr {...rest}>
      <Td>{idRacun}</Td>
      <Td>{firstName}</Td>
      <Td>{lastName}</Td>
      <Td>{email}</Td>
      <Td>
        <HStack spacing={2}>
          <ClientViewAction user={user} />

          <DeleteAction
            aria-label={`Izbriši ${firstName} ${lastName}`}
            name={`${firstName} ${lastName}`}
            idRacun={idRacun}
          />
        </HStack>
      </Td>
    </Tr>
  );
};
