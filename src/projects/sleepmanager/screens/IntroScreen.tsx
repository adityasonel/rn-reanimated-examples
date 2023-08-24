import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  ZoomInEasyUp,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps {}

const IntroScreen: React.FC<IProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const rotation = useSharedValue(0);
  const spinStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 8 * 1000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
    return () => cancelAnimation(rotation);
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.topChild}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={32} color={'white'} />
          </TouchableOpacity>

          <Animated.View
            entering={ZoomInEasyUp.springify(1200)}
            style={styles.blackStarsContainer}>
            <Animated.Image
              style={[styles.blackStarImage1, spinStyle]}
              source={require('../../../assets/sleepManager/wavyborderstar.png')}
            />
            <Animated.Image
              style={[styles.blackStarImage2, spinStyle]}
              source={require('../../../assets/sleepManager/wavyborderstar.png')}
            />
            <Animated.Image
              style={[styles.blackStarImage3, spinStyle]}
              source={require('../../../assets/sleepManager/wavyborderstar.png')}
            />
          </Animated.View>
        </View>
        <View style={styles.bottomChild}>
          <FlatList
            contentContainerStyle={styles.listContainerStyle}
            data={['go for', 'better dreams', 'with', 'us']}
            renderItem={({item, index}) => {
              return (
                <Animated.Text
                  entering={FadeInDown.duration(1200)
                    .easing(Easing.linear)
                    .delay(index * 600)
                    .springify(1200)}
                  style={[styles.introText, index === 1 && styles.blueText]}>
                  {item}
                </Animated.Text>
              );
            }}
          />

          <View style={styles.starButtonContainer}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('details')}>
              <View style={styles.starButtonChildContainer}>
                <Animated.Image
                  style={[styles.starImage, spinStyle]}
                  source={require('../../../assets/sleepManager/wavystart.png')}
                />
                <Icon
                  style={styles.starButtonIcon}
                  name="arrow-forward"
                  size={32}
                  color={'black'}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#05040F',
  },
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#05040F',
  },
  topChild: {flex: 1},
  backButton: {
    zIndex: 10,
  },
  blackStarsContainer: {},
  blackStarImage1: {
    width: 220,
    height: 220,
    right: -90,
    top: -90,
    position: 'absolute',
  },
  blackStarImage2: {
    width: 320,
    height: 320,
    right: -80,
    top: -80,
    position: 'absolute',
  },
  blackStarImage3: {
    width: 320,
    height: 320,
    right: 80,
    top: -200,
    position: 'absolute',
  },
  bottomChild: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  listContainerStyle: {
    position: 'absolute',
    bottom: 0,
  },
  introText: {
    fontFamily: 'Quicksand Bold',
    fontWeight: 'bold',
    fontSize: 50,
    textTransform: 'uppercase',
    color: 'white',
    flexWrap: 'wrap',
  },
  blueText: {
    color: '#4D3EFF',
  },
  starButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  starButtonChildContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  starButtonIcon: {position: 'absolute'},
  starImage: {
    width: 90,
    height: 90,
  },
});

export default IntroScreen;
