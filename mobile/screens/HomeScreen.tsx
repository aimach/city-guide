import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { CardType, Category, City, Poi } from '../utils/types';
import Card from '../components/Card';

export const HomeScreen = () => {
   const [cities, setCities] = useState<City[]>([]);
   const [poiList, setPoiList] = useState<Poi[]>([]);
   const [modaleOpen, setModaleOpen] = useState(false);
   const getCities = async () => {
      try {
         const response = await fetch('http://192.168.1.104:5000/api/cities');
         const data = await response.json();
         setCities(data);
      } catch (error) {
         console.log(error);
      }
   };

   const cityToShow = cities.length > 0 ? cities[2] : null;
   let cityCategories: Category[] = [];
   let cityPoi: Poi[] = [];
   cityToShow?.poi?.forEach((poi) => {
      if (poi.isAccepted) {
         cityPoi.push(poi);
         if (!cityCategories.find((cat) => cat.id === poi.category.id)) {
            cityCategories.push(poi.category);
         }
      }
   });

   useEffect(() => {
      getCities();
      setPoiList(cityPoi);
   }, []);

   const getPoiByCityAndCategory = async (
      categoryName?: string,
      cityName?: string
   ): Promise<void> => {
      try {
         const response = await fetch(
            `http://192.168.1.104:5000/api/poi?city=${cityName}&category=${categoryName}`
         );
         const data = await response.json();
         if (!data.error) {
            setPoiList(data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handlePress = (cardType: CardType, name: string) => {
      if (cardType === CardType.CATEGORY && cityToShow != null) {
         getPoiByCityAndCategory(name, cityToShow.name);
      }
      if (cardType === CardType.POI) {
         setModaleOpen((state) => !state);
      }
   };

   return (
      <ScrollView>
         <View style={styles.container}>
            <Text style={styles.cityTitle}>
               {cityToShow != null
                  ? cityToShow.name
                  : 'Aucune ville à afficher'}
            </Text>

            <ScrollView
               horizontal={true}
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={styles.cardContainer}
            >
               {cityCategories.map((cat) => (
                  <Card
                     key={cat.id}
                     data={cat}
                     handlePress={handlePress}
                     cardType={CardType.CATEGORY}
                  />
               ))}
            </ScrollView>

            <Text style={styles.poiHeader}>
               {poiList.length > 0
                  ? `${poiList.length} points d'intérêt trouvés`
                  : "Aucun point d'intérêt"}
            </Text>
            <View style={styles.cardContainer}>
               {poiList.map((poi) => (
                  <Card
                     key={poi.id}
                     data={poi}
                     cardType={CardType.POI}
                     handlePress={() => {}}
                  />
               ))}
            </View>
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 7,
      marginTop: 50,
      gap: 20,
   },
   cardContainer: {
      gap: 15,
   },
   cityTitle: {
      fontSize: 24,
      fontWeight: '700',
   },
   poiHeader: {
      fontSize: 18,
      fontWeight: '500',
   },
});
