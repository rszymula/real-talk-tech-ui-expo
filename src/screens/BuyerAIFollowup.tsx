import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ButtonType, Button  } from '../core/Button';
import { Card } from '../core/Card';
import { InputBar } from '../core/InputBar';
import { BUYERAI_PLACEHOLDER, RouteNames } from '../constants';
import { colors } from '../context/themes';
//import { getMainQuestions, getOtherQuestions, getFollowups } from '../services/BuyerIAService';
import { store } from '../store/basicStore';

export function BuyerAIFollowup(props) {

  const { navigation, route } = props;
  const { getFollowups } = store;

  const handleTalkToChat = (input) => {
    navigation.navigate(RouteNames.BUYER_AI_MESSENGER, {question: route?.params?.question, input})
  }

  const handleSelect = (followup) => {
    navigation.navigate(RouteNames.BUYER_AI_MESSENGER, {question: route?.params?.question, followup})
  }

  const followups = getFollowups(route?.params?.question?.id)

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.title}>
        Buyer AI
      </Text>
      <Text style={{color: colors.textLowlight, margin: 8,}}>
        Simplyfying Software Selection with Smarter Solutions
      </Text>
      <Card styles={{marginBottom: 32, padding: 16, marginTop: 8}}>
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
          style={{marginTop: 16, width: 512}}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.textHighlight,
    marginTop: 32,
    fontSize: 18,
  }
});
