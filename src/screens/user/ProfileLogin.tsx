import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
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

function RawProfileLogin({navigation, login, loginLoading, loginError, auth}) {

  // const [email, setEmail] = React.useState('');
  const [usernameOrEmail, setUsernameOrEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isValidated, setIsValidated] = React.useState(false);

  const isValidUsernameOrEmail = () => {
    return !!usernameOrEmail
  }

  const isValidPassword = () => {
    return !!password;
  }

  const validators = [isValidUsernameOrEmail, isValidPassword];

  const handleResetPasswordPress = () => {
    // navigation.navigate(RouteNames.PROFILE_CREATE_HOME, {username, password})
  }

  const handleLoginPress = () => {
    const isValid = validators.map(validator => validator()).every(item => !!item);
    if(isValid){
      login(usernameOrEmail, password)
    }else{
      setIsValidated(true)
    }
  }

  React.useEffect(() => {
    console.log({loginLoading, loginError, auth})
    if(!loginLoading){
      if(!loginError && !!auth.token){
        navigation.navigate(RouteNames.DISCUSS_HOME)
      }
    }
  }, [loginLoading, auth])

  return (
    <View style={styles.container}>
      {/* <Image source={REALTALKTECH_WHITE} style={{width: 256, height: 32, alignSelf: 'center'}}/> */}
      <Image source={LOGO_V2} style={{width: 192, height: 42, alignSelf: 'center'}}/>
      <Text style={styles.title}>
        Welcome!
      </Text>
      <Text style={{color: colors.textRegular, margin: 8, alignSelf: 'center'}}>
        Login to join the conversation!
      </Text>
        {/* <RTextInput 
          onChangeText={setEmail}
          value={email}
          placeholder={"Enter your email"}
          style={styles.input}
        /> */}
        <RTextInput 
          onChangeText={setUsernameOrEmail}
          value={usernameOrEmail}
          placeholder={"Enter your username or email"}
          style={styles.input}
        />
        {!isValidUsernameOrEmail() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please enter your username or email"}</Text>}
        <RTextInput 
          onChangeText={setPassword}
          value={password}
          placeholder={"Enter your password"}
          secureTextEntry
          style={styles.input}
        />
        {!isValidPassword() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please enter your password"}</Text>}
      <Button title="Login" onPress={handleLoginPress} styles={{marginTop: 8, widthX: 512, justifyContent: 'space-around'}}/>
      <Link style={{margin: 16, alignSelf: 'center'}} textLeft="Forgot your password?" textLink="Reset Password" onPress={handleResetPasswordPress} />
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
export const ProfileLogin = connect(stp, dtp)(RawProfileLogin)

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
