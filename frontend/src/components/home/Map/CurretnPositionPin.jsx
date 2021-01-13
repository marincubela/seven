import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Circle, useMapEvents } from 'react-leaflet';

export const CurrentPositionPin = ({ currLocation }) => {
  const [zoom, setZoom] = useState(14);
  const map = useMapEvents({
    zoom: ({ sourceTarget }) => setZoom(sourceTarget._zoom),
  });
  const [recentered, setRecentered] = useState();

  const currPosition = useMemo(
    () => currLocation?.coords && [currLocation.coords.latitude, currLocation.coords.longitude],
    [currLocation],
  );

  useEffect(() => {
    if (map && !recentered && currPosition) {
      map.setView(currPosition, zoom);
      setRecentered(true);
    }
  });

  if (!currLocation?.coords) return null;

  return (
    <Fragment>
      <Circle center={currPosition} pathOptions={{}} radius={currLocation.coords.accuracy} />
      <Circle
        center={currPosition}
        pathOptions={{
          color: 'blue',
          fillOpacity: 1,
        }}
        radius={(zoom / 14) * 20}
      />
    </Fragment>
  );
};
