import React, {FC, ReactNode} from 'react';
import {
  Pressable,
  Text,
  PressableProps,
  View,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';

interface IProps extends PressableProps {
  type?: 'elevated' | 'flat' | 'link';
  children: ReactNode;
}

const EDGE_WIDTH = 4;
const SKEW_ANGLE = 45;

const NeoPopButton: FC<IProps> = ({children, disabled, ...props}) => {
  const [layout, setLayout] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onLayout = React.useCallback(
    (event: LayoutChangeEvent) => setLayout(event.nativeEvent.layout),
    [],
  );

  return (
    <Pressable
      style={styles.pressable}
      disabled={disabled}
      {...props}
      onLayout={onLayout}>
      {({pressed}) => (
        <>
          <View
            style={[
              styles.textContainer,
              pressed && styles.textContainerPressed,
            ]}>
            <Text style={styles.text}>{children}</Text>
          </View>

          <View
            style={[
              styles.edge,
              styles.edgeRight,
              {
                height: layout.height - EDGE_WIDTH / 2,
              },
              pressed && styles.edgeRightPressed,
            ]}
          />
          <View
            style={[
              styles.edge,
              styles.edgeBottom,
              {
                width: layout.width - EDGE_WIDTH / 2,
              },
              pressed && styles.edgeBottomPressed,
            ]}
          />
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    width: '100%',
  },
  textContainer: {
    backgroundColor: '#AA3FFF',
    minHeight: 54,
    marginBottom: EDGE_WIDTH,
    marginLeft: 0,
    marginRight: EDGE_WIDTH,
    marginTop: 0,
    justifyContent: 'center',
  },
  textContainerPressed: {
    transform: [{translateX: EDGE_WIDTH}, {translateY: EDGE_WIDTH}],
  },
  text: {
    fontFamily: 'Filson Pro Bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  edge: {
    position: 'absolute',
  },
  edgeBottom: {
    height: EDGE_WIDTH,
    transform: [{skewX: `${SKEW_ANGLE}deg`}],
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'silver',
  },
  edgeBottomPressed: {
    transform: [
      {translateX: EDGE_WIDTH},
      {translateY: EDGE_WIDTH},
      {skewX: `${SKEW_ANGLE}deg`},
    ],
  },
  edgeRight: {
    position: 'absolute',
    right: 0,
    top: 1,
    transform: [{skewY: `${SKEW_ANGLE}deg`}],
    width: EDGE_WIDTH,
    backgroundColor: 'silver',
  },
  edgeRightPressed: {
    transform: [{translateX: EDGE_WIDTH}, {translateY: EDGE_WIDTH}],
  },
});

export default NeoPopButton;
