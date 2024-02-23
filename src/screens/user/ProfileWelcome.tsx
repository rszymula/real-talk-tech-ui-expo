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
import { testAwsS3, testAwsS3V2 } from '../../utils/aws';
import Svg, {
  Use,
  Image as SvgImage,
  SvgXml,
} from 'react-native-svg';

const PASSWORD_MIN_LENGTH = 6;

const svg = "<svg width=\"41\" height=\"41\" viewBox=\"0 0 41 41\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle opacity=\"0.5\" cx=\"20.5\" cy=\"20.2656\" r=\"20\" fill=\"url(#paint0_linear_1722_13558)\"/><path d=\"M16.5753 16.473C16.0234 16.473 15.5635 16.1971 15.2876 15.7371C15.0116 15.3079 15.0116 14.7253 15.2876 14.2654C15.5635 13.8362 16.0234 13.5296 16.5753 13.5296C17.0966 13.5296 17.5565 13.8362 17.8324 14.2654C18.1084 14.7253 18.1084 15.3079 17.8324 15.7371C17.5565 16.1971 17.0966 16.473 16.5753 16.473ZM16.33 28.2468C16.33 28.7987 15.8701 29.2279 15.3489 29.2279C14.797 29.2279 14.3677 28.7987 14.3677 28.2468V21.4094L13.4786 22.8811C13.2026 23.341 12.5894 23.4943 12.1295 23.2184C11.6696 22.9424 11.5163 22.3292 11.7922 21.8693L13.5706 18.8952C14.1225 18.006 15.0729 17.4541 16.1154 17.4541H18.139H20.4999V15.0013C20.4999 14.2041 21.1438 13.5296 21.9716 13.5296H28.8397C29.6369 13.5296 30.3114 14.2041 30.3114 15.0013V21.8693C30.3114 22.6972 29.6369 23.341 28.8397 23.341H21.9716C21.1438 23.341 20.4999 22.6972 20.4999 21.8693V20.3976H22.4622V21.3787H28.3491V15.4919H22.4622V17.4541H22.9528C23.474 17.4541 23.9339 17.9141 23.9339 18.4353C23.9339 18.9872 23.474 19.4164 22.9528 19.4164H22.4622H20.4999H18.7829V28.2468C18.7829 28.7987 18.323 29.2279 17.8018 29.2279C17.2499 29.2279 16.8206 28.7987 16.8206 28.2468V24.3222H16.33V28.2468Z\" fill=\"white\"/><defs><linearGradient id=\"paint0_linear_1722_13558\" x1=\"0.5\" y1=\"20.2656\" x2=\"40.5\" y2=\"20.2656\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#4568DC\"/><stop offset=\"1\" stop-color=\"#B06AB3\"/></linearGradient></defs></svg>"

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

  testAwsS3V2();

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
      {/* <Svg width="80" height="80">
        <SvgXml xml={""}/>
      </Svg> */}
      <Text style={{color: colors.textLowlight, margin: 8, alignSelf: 'center'}}>
        Discover. Discuss. Decide.
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
        secureTextEntry
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
