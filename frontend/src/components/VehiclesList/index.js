import React from 'react';
import { Box, Button, Heading, Link } from '@chakra-ui/core';
import { Link as ReactLink } from 'react-router-dom';
import { get } from '../../utils/network';
// import { useStore } from '../../store/StoreProvider';

export function VehiclesList() {
  var vehicles;

  // vehicle?client={broj racuna trenutnog usera}
  // get(`vehicle?client=${encodeURIComponent('8')}`)
  get(`vehicle/client/${encodeURIComponent('8')}`)
    .then((res) => {
      if (res.data && res.data.vehicles) {
        // dohvaćena vozila
        vehicles = res.data.vehicles;
        console.log('dohvaćena vozila: ');
        console.log(vehicles);
      }
    })
    .catch((res) => {
      console.log('erorrrrrrr');
      console.log(res);
      // if (true) {
      //   // setErrormessage
      // }
    });

  // const items = [];

  // for (const voz in vehicles) {
  //   var el = <li>voz</li>;

  //   items.push(el);
  // }

  return (
    <Box>
      <Heading>vozila</Heading>
      {/* <Box>{vehicles}</Box> */}
      <Button>
        <Link as={ReactLink} to="/vehicles/add" flex="1">
          dodaj
        </Link>
      </Button>
    </Box>
  );
}
