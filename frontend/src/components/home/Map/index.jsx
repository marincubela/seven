import { Box, useToast } from '@chakra-ui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import { get } from '../../../utils/network';
import { MapPin } from './MapPin';
import { useCurrentLocation } from '../../../hooks/useCurrentLocation';
import { CurrentPositionPin } from './CurretnPositionPin';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export const Map = () => {
  const [parkings, setParking] = useState([]);
  const toast = useToast();

  useEffect(() => {
    get('parking/all')
      .then((res) => setParking(res.data.parkings))
      .catch(() => {});
  }, []);

  const [currLocation] = useCurrentLocation({
    onError: (err) =>
      toast({
        title: err,
        status: 'error',
        position: 'top-right',
      }),
  });

  return (
    <Fragment>
      <Box
        as={MapContainer}
        sx={{ a: { color: 'currentColor' } }}
        center={currLocation ? [currLocation.coords.latitude, currLocation.coords.longitude] : [45.8, 15.97]}
        zoom={14}
        w="100%"
        h="100%"
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <CurrentPositionPin currLocation={currLocation} />

        {parkings.map((parking) => (
          <Marker position={parking.coordinates.split(', ').map((c) => parseFloat(c))} key={parking.idParkiraliste}>
            <Popup>
              <MapPin parking={parking} />
            </Popup>
          </Marker>
        ))}
      </Box>
    </Fragment>
  );
};
