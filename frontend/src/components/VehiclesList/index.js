// import React from 'react';

import { get } from '../../utils/network';
import { useStore } from '../../store/StoreProvider';

export function VehiclesList() {
  const store = useStore();
  var currUser = store.getCurrentUser();
  var vehicles;

  ///client/:idRacun
  get(`client/${currUser.idRacun}`)
    .then((res) => {
      if (res.data && res.data.vehicles) {
        // dohvaćena vozila
        vehicles = res.data.vehicles;
        console.log('dohvaćena vozila: ');
        console.log(vehicles);
      }
    })
    .catch((res) => {
      console.log(res);
      // if (true) {
      //   // setErrormessage
      // }
    });
}
