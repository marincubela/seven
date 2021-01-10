import React, { useEffect, useState } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

import 'leaflet/dist/leaflet';

import customTheme from './styles/theme';
import { Home } from './routes/home';
import { Profile } from './routes/profile';
import { Registration } from './routes/registration';
import { RegistrationCompany } from './routes/registrationCompany';
import { RegistrationPerson } from './routes/registrationPerson';
import { Login } from './routes/login';
import { Error } from './routes/error';
import { get } from './utils/network';
// import { useStore } from './store/StoreProvider';
import { VehiclesL } from './routes/vehiclesList';
import { VehiclesA } from './routes/vehiclesAdd';
import { VehiclesUp } from './routes/vehicleUpdate';

import { StoreProvider } from './store/StoreProvider';
import { getOrInitializeStore } from './utils/store';
import { Parkings } from './routes/parkingsList';
import { ParkingAdd } from './routes/parkingsAdd';
import { ParkingEdit } from './routes/parkingsEdit';
import { ProfileEditPerson } from './routes/profileEditPerson';
import { ProfileEditCompany } from './routes/profileEditCompany';
import { AdminRouter } from './Admin';
import { ReservationList } from './routes/reservationList';
import { AddReservation } from './routes/addReservation';
import { AddOnetimeReservation } from './routes/addOnetimeReservation';
import { AddRepetitiveReservation } from './routes/addRepetitiveReservation';
import { AddPermanentReservation } from './routes/addPermanentReservation';

const App = () => {
  const [store] = useState(() => getOrInitializeStore());
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    get('session')
      .then((res) => {
        store.setCurrentUser(res.data.user);
      })
      .catch(() => {})
      .finally(() => setFinished(true));
  }, []);

  if (!finished) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <ChakraProvider theme={extendTheme(customTheme)}>
        <Router>
          <Switch>
            <Route path="/vehicles/add">
              <VehiclesA />
            </Route>

            <Route path="/vehicles/update">
              <VehiclesUp />
            </Route>

            <Route path="/vehicles">
              <VehiclesL />
            </Route>
            <Route path="/parkings/add">
              <ParkingAdd />
            </Route>

            <Route path="/parkings/edit">
              <ParkingEdit />
            </Route>

            <Route path="/parkings">
              <Parkings />
            </Route>

            <Route path="/admin">
              <AdminRouter />
            </Route>

            <Route path="/registration/company">
              <RegistrationCompany />
            </Route>

            <Route path="/registration/person">
              <RegistrationPerson />
            </Route>

            <Route path="/registration">
              <Registration />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/profile/edit/company">
              <ProfileEditCompany />
            </Route>

            <Route path="/profile/edit/person">
              <ProfileEditPerson />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/reservationList">
              <ReservationList />
            </Route>

            <Route path="/addReservation">
              <AddReservation />
            </Route>

            <Route path="/addOnetimeReservation">
              <AddOnetimeReservation />
            </Route>

            <Route path="/addRepetitiveReservation">
              <AddRepetitiveReservation />
            </Route>

            <Route path="/addPermanentReservation">
              <AddPermanentReservation />
            </Route>

            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/">
              <Error />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </StoreProvider>
  );
};

export default observer(App);
