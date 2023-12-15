import React from 'react';
import { Text, View } from 'react-native';

export const HomeScreen = () => {
   const getCities = async () => {
      const response = await fetch('http://192.168.1.104:5000/api/cities');
      const data = await response.json();
      console.log(data);
   };
   getCities();
   return (
      <View>
         <Text>Home</Text>
      </View>
   );
};
