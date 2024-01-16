import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getCompanies } from '../../services/DiscoverService';
import { Card } from '../../core/Card';
import { colors } from '../../context/themes';
import { BUYERAI_PLACEHOLDER, INPUT_PLACEHOLDER } from '../../constants';
import { InputBar } from '../../core/InputBar';
import { getFollowups, getMainQuestions, getOtherQuestions } from '../../services/BuyerIAService';
import { Button, ButtonType } from '../../core/Button';
import { BuyerAIRouteNames } from '.';

export function BuyerAIStage1(props) {

  const { navigation, route } = props;

  const handleTalkToChat = (input) => {
    navigation.navigate(BuyerAIRouteNames.CHAT, {question: route?.params?.question, input})
  }

  const handleSelect = (followup) => {
    console.log(`selected ${followup}`)
    console.log(followup)
    navigation.navigate(BuyerAIRouteNames.CHAT, {question: route?.params?.question, followup})
  }

  const main = getMainQuestions();
  const other = getOtherQuestions();

  const followups = getFollowups(route?.params?.question?.id)

  // console.log("MNB", route?.params)

  return (
    <View style={styles.container}>
      <View style={{width: "30%"}}></View>
      {/* <View style={{width: 500, alignItems: 'center'}}> */}
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>
          Buyer AI
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8,}}>
          Simplyfying Software Selection with Smarter Solutions
        </Text>
        <Card styles={{marginBottom: 32, padding: 16, marginTop: 8}}>
          <Text style={{color: colors.textHighlight, alignSelf: 'center'}}>
            You are now chatting with BuyerjourneyAI
          </Text>
          <Text style={{maxWidth: 256, color: colors.textHighlight, backgroundColor: colors.link,fontSize: 12, padding: 8, marginTop: 16, borderRadius: 4}}>
            {`You have chosen ${route.params.question.title}`}
          </Text>
          <View style={{marginTop: 16, maxWidth: 512}}>
              {
                followups.map(question => {
                  return (
                    <Card styles={{margin: 4, paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16, backgroundColor: colors.input, flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={{alignSelf: 'center', color: colors.textRegular }}>{question.title}</Text>
                      <Button title="Select" onPress={() => handleSelect(question)} type={ButtonType.BASIC} styles={{color: colors.textRegular, backgroundColor: colors.foreground }}/>
                    </Card>
                  )
                })
              }
          </View>
          
          <InputBar
            onPress={handleTalkToChat}
            title={"^"}
            placeholder={BUYERAI_PLACEHOLDER}
            style={{marginTop: 16, width: 500}}
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