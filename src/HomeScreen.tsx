import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import NeoPopButton from './components/NeoPopButton';

const data: {title: string; route: string}[] = [
  {
    title: 'Sleep Manager',
    route: 'sleepManager',
  },
  {
    title: 'Onboarding 1',
    route: 'onboarding1',
  },
  {title: 'Onboarding 2', route: 'onboarding2'},
  {title: 'Credit Companion', route: 'creditCompanion'},
  {title: 'Crypto Wallet', route: 'cryptoWallet'},
];

const HomeScreen: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const separatorComponent = () => <View style={styles.separator} />;

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <FlatList
        overScrollMode="never"
        style={styles.flatList}
        data={data}
        renderItem={({item}) => (
          <NeoPopButton
            onPress={() => {
              navigation.navigate(item.route);
            }}>
            {item.title}
          </NeoPopButton>
        )}
        ItemSeparatorComponent={separatorComponent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: 'black',
    padding: 12,
  },
  separator: {
    height: 12,
  },
});

export default HomeScreen;
