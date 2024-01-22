import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { ButtonType, Button } from '../core/Button';
import { BUYERAI_PLACEHOLDER, defaultTab } from '../constants';
import { colors } from '../context/themes';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png';

const steps = {
  "Industry": {
    next: "Do",
    description: "What industry are you in?",
  },
  "Do": {
    next: "Software",
    description: "What do you do?",
  },
  "Software": {
    next: null,
    description: "What type of software do you want to learn about and/or discuss?",
  },
}


export function ProfileQuestion({route, navigation}) {

  const [item, setItem] = React.useState('')

  const {step} = route.params;
  const next = steps[step].next

  const handleNextPress = () => {
    console.log(next)
    if(!next){
      navigation.navigate(defaultTab)
    }else{
      navigation.navigate('ProfileQuestion', {...route.params, step: next, [step]: item})
    }
    
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', margin: 32}}>
      <Image source={REALTALKTECH_WHITE} style={{width: 256, height: 32}}/>
        <Text style={styles.title}>
            {steps[step].description}
          </Text>
          <Text style={{color: colors.textLowlight, margin: 8,}}>
            spmething something something
          </Text>
            <TextInput 
              onChangeText={setItem}
              value={item}
              placeholder={"Choose Option"}
              style={styles.input}
            />
          <Button title={!!next ? "Next Step" : "Finish"} onPress={handleNextPress} styles={{marginTop: 8}}/>
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