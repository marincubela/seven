import React from 'react';
import { Box, Button, Heading, Link } from '@chakra-ui/core';
import { Link as ReactLink } from 'react-router-dom';
import { get } from '../../utils/network';
// import { useStore } from '../../store/StoreProvider';

export function ParkingsList() {
  var Parkings;

  // vehicle?client={broj racuna trenutnog usera}
  // get(`vehicle?client=${encodeURIComponent('8')}`)
  get(`parking/company/${encodeURIComponent('8')}`)
    .then((res) => {
      if (res.data && res.data.Parkings) {
        // dohvaćena parkirališta
        Parkings = res.data.Parkings;
        console.log('dohvaćena parkirališta: ');
        console.log(Parkings);
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
      <Heading>Parkirališta</Heading>
      {/* <Box>{vehicles}</Box> */}
      <Button>
        <Link as={ReactLink} to="/parkings/add" flex="1">
          Dodaj
        </Link>
      </Button>
    </Box>
  );
}
