import { HStack, Td, Tr } from '@chakra-ui/react';
import React from 'react';

import { DeleteAction } from '../shared/DeleteAction';
import { ClientEditAction } from './ClientEditAction';

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
          {/* <IconButton
            ml="auto"
            variant="outline"
            aria-label={`Pregledaj ${firstName} ${lastName}`}
            colorScheme="primary"
            size="sm"
            icon={<Icon as={EyeIcon} />}
          /> */}

          <ClientEditAction user={user} />

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
