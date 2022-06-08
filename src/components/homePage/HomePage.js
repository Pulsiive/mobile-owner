import React, { useRef, useEffect } from "react";
import {
  View,
  Animated,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';


import Pattern1 from "../../Asset/pattern-1.png";
import Pattern2 from "../../Asset/pattern-2.png";
import Pattern3 from "../../Asset/pattern-3.png";
import Logo from "../../Asset/logo.png";
import Pulsiive from "../../Asset/Pulsiive.png";
import Wording from "../../Asset/Wording.png";
import Start from "../../Asset/Button.png";

function HomePage({ navigation }) {
  const firstOpacity = useRef(
    new Animated.Value(0)
  ).current;
  const secondOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const thirdOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const translation = useRef(
    new Animated.Value(-20)
  ).current;

  const opacityElem = useRef(
    new Animated.Value(0)
  ).current;

  const firstTranslationRight = useRef(
    new Animated.Value(-10)
  ).current;

  const firstOpacityTransition = useRef(
    new Animated.Value(0)
  ).current;

  const secondTranslationRight = useRef(
    new Animated.Value(-10)
  ).current;

  const secondOpacityTransition = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.stagger(500, [
      Animated.spring(firstOpacity, {
        toValue: 1,
        useNativeDriver: true
      }),
      Animated.spring(secondOpacity, {
        toValue: 1,
        useNativeDriver: true
      }),
      Animated.spring(thirdOpacity, {
        toValue: 1,
        useNativeDriver: true
      })
    ]).start();

    Animated.parallel([
      Animated.spring(translation, {
        toValue: 0,
        delay: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(opacityElem, {
        toValue: 1,
        delay: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.parallel([
      Animated.spring(firstTranslationRight, {
        toValue: 0,
        delay: 1800,
        useNativeDriver: true,
      }),

      Animated.spring(firstOpacityTransition, {
        toValue: 1,
        delay: 1800,
        useNativeDriver: true,
      }),

    ]).start();

    Animated.parallel([
      Animated.spring(secondTranslationRight, {
        toValue: 0,
        delay: 2100,
        useNativeDriver: true,
      }),

      Animated.spring(secondOpacityTransition, {
        toValue: 1,
        delay: 2100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
      <Animated.Image style={[styles.pattern1, { opacity: firstOpacity }]} source={Pattern1} />
      <Animated.Image style={[styles.pattern2, { opacity: secondOpacity }]} source={Pattern2} />
      <Animated.Image style={[styles.pattern3, { opacity: thirdOpacity }]} source={Pattern3} />
      <View style={styles.center}>
        <Animated.Image source={Logo} style={[styles.Logo, { opacity: opacityElem, transform: [{ translateY: translation }] }]} />
        <Animated.Image source={Pulsiive} style={[styles.Pulsiive, { opacity: opacityElem, transform: [{ translateY: translation }] }]} />
        <Animated.Image source={Wording} style={[styles.Wording, { opacity: firstOpacityTransition, transform: [{ translateX: firstTranslationRight }] }]} />
        <TouchableHighlight onPress={() => navigation.navigate('Home2')}>
          <Animated.Image source={Start} style={[styles.Start, { opacity: secondOpacityTransition, transform: [{ translateX: secondTranslationRight }] }]} />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pattern1: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    position: 'absolute',
    left: 8.2 + '%',
    top: 8.3 + '%',
  },
  pattern2: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    position: 'absolute',
    left: 87 + '%',
    top: 31 + '%',
  },
  pattern3: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    position: 'absolute',
    left: 37 + '%',
    top: 94 + '%',
  },
  center: {
    width: 318,
    minHeight: 267,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  Logo: {
    width: 52,
    height: 52,
    resizeMode: 'cover',
  },
  Pulsiive: {
    width: 117,
    height: 38,
    resizeMode: 'cover',
    marginTop: 24,
  },
  Wording: {
    width: 318,
    height: 83,
    marginTop: 25,
    resizeMode: 'cover',
  },
  Start: {
    width: 125,
    height: 20,
    marginTop: 25,
    resizeMode: 'cover',
  }
});

export default HomePage;

