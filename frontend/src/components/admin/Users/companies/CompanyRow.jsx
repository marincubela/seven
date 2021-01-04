import { HStack, Td, Tr } from '@chakra-ui/react';
import React from 'react';

import { DeleteAction } from '../shared/DeleteAction';

import { CompanyViewAction } from './CompanyViewAction';

export const CompanyRow = ({ user, ...rest }) => {
  const { idRacun, name, email } = user;

  return (
    <Tr {...rest}>
      <Td>{idRacun}</Td>
      <Td>{name}</Td>
      <Td>{email}</Td>
      <Td>
        <HStack spacing={4}>
          <CompanyViewAction user={user} />

          <DeleteAction aria-label={`Izbriši ${name}`} name={name} idRacun={idRacun} />
        </HStack>
      </Td>
    </Tr>
  );
};
