import {
   View,
   Text,
   StyleSheet,
   Image,
   ImageSourcePropType,
   ImageURISource,
} from 'react-native';
import React from 'react';
import { Category, City, Poi } from '../utils/types';

interface Props {
   data: City | Category | Poi;
}

const Card = ({ data }: Props) => {
   return (
      <View style={styles.container}>
         <View style={styles.imageContainer}>
            <Image source={{ uri: data.image }} style={styles.image} />

            <Text style={styles.text}>{data.name}</Text>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   },
   imageContainer: {
      minWidth: 350,
      position: 'relative',
   },
   image: {
      resizeMode: 'cover',
      height: 270,
      width: '100%',
      borderRadius: 5,
   },

   text: {
      position: 'absolute',
      bottom: 7,
      marginHorizontal: 7,
      fontSize: 20,
      color: 'white',
      fontWeight: '700',
   },
});

export default Card;
