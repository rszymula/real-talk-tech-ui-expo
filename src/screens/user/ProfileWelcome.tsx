import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { colors } from '../../context/themes';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png'; // '../../assets/titleWhite.png';
import { RouteNames } from '../../constants/constants';
import { Link } from '../../components/core/Link';
import { RTextInput } from '../../components/core/RTextInput';
import { fetchOnboarding } from '../../services/UserServices';
import { connect } from '../../state/reduxStore';

export function RawProfileWelcome({navigation, fetchOnboarding}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleNextPress = () => {
    navigation.navigate(RouteNames.PROFILE_CREATE_HOME, {email, password})
  }

  const handleLoginPress = () => {
    navigation.navigate(RouteNames.PROFILE_LOGIN)
  }

  React.useEffect(() => {
    fetchOnboarding()
  }, [])

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', margin: 32}}>
      <Image source={REALTALKTECH_WHITE} style={{width: 256, height: 32}}/>
        <Text style={styles.title}>
            Welcome!
          </Text>
          <Text style={{color: colors.textLowlight, margin: 8}}>
            Let's Customize Your Experience
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
          <Button title="Create Account" onPress={handleNextPress} styles={{marginTop: 8}}/>
          <Link style={{margin: 16}} textLeft="Already have an account?" textLink="Sign in" onPress={handleLoginPress} />
      </View>
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
