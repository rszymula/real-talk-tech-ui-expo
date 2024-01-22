import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { ButtonType, Button } from '../core/Button';
import { colors } from '../context/themes';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png';
import { RouteNames } from '../constants';

export function ProfileCreateHome({navigation}) {

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [bio, setBio] = React.useState('');

  const handleNextPress = () => {
    navigation.navigate(RouteNames.PROFILE_QUESTION, {firstName, lastName, username, bio, step: "Industry"})
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', margin: 32}}>
      <Image source={REALTALKTECH_WHITE} style={{width: 256, height: 32}}/>
        <Text style={styles.title}>
            Setup your profile
          </Text>
          <Text style={{color: colors.textLowlight, margin: 8}}>
            spmething something something
          </Text>
            <TextInput 
              onChangeText={setFirstName}
              value={firstName}
              placeholder={"Enter your first name"}
              style={styles.input}
            />
            <TextInput 
              onChangeText={setLastName}
              value={lastName}
              placeholder={"Enter your last name"}
              style={styles.input}
            />
            <TextInput 
              onChangeText={setUsername}
              value={username}
              placeholder={"Create your username"}
              style={styles.input}
            />
            <TextInput 
              onChangeText={setBio}
              value={bio}
              placeholder={"Enter bio description"}
              style={styles.input}
            />
          <Button title="Next Step" onPress={handleNextPress} styles={{marginTop: 8}}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    margin: 8,
    color: colors.textRegular,
    fontSize: 12,
    width: 256,
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