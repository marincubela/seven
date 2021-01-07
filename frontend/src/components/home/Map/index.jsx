import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import { get } from '../../../utils/network';
import { MapPin } from './MapPin';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export const Map = () => {
  const [parkings, setParking] = useState([]);

  useEffect(() => {
    get('parking/all')
      .then((res) => setParking(res.data.parkings))
      .catch(() => {});
  }, []);

  return (
    <Box as={MapContainer} center={[45.8, 15.97]} zoom={14} w="100%" h="100%" zoomControl={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {parkings.map((parking) => (
        <Marker position={parking.coordinates.split(', ').map((c) => parseFloat(c))} key={parking.idParkiraliste}>
          <Popup>
            <MapPin parking={parking} />
          </Popup>
        </Marker>
      ))}
    </Box>
  );
};
