import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { ButtonType, Button } from '../core/Button';
import { Card } from '../core/Card';
import { InputBar } from '../core/InputBar';
import { BUYERAI_PLACEHOLDER } from '../constants';
import { colors } from '../context/themes';
import { getMainQuestions, getOtherQuestions } from '../services/BuyerIAService';
import { getCompanies } from '../services/DiscoverService';
import { BuyerAIRouteNames } from './buyerai';
import { BuyerAIMessenger } from './BuyerAIMessenger';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png';

export function ProfileCreateHome({navigation}) {

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [bio, setBio] = React.useState('');

  const handleNextPress = () => {
    navigation.navigate("ProfileQuestion", {firstName, lastName, username, bio, step: "Industry"})
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', margin: 32}}>
      <Image source={REALTALKTECH_WHITE} style={{width: 256, height: 32}}/>
        <Text style={styles.title}>
            Setup your profile
          </Text>
          <Text style={{color: colors.textLowlight, margin: 8,}}>
            spmething something something
          </Text>
          {/* <InputBar onPress={undefined} placeholder={"Enter your first name"} title={undefined} />
          <InputBar onPress={undefined} placeholder={"Enter your last name (optional)"} title={undefined}/>
          <InputBar onPress={undefined} placeholder={"Create your username"} title={undefined} />
          <InputBar onPress={undefined} placeholder={"Enter bio description"} title={undefined} numLines={3}/>
           */}
           {/* <View style={styles.inputContainer}> */}
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
            {/* <Text>fuuuck</Text>
          </View> */}
          <Button title="Next Step" onPress={handleNextPress} styles={{marginTop: 8}}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // inputContainer: {
  //   borderColor: 'red',
  //   borderWidth: 1,
  // },
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