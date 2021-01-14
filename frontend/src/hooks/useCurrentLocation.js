import { useEffect, useState } from 'react';

export const useCurrentLocation = ({ onSuccess, onError } = {}) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (p) => {
          setLocation(p);

          if (onSuccess) {
            onSuccess(p);
          }
        },
        () => {
          setError('Nije moguće očitati trenutnu lokaciju');

          if (onError) {
            onError('Nije moguće očitati trenutnu lokaciju');
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          // maximumAge: Infinity,
        },
      );
    } else {
      setError('Your browser does not support geolocation features');

      if (onError) {
        onError('Your browser does not support geolocation features');
      }
    }
  }, []);

  return [location, error];
};
