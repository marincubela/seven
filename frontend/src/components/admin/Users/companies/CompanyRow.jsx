import { HStack, Icon, IconButton, Td, Tr } from '@chakra-ui/react';
import React from 'react';

import { DeleteAction } from '../shared/DeleteAction';

import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg';

export const CompanyRow = ({ user: { idRacun, name, email }, ...rest }) => {
  return (
    <Tr {...rest}>
      <Td>{idRacun}</Td>
      <Td>{name}</Td>
      <Td>{email}</Td>
      <Td>
        <HStack spacing={4}>
          <IconButton
            ml="auto"
            variant="outline"
            aria-label={`Uredi ${name}`}
            colorScheme="primary"
            size="sm"
            icon={<Icon as={EditIcon} />}
          />

          <DeleteAction aria-label={`Izbriši ${name}`} name={name} idRacun={idRacun} />
        </HStack>
      </Td>
    </Tr>
  );
};
