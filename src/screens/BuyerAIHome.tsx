import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ButtonType, Button } from '../common/Button';
import { Card } from '../common/Card';
import { InputBar } from '../common/InputBar';
import { BUYERAI_PLACEHOLDER } from '../constants';
import { colors } from '../context/themes';
import { getMainQuestions, getOtherQuestions } from '../services/BuyerIAService';
import { getCompanies } from '../services/DiscoverService';
import { BuyerAIRouteNames } from './buyerai';
import { BuyerAIMessenger } from './BuyerAIMessenger';


export function BuyerAIHome(props) {

  const companies = getCompanies()

  const { navigation } = props;

  const handleTalkToChat = (input) => {
    navigation.navigate("BuyerAIMessenger", {input})
  }

  const handleSelect = (question) => {
    navigation.navigate("BuyerAIFollowup", {question})
  }

  const main = getMainQuestions();
  const other = getOtherQuestions();

  return (
    <View style={styles.container}>
      {/* <View style={{width: 500, alignItems: 'center'}}> */}
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>
          Buyer AI
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8,}}>
          Simplyfying Software Selection with Smarter Solutions
        </Text>
        <Card styles={{marginBottom: 32, padding: 16}}>
          <Text style={{color: colors.textHighlight, alignSelf: 'center'}}>
            Where are you in your buying journey?
          </Text>
          <View style={{marginTop: 16, maxWidth: 512}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              {
                main.map(question => {
                  return (
                    <Card styles={{padding: 16, margin: 4, backgroundColor: colors.input, maxWidth: 256}}>
                      <View style={{width: 64, height: 64, borderWidth: 1, borderColor: colors.textLowlight, alignSelf: 'center'}}></View>
                      <Text style={{alignSelf: 'center', color: colors.textRegular, marginTop: 8}}>{question.title}</Text>
                      <Text style={{alignSelf: 'center', color: colors.textLowlight, marginTop: 4}}>{question.description}</Text>
                      <Button title="Select" onPress={() => handleSelect(question)} type={ButtonType.BASIC} styles={{color: colors.textRegular, marginTop: 8, backgroundColor: colors.foreground }}/>
                    </Card>
                  )
                })
              }
            </View>
          </View>
          <View style={{}}>
            {
              other.map(question => {
                return (
                  <Card styles={{marginTop: 8, backgroundColor: colors.input, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                      <Text style={{color: colors.textRegular}}>{question.title}</Text>
                      <Text style={{color: colors.textLowlight, marginTop: 4}}>{question.description}</Text>
                    </View>
                    <Button title="Select" onPress={() => handleSelect(question)} type={ButtonType.BASIC} styles={{color: colors.textRegular, marginTop: 8, backgroundColor: colors.foreground }}/>
                  </Card>
                )
              })
            }
          </View>
          <InputBar
            onPress={handleTalkToChat}
            title={"^"}
            placeholder={BUYERAI_PLACEHOLDER}
            style={{margin: 8}}
          />
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'row',
    height: "100%",
  },
  title: {
    color: colors.textHighlight,
    marginTop: 32,
    fontSize: 18,
    // fontWeight: 'bold',
  }
});
