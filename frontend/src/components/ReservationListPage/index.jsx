import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Center, Spinner } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { get } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';
import { OneTimeReservation } from './oneTimeReservations';
import { RepetitiveReservation } from './repetitiveReservations';
import { PermanentReservation } from './permanentReservations';

export function ReservationListPage() {
  const [reservations, setReservations] = useState([]);
  const history = useHistory();
  const store = useStore();

  useEffect(() => {
    if (store.currentUser) {
      get(`reservation?user=${store.currentUser.idRacun}`)
        .then((res) => {
          if (res.data && res.data.reservations) {
            setReservations(res.data.reservations);
            //console.log(res.data.reservations);
          }
        })
        .catch((res) => {
          if (res.errors && res.errors[0] && res.errors[0].message) {
            //setErrorMessage(res.errors[0].message);
          }
        });
    } else {
      history.replace('/');
    }
  }, []);

  if (!reservations) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Tabs isFitted>
      <TabList>
        <Tab>Jednokratne</Tab>
        <Tab>Ponavljajuće</Tab>
        <Tab>Trajne</Tab>
      </TabList>

      <TabPanels>
        <TabPanel width="full" p={0}>
          <OneTimeReservation singleUse={reservations.singleUse} />
        </TabPanel>

        <TabPanel p={0}>
          <RepetitiveReservation repeated={reservations.repeated} />
        </TabPanel>

        <TabPanel p={0}>
          <PermanentReservation permanent={reservations.permanent} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
