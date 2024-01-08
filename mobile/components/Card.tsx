import {
   View,
   Text,
   StyleSheet,
   Image,
   ImageSourcePropType,
   ImageURISource,
   Pressable,
} from 'react-native';
import React from 'react';
import { CardType, Category, City, Poi } from '../utils/types';

interface Props {
   data: City | Category | Poi;
   handlePress: (cardType: CardType, name: string) => void;
   cardType: CardType;
   modaleOpen?: boolean;
}

const Card = ({ data, handlePress, cardType, modaleOpen }: Props) => {
   return (
      <View style={styles.container}>
         <Pressable onPress={() => handlePress(cardType, data.name)}>
            <View style={styles.imageContainer}>
               <Image source={{ uri: data.image }} style={styles.image} />
               <Text style={styles.text}>{data.name}</Text>
            </View>
         </Pressable>
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
