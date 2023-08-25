import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PagerView, {PagerViewOnPageScrollEvent} from 'react-native-pager-view';
import Animated, {interpolateColor} from 'react-native-reanimated';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

interface IProps {}

const data: {heading: string; subHeading: string; image: string}[] = [
  {
    heading: 'Engaing Video Lessons',
    subHeading:
      'You may want to achieve an angled gradient effect, similar to those in image editors like Photoshop',
    image: '',
  },
  {
    heading: 'Unlimited Tests & Analysis',
    subHeading:
      'You may want to achieve an angled gradient effect, similar to those in image editors like Photoshop',
    image: '',
  },
  {
    heading: 'Personalised Learning',
    subHeading:
      'You may want to achieve an angled gradient effect, similar to those in image editors like Photoshop',
    image: '',
  },
];

const topColors = ['#ffbb33', '#99cc00', '#33b5e5'];
const bottomColors = ['#ff8800', '#669900', '#0099cc'];

const Onboarding1Screen: FC<IProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const insets = useSafeAreaInsets();

  const [colorTop, setColorTop] = useState(topColors[0]);
  const [colorBottom, setColorBottom] = useState(bottomColors[0]);

  const onPageScroll = (event: PagerViewOnPageScrollEvent) => {
    let position = event.nativeEvent.position;
    const offset = event.nativeEvent.offset;

    const valueOfLight = topColors[position];
    const valueOfDark = bottomColors[position];

    if (position !== 2) {
      position++;
    }

    setColorTop(
      interpolateColor(offset, [0, 1], [valueOfLight, topColors[position]]),
    );
    setColorBottom(
      interpolateColor(offset, [0, 1], [valueOfDark, bottomColors[position]]),
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView} edges={['left', 'right']}>
      <StatusBar barStyle={'dark-content'} />

      <LinearGradient
        style={[styles.container]}
        colors={[colorTop, colorBottom]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.backButton,
            {
              top: insets.top,
            },
          ]}>
          <Icon name="arrow-back" size={32} color={'black'} />
        </TouchableOpacity>

        <AnimatedPagerView
          style={[styles.pagerView]}
          initialPage={0}
          offscreenPageLimit={3}
          onPageScroll={onPageScroll}>
          {data.map((item, index) => (
            <View style={[styles.pagerViewChild]} key={`${index}`}>
              <Text style={styles.heading}>{item.heading}</Text>
              <Text style={styles.subHeading}>{item.subHeading}</Text>
            </View>
          ))}
        </AnimatedPagerView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    padding: 12,
    zIndex: 12,
  },
  pagerView: {
    flex: 1,
  },
  pagerViewChild: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  heading: {
    fontSize: 24,
    fontFamily: 'Quicksand Bold',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 20,
    fontFamily: 'Quicksand Medium',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default Onboarding1Screen;
