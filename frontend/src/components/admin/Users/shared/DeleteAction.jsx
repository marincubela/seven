import { Icon, IconButton } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import React, { Fragment, useState } from 'react';

import { DeleteAlert } from './DeleteAlert';
import { destroy } from '../../../../utils/network';

import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';

export const DeleteAction = ({ name, idRacun, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const handleDelete = () => {
    destroy(`user/${idRacun}`).then(() => {
      // This will trigger the users list to update after the user is deleted
      history.push('/admin');
      setTimeout(() => history.push('/admin/users'), 10);
    });
  };

  return (
    <Fragment>
      <IconButton
        colorScheme="error"
        size="sm"
        onClick={() => setIsOpen(true)}
        icon={<Icon as={DeleteIcon} />}
        {...rest}
      />

      <DeleteAlert isOpen={isOpen} close={() => setIsOpen(false)} onDelete={handleDelete} name={name} />
    </Fragment>
  );
};
