import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import IntroScreen from './src/projects/sleepmanager/screens/IntroScreen';
import HomeScreen from './src/HomeScreen';
import Onboarding1Screen from './src/projects/onboarding1/screens/Onboarding1Screen';

const SleepManagerStackNavigator = createNativeStackNavigator();
const SleepManagerStack = () => {
  return (
    <SleepManagerStackNavigator.Navigator
      initialRouteName="intro"
      screenOptions={{
        headerShown: false,
      }}>
      <SleepManagerStackNavigator.Screen component={IntroScreen} name="intro" />
    </SleepManagerStackNavigator.Navigator>
  );
};

const Onboarding1StackNavigator = createNativeStackNavigator();
const Onboarding1Stack = () => {
  return (
    <Onboarding1StackNavigator.Navigator
      initialRouteName="intro"
      screenOptions={{
        headerShown: false,
      }}>
      <Onboarding1StackNavigator.Screen
        component={Onboarding1Screen}
        name="intro"
      />
    </Onboarding1StackNavigator.Navigator>
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
        <MainStackNavigator.Screen
          component={Onboarding1Stack}
          name="onboarding1"
          options={{
            headerShown: false,
          }}
        />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
