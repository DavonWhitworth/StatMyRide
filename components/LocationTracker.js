// LocationTracker.js

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';  

const LocationTracker = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Subscribe to location updates
      let locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        (newLocation) => {
          setLocation(newLocation.coords);
        }
      );

      return () => {
        // Cleanup: unsubscribe from location updates
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    })();
  }, []);

  return (
    <View style={{ flex: 1, width: 410 }}>
  {errorMsg ? (
    <Text>{errorMsg}</Text>
  ) : (
    location && ( // Removed extra curly braces here
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude || 37.78825, // Changed to use logical OR operator to provide default values
          longitude: location.longitude || -122.4324, // Changed to use logical OR operator to provide default values
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="ur Location"
          />
        )}
      </MapView>
    )
  )}
</View>

  );
};

export default LocationTracker;
