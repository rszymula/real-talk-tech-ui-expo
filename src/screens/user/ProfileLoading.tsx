import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { colors } from '../../context/themes';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png'; //'../../assets/titleWhite.png';
import LOGO_V2 from '../../assets/logo_v2.png';
import { RouteNames } from '../../constants/constants';
import { Link } from '../../components/core/Link';
import { RTextInput } from '../../components/core/RTextInput';
import { connect } from '../../state/reduxStore';
import { login } from '../../services/UserServices';
import { fetchOnboarding } from '../../services/UserServices';
import { Heading } from '../../components/common/Heading';
import { RButton } from '../../components/core/RButton';
import { signup } from '../../services/UserServices';

function RawProfileLoading(props) {

  const {route, navigation, signup, signupLoading, signupError, auth} = props;
  console.log("LD3-wtf", signupLoading)

  const [animate, setAnimate] = React.useState(true);

  const body = route?.params?.body;
  console.log("LD4-update", {animate, signupLoading, signupError, auth, body})

  React.useEffect(() => {
    signup(body)
    setTimeout(() => {
      setAnimate(false)
    }, 5000)
  }, [])

  React.useEffect(() => {
    console.log("LD4-2", {signupLoading, signupError, auth})
    if(!signupLoading && !animate){
      if(!signupError && !!auth.token){
        console.log("LD4-3", {signupLoading, signupError, auth})
        navigation.navigate(RouteNames.DISCUSS_HOME)
      }
    }
  }, [signupLoading, auth, animate])

  const handleRestartPress = () => {
    navigation.navigate(RouteNames.PROFILE_WELCOME)
  }

  const handleRetryPress = () => {

  }

  // if(signupLoading){
  if(signupLoading || animate){
    console.log("LD4-anim")
    return <ActivityIndicator />
  }

  if(signupError || !auth.token){
    console.log("LD4-err")
    return (
      <View style={{alignItems: 'center'}}>
        <Text>{"Oops, we experienced an error on our end"}</Text>
        <RButton onPress={handleRetryPress} active style={{marginTop: 8}}>
          <Text>{"Click here to Retry"}</Text>
        </RButton>
        <RButton onPress={handleRestartPress} active style={{marginTop: 8}}>
          <Text>{"Click here to start over again"}</Text>
        </RButton>
      </View>
    )
  }

  return (
    <View style={styles.container}>
    </View>
  )
}

const stp = (state) => ({
  auth: state.auth,
  signupLoading: state.signupLoading,
  signupError: state.signupError,
})
const dtp = (dispatch) => ({
  signup: signup(dispatch),
})
export const ProfileLoading = connect(stp, dtp)(RawProfileLoading)

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.background,
    marginTop: 32,
    marginLeft: 256,
    marginRight: 256,
    maxWidth: 512,
  },
  input: {
    widthX: 512,
    marginTop: 8,
  },
  title: {
    color: colors.textHighlight,
    marginTop: 32,
    fontSize: 18,
    alignSelf: 'center',
  },
})
