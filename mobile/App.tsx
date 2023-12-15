import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeScreen } from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import MapScreen from './screens/MapScreen';
export default function App() {
   const Tab = createBottomTabNavigator();

   return (
      <NavigationContainer>
         <Tab.Navigator
            screenOptions={({ route }) => ({
               tabBarIcon: ({ color, size }) => {
                  const icons: any = {
                     Home: 'home',
                     Profil: 'person',
                     Map: 'map',
                  };
                  return (
                     <Ionicons
                        name={icons[route.name]}
                        color={color}
                        size={size}
                     />
                  );
               },
            })}
         >
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profil" component={ProfileScreen} />
         </Tab.Navigator>
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
