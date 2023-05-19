import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {SECONDARY} from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: SECONDARY.main,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Animatable.View
        easing="ease-in-out-circ"
        animation="zoomIn"
        duration={1000}
        iterationCount="infinite"
        direction="alternate-reverse"
        style={{
          borderColor: SECONDARY.lighter,
          borderWidth: 1,
          borderRadius: 100,
          padding: 2,
        }}>
        <View
          style={{
            borderColor: SECONDARY.lighter,
            borderWidth: 2,
            borderRadius: 100,
            padding: 2,
          }}>
          <Image
            source={require('../../assets/images/logo/logo_transperent.png')}
            resizeMode="contain"
            style={{width: 120, height: 120, borderRadius: 120}}
          />
        </View>
      </Animatable.View>
    </View>
  );
}
