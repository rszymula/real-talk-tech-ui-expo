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

function RawProfileLoading({navigation, login, loginLoading, loginError, auth}) {

  React.useEffect(() => {
    console.log({loginLoading, loginError, auth})
    if(!loginLoading){
      if(!loginError && !!auth.token){
        navigation.navigate(RouteNames.DISCUSS_HOME)
      }
    }
  }, [loginLoading, auth])

  const handleRestartPress = () => {
    navigation.navigate(RouteNames.PROFILE_WELCOME)
  }

  const handleRetryPress = () => {

  }

  if(loginLoading){
    return <ActivityIndicator />
  }

  if(loginError){
    <View style={{alignItems: 'center'}}>
      <Text>{"Oops, we experienced an error on our end"}</Text>
      <RButton onPress={handleRetryPress} active style={{marginTop: 8}}>
        <Text>{"Click here to Retry"}</Text>
      </RButton>
      <RButton onPress={handleRestartPress} active style={{marginTop: 8}}>
        <Text>{"Click here to start over again"}</Text>
      </RButton>
    </View>
  }

  return (
    <View style={styles.container}>
    </View>
  )
}

const stp = (state) => ({
  auth: state.auth,
  loginLoading: state.loginLoading,
  loginError: state.loginError,
})
const dtp = (dispatch) => ({
  login: login(dispatch),
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
