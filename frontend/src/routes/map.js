import { Box } from '@chakra-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export const Map = observer(() => {
  return (
    <Box w="100vw" h="100vh">
      <Box as={MapContainer} center={[45.8, 15.97]} zoom={14} scrollWheelZoom={false} w="100%" h="400px">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Box>
    </Box>
  );
});
