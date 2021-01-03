import { Box, Icon, IconButton } from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';

import { DeleteAlert } from './DeleteAlert';

import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';

export const DeleteAction = ({ name, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <IconButton
        colorScheme="error"
        size="sm"
        onClick={() => setIsOpen(true)}
        icon={<Icon as={DeleteIcon} />}
        {...rest}
      />

      <DeleteAlert isOpen={isOpen} close={() => setIsOpen(false)} name={name} />
    </Fragment>
  );
};
