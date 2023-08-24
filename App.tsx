import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import IntroScreen from './src/projects/sleepmanager/screens/IntroScreen';
import DetailsScreen from './src/projects/sleepmanager/screens/DetailsScreen';
import HomeScreen from './src/HomeScreen';

const SleepManagerStackNavigator = createNativeStackNavigator();
const SleepManagerStack = () => {
  return (
    <SleepManagerStackNavigator.Navigator
      initialRouteName="intro"
      screenOptions={{
        headerShown: false,
      }}>
      <SleepManagerStackNavigator.Screen component={IntroScreen} name="intro" />
      <SleepManagerStackNavigator.Screen
        component={DetailsScreen}
        name="details"
      />
    </SleepManagerStackNavigator.Navigator>
  );
};

const MainStackNavigator = createNativeStackNavigator();

const App: FC = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator.Navigator initialRouteName="home">
        <MainStackNavigator.Screen
          component={HomeScreen}
          name="home"
          options={{
            headerTitle: 'Yahoo!',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontFamily: 'Filson Pro Bold',
              color: 'white',
            },
          }}
        />
        <MainStackNavigator.Screen
          component={SleepManagerStack}
          name="sleepManager"
          options={{
            headerShown: false,
          }}
        />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
