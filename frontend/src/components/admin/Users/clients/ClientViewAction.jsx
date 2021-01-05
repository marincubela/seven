import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as EyeIcon } from '../../../../assets/icons/eye.svg';

import { update } from '../../../../utils/network';

export const ClientViewAction = ({ user, ...rest }) => {
  const { firstName, lastName } = user;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const history = useHistory();

  const handleToggleAdmin = () => {
    update(`user/client/${user.idRacun}`, {
      data: {
        admin: !user.admin,
      },
    }).then(() => {
      // This will trigger the users list to update after the user is deleted
      history.push('/admin');
      setTimeout(() => history.push('/admin/users'), 10);
    });
  };

  return (
    <Fragment>
      <IconButton
        ml="auto"
        variant="outline"
        aria-label={`Uredi ${firstName} ${lastName}`}
        colorScheme="primary"
        size="sm"
        icon={<Icon as={EyeIcon} />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick closeOnEsc>
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />

          <ModalHeader>
            Uređivanje {firstName} {lastName}
          </ModalHeader>

          <ModalBody>
            <Stack>
              <Box>
                <Text fontSize="sm">Ime</Text>
                <Text fontSize="lg" fontWeight="bold" color="primary.600">
                  {user.firstName}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm">Prezime</Text>
                <Text fontSize="lg" fontWeight="bold" color="primary.600">
                  {user.lastName}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm">OIB</Text>
                <Text fontSize="lg" fontWeight="bold" color="primary.600">
                  {user.OIB}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm">E-mail</Text>
                <Text fontSize="lg" fontWeight="bold" color="primary.600">
                  {user.email}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm">Broj kartice</Text>
                <Text fontSize="lg" fontWeight="bold" color="primary.600">
                  {user.cardNumber}
                </Text>
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" onClick={() => setIsAlertOpen(true)}>
              {user.admin ? 'Ukloni administratorska prava' : 'Postavi za admina'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog isOpen={isAlertOpen} isCentered {...rest}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Pažnja!
            </AlertDialogHeader>

            <AlertDialogBody>
              Jeste li sigurni da želite {user.firstName} {user.lastName}{' '}
              {user.admin ? 'ukloniti kao administratora' : 'dodati kao administratora'}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setIsAlertOpen(false)}>
                Odustani
              </Button>

              <Button ml={2} onClick={handleToggleAdmin}>
                {user.admin ? 'Ukloni' : 'Dodaj'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  );
};
