import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React from 'react';

export const DeleteAlert = ({ isOpen, close, name, onDelete, ...rest }) => {
  return (
    <AlertDialog isOpen={isOpen} {...rest}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Izbriši račun
          </AlertDialogHeader>

          <AlertDialogBody>Ova radnja je nepovratna, jeste li sigurni da želite izbrisati {name}?</AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="outline" onClick={close}>
              Odustani
            </Button>

            <Button colorScheme="error" ml={2} onClick={onDelete}>
              Izbriši
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
