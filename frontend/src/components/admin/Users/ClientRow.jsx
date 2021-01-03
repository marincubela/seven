import { HStack, Icon, IconButton, Td, Tr } from '@chakra-ui/react';
import React from 'react';

import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { DeleteAction } from './DeleteAction';

export const ClientRow = ({ user: { idRacun, firstName, lastName, email }, ...rest }) => {
  return (
    <Tr {...rest}>
      <Td>{idRacun}</Td>
      <Td>{firstName}</Td>
      <Td>{lastName}</Td>
      <Td>{email}</Td>
      <Td>
        <HStack spacing={4}>
          <IconButton
            ml="auto"
            variant="outline"
            aria-label={`Uredi ${firstName} ${lastName}`}
            colorScheme="primary"
            size="sm"
            icon={<Icon as={EditIcon} />}
          />

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
