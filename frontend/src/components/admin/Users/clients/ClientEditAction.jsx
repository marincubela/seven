import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';

import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg';
import { ClientEditForm } from './ClientEditForm';

export const ClientEditAction = ({ user, ...rest }) => {
  const { firstName, lastName } = user;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAbort = () => {
    setIsAlertOpen(false);
    onClose();
  };

  return (
    <Fragment>
      <IconButton
        ml="auto"
        variant="outline"
        aria-label={`Uredi ${firstName} ${lastName}`}
        colorScheme="primary"
        size="sm"
        icon={<Icon as={EditIcon} />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={() => setIsAlertOpen(true)} closeOnOverlayClick closeOnEsc>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Uređivanje {firstName} {lastName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ClientEditForm user={user} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog isOpen={isAlertOpen} {...rest}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Prekini uređivanje
            </AlertDialogHeader>

            <AlertDialogBody>Ova radnja je nepovratna, jeste li sigurni da prekinuti uređivanje?</AlertDialogBody>

            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setIsAlertOpen(false)}>
                Odustani
              </Button>

              <Button colorScheme="error" ml={2} onClick={handleAbort}>
                Zatvori
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  );
};
