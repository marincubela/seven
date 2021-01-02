import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/core';
import React from 'react';

import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';

export const Search = (props) => {
  return (
    <InputGroup size="lg" {...props}>
      <Input variant="map" placeholder="Traži parkiralište" />
      <InputRightElement pointerEvents="none">
        <Icon as={SearchIcon} />
      </InputRightElement>
    </InputGroup>
  );
};
