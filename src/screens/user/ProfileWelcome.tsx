import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { colors } from '../../context/themes';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png'; // '../../assets/titleWhite.png';
import LOGO_V2 from '../../assets/logo_v2.png';
import { RouteNames } from '../../constants/constants';
import { Link } from '../../components/core/Link';
import { RTextInput } from '../../components/core/RTextInput';
import { fetchOnboarding } from '../../services/UserServices';
import { connect } from '../../state/reduxStore';

const PASSWORD_MIN_LENGTH = 6;

export function RawProfileWelcome({navigation, fetchOnboarding}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isValidated, setIsValidated] = React.useState(false)

  const isValidEmail = () => {
    return !!email
      && String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  const isValidPassword = () => {
    return !!password
      && password.length >= PASSWORD_MIN_LENGTH
      && password.match(/\d+/g)
      && password.match(/[A-Z]/)
      && password.match(/[a-z]/)
      && password.match(/[0-9]/)
      // /\p{Lu}/u matches if the string contains any uppercase letter and will also support other languages than englis
  }

  const validators = [isValidEmail, isValidPassword];

  const handleNextPress = () => {
    const isValid = validators.map(validator => validator()).every(item => !!item);
    if(isValid){
      navigation.navigate(RouteNames.PROFILE_CREATE_HOME, {email, password})
    }else{
      setIsValidated(true)
    }
  }

  const handleLoginPress = () => {
    navigation.navigate(RouteNames.PROFILE_LOGIN)
  }

  React.useEffect(() => {
    fetchOnboarding()
  }, [])

  return (
    <View style={styles.container}>
      {/* <Image source={REALTALKTECH_WHITE} style={{width: 256, height: 32, alignSelf: 'center'}}/> */}
      <Image source={LOGO_V2} style={{width: 192, height: 42, alignSelf: 'center'}}/>
      <Text style={styles.title}>
        Welcome!
      </Text>
      <Text style={{color: colors.textLowlight, margin: 8, alignSelf: 'center'}}>
        Let's Customize Your Experience
      </Text>
      <RTextInput 
        onChangeText={setEmail}
        value={email}
        placeholder={"Enter your work email"}
        style={styles.input}
      />
      {!isValidEmail() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please enter a valid email"}</Text>}
      <RTextInput 
        onChangeText={setPassword}
        value={password}
        placeholder={"Create a password"}
        style={styles.input}
      />
      {!isValidPassword() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{`Please enter a password which is at least ${PASSWORD_MIN_LENGTH} characters long, has at least one uppercase and one lowercase letter each, and at least one number`}</Text>}
      <Button title="Create Account" onPress={handleNextPress} styles={{marginTop: 8, widthX: 512, justifyContent: 'space-around'}}/>
      <Link style={{margin: 16, alignSelf: 'center'}} textLeft="Already have an account?" textLink="Sign in" onPress={handleLoginPress} />
    </View>
  )
}
const stp = (state) => ({
});
const dtp = (dispatch) => ({
  fetchOnboarding: fetchOnboarding(dispatch),
});
export const ProfileWelcome = connect(stp, dtp)(RawProfileWelcome)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    margin: 32,
    marginLeft: 256,
    marginRight: 256,
    maxWidth: 512,
  },
  input: {
    marginTop: 8,
  },
  title: {
    color: colors.textHighlight,
    marginTop: 32,
    fontSize: 18,
    alignSelf: 'center',
  },
})
