import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ButtonType, Button } from '../../core/Button';
import { Card } from '../../core/Card';
import { InputBar } from '../../core/InputBar';
import { BUYERAI_PLACEHOLDER, RouteNames } from '../../constants';
import { colors } from '../../context/themes';
// import { getMainQuestions, getOtherQuestions } from '../services/BuyerIAService';
// import { getCompanies } from '../services/DiscoverService';
import { store } from '../../store/basicStore';


export function BuyerAIHome(props) {

  const { navigation } = props;

  const { getCompanies, getMainQuestions, getOtherQuestions } = store;
  const companies = getCompanies()

  const handleTalkToChat = (input) => {
    navigation.navigate(RouteNames.BUYER_AI_MESSENGER, {input})
  }

  const handleSelect = (question) => {
    navigation.navigate(RouteNames.BUYER_AI_FOLLOWUP, {question})
  }

  const main = getMainQuestions();
  const other = getOtherQuestions();

  return (
    <View style={{width: 512}}>
      <View>
        <Text style={[styles.title, {alignSelf: 'center'}]}>
          Buyer AI
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8, alignSelf: 'center'}}>
          Simplyfying Software Selection with Smarter Solutions
        </Text>
        <Card>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {
              main.map((question, idx) => {
                return (
                  <>
                    {idx !== 0 && <View style={{width: 8}}></View>}
                    <Card styles={{backgroundColor: colors.input, flexShrink: 1, padding: 8}}>
                      <View style={{width: 64, height: 64, borderWidth: 1, borderColor: colors.textLowlight, alignSelf: 'center'}}></View>
                      <Text style={{color: colors.textRegular, marginTop: 8}}>{question.title}</Text>
                      <Text style={{color: colors.textLowlight, marginTop: 4}}>{question.description}</Text>
                      <Button title="Select" onPress={() => handleSelect(question)} type={ButtonType.BASIC} styles={{marginTop: 8, backgroundColor: colors.foreground }}/>
                    </Card>
                  </>
                )
              })
            }
          </View>
          <View style={{}}>
            {
              other.map(question => {
                return (
                  <Card styles={{marginTop: 8, backgroundColor: colors.input, flexDirection: 'row', justifyContent: 'space-between', padding: 8}}>
                    <View>
                      <Text style={{color: colors.textRegular}}>{question.title}</Text>
                      <Text style={{color: colors.textLowlight, marginTop: 4}}>{question.description}</Text>
                    </View>
                    <Button title="Select" onPress={() => handleSelect(question)} type={ButtonType.BASIC} styles={{marginTop: 8, backgroundColor: colors.foreground }}/>
                  </Card>
                )
              })
            }
          </View>
          <InputBar
            style={{marginTop: 8}}
            onPress={handleTalkToChat}
            title={"^"}
            placeholder={BUYERAI_PLACEHOLDER}
          />
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.textHighlight,
    fontSize: 18,
    // fontWeight: 'bold',
  }
});
