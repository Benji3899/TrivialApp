import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import QuizApp from './src'; // importe composant QuizApp depuis le fichier index.js du dossier src
import Playground from './src/Playground'; // importe composant Playground depuis le fichier Playground.js

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Pile de navigation */}
      <Stack.Navigator> 
         {/* Première route avec le composant QuizApp */}
        <Stack.Screen name="QuizApp" component={QuizApp} />
        {/* Deuxième route avec le composant Playground */}
        <Stack.Screen name="Playground" component={Playground} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
