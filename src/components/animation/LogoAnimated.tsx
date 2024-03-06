import { ActivityIndicator, View, Text, StyleSheet, Animated } from "react-native"
import { RButton, RButtonText } from "../core/RButton"
import { colors } from "../../context/themes"
import { Translate } from "aws-sdk"
import React from "react"

function CyanBubble({styles, spaceScale, timeScale}){
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  const translateYAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const anim = Animated.timing(opacityAnim, {
      toValue: 0.9,
      duration: 2000 * timeScale,
      useNativeDriver: true,
    })
    setTimeout(() => {
      anim.start();
    }, 0 * timeScale)
    anim.start();
  }, [opacityAnim])

  React.useEffect(() => {
    const anim = Animated.timing(translateYAnim, {
      toValue: 96 * spaceScale,
      duration: 3000 * timeScale,
      useNativeDriver: true
    })
    anim.start();
  })

  return (
    <Animated.View
      style={[
        styles.shape,
        {
          backgroundColor: colors.link,
          opacity: opacityAnim,
          zIndex: 3,
        },
        {
          transform: [
            {translateY: translateYAnim},
            ...styles.commonTransform.transform,
          ],
        },
      ]}
    />
  )
}

function BlueBubble({styles, spaceScale, timeScale}){
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  const translateYAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const anim = Animated.timing(opacityAnim, {
      toValue: 0.9,
      duration: 2000 * timeScale,
      useNativeDriver: true,
    });
    setTimeout(() => {
      anim.start();
    }, 0 * timeScale);
  }, [opacityAnim])

  React.useEffect(() => {
    const anim = Animated.timing(translateYAnim, {
      toValue: 48 * spaceScale,
      duration: 2000 * timeScale,
      useNativeDriver: true,
    })
    anim.start();
  }, [translateYAnim])

  return (
    <Animated.View
        style={[
          styles.shape,
          {
            backgroundColor: '#4151a4',
            opacity: opacityAnim,
            zIndex: 2,
          },
          {
            transform: [
              {translateY: translateYAnim},
              ...styles.commonTransform.transform,
            ],
          },
        ]}
      />
  )
}

function MagentaBubble({styles, spaceScale, timeScale}){
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const anim = Animated.timing(opacityAnim, {
      toValue: 1.0,
      duration: 3000 * timeScale,
      useNativeDriver: true,
    })
    anim.start()
  }, [opacityAnim])

  return (
    <Animated.View
      style={[
        styles.shape,
        {
          backgroundColor: '#a66daf',
          opacity: opacityAnim,
          zIndex: 1,
        },
        {
          transform: [
            ...styles.commonTransform.transform,
          ],
        },
      ]}
    />
  )
}

export function LogoAnimated({timeScale = 1, spaceScale = 1}){

  const styles = StyleSheet.create({
    shape: {
      width: 64 * spaceScale,
      height: 64 * spaceScale,
      borderTopLeftRadius: 24 * spaceScale,
      borderTopRightRadius: 4 * spaceScale,
      borderBottomLeftRadius: 4 * spaceScale,
      borderBottomRightRadius: 24 * spaceScale,
    },
    commonTransform: {
      transform: [
        {scaleY: 0.5},
        {rotate: '-45deg'},
      ],
    }
  })

  return (
    <View style={{alignItems: 'center', borderColor: 'red', borderWidth: 1,
      // backgroundColor: 'white'
    }}>
      <CyanBubble styles={styles} timeScale={timeScale} spaceScale={spaceScale}/>
      <BlueBubble styles={styles} timeScale={timeScale} spaceScale={spaceScale}/>
      <MagentaBubble styles={styles} timeScale={timeScale} spaceScale={spaceScale}/>
    </View>
  )
}
