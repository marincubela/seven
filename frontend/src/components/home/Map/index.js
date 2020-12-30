import { Box } from '@chakra-ui/core';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export const Map = () => {
  return (
    <Box as={MapContainer} center={[45.8, 15.97]} zoom={14} w="100%" h="100%" zoomControl={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </Box>
  );
};
