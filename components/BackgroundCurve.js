import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Svg, {  Path } from 'react-native-svg';

const BackgroundCurve = ({ style }) => {
  return (
    <View style={style}>
      <View style={styles.viewAbove} />
      <Svg height="100%" width="100%" style={styles.svg} viewBox="0 0 1440 320">
        <Path
          fill="#2980b9"
          // d="M0,256L48,261.3C96,267,192,277,288,245.3C384,213,480,139,576,101.3C672,64,768,64,864,101.3C960,139,1056,213,1152,218.7C1248,224,1344,160,1392,128L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          d="M0,320L1440,64L1440,0L0,0Z"
        />
      </Svg>
    </View>
  );
};

export default BackgroundCurve;

const styles = StyleSheet.create({
  viewAbove: {
    backgroundColor: '#2980b9',
    height: Dimensions.get('window').height *0.3,
  },
  svg: {
    position: 'absolute',
    top: Dimensions.get('window').height *0.2,
  },
});
