import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { colors } from '../../context/themes';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png'; //'../../assets/titleWhite.png';
import { RouteNames } from '../../constants/constants';
import { Link } from '../../components/core/Link';
import { RTextInput } from '../../components/core/RTextInput';
import { connect } from '../../state/reduxStore';
import { login } from '../../services/UserServices';
import { fetchOnboarding } from '../../services/UserServices';

function RawProfileLogin({navigation, login}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleResetPasswordPress = () => {
    navigation.navigate(RouteNames.PROFILE_CREATE_HOME, {email, password})
  }

  const handleLoginPress = () => {
    // TODO do a bunch of user account validation authentication authorization stuff
    login(email, password)
    navigation.navigate(RouteNames.DISCUSS_HOME)
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', margin: 32}}>
      <Image source={REALTALKTECH_WHITE} style={{width: 256, height: 32}}/>
        <Text style={styles.title}>
            Welcome!
          </Text>
          <Text style={{color: colors.textLowlight, margin: 8}}>
            Login to join the conversation!
          </Text>
            <RTextInput 
              onChangeText={setEmail}
              value={email}
              placeholder={"Enter your email"}
              style={styles.input}
            />
            <RTextInput 
              onChangeText={setPassword}
              value={password}
              placeholder={"Enter your password"}
              style={styles.input}
            />
          <Button title="Login" onPress={handleLoginPress} styles={{marginTop: 8}}/>
          <Link style={{margin: 16}} textLeft="Forgot your password?" textLink="Reset Password" onPress={handleResetPasswordPress} />
      </View>
    </View>
  )
}

const stp = (state) => ({

})
const dtp = (dispatch) => ({
  login: login(dispatch),
})
export const ProfileLogin = connect(stp, dtp)(RawProfileLogin)

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
  },
  container: {
    backgroundColor: colors.background,
    height: "100%",
  },
  title: {
    color: colors.textHighlight,
    marginTop: 32,
    fontSize: 18,
  },
})
