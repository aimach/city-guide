import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = () => {
   const [region, setRegion] = useState({
      latitude: 46.227638,
      longitude: 2.213749,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
   });
   return (
      <View>
         <MapView style={styles.map} region={region} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   map: {
      width: '100%',
      height: '100%',
   },
});

export default MapScreen;
