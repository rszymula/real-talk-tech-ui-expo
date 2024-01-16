import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getCompanies } from '../../services/DiscoverService';
import { Card } from '../../common/Card';
import { colors } from '../../context/themes';
import { BUYERAI_PLACEHOLDER, INPUT_PLACEHOLDER } from '../../constants';
import { InputBar } from '../../common/InputBar';
import { getFollowups, getMainQuestions, getOtherQuestions } from '../../services/BuyerIAService';
import { Button, ButtonType } from '../../common/Button';

export function BuyerAIChat(props) {

  const { navigation, route } = props;

  const {question, followup, input} = route.params;

  const quest = !!question ? `You have chosen main question ${question.title}.` : 'You have not chosen any questions';
  const follow = !!followup ? ` And followup question ${followup.title}.` : ' And no follow up questions';
  const initialReponse = `Welcome to chat. ${quest}${follow}`;

  const INIT = [
    {id: 0, userAuthor: false, content: initialReponse},
    ...!!input ? [{id: 1, userAuthor: true, content: input}] : [],
  ];

  const [messages, setMessages] = React.useState(INIT)

  React.useEffect(() => {
    if (!!input) {
      fireAIEvent();
    }
  }, [])

  const fireAIEvent = () => setTimeout(() => {
    const id2 = messages[messages.length - 1].id + 1;
    setMessages(messages => [...messages, {id: id2, userAuthor: false, content: "random AI stuffkdjshfklsdjhflksdjflksdhakjsnfkjaskjfhsn"}])
  }, 2000);

  const handleTalkToChat = (input) => {
    const id = messages[messages.length - 1].id + 1;
    setMessages([...messages, {id, userAuthor: true, content: input}])
    fireAIEvent();
  }

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
          {
            messages.map(message => {
              // const styled = message.userAuthor ? {
              //   maxWidth: 256,
              //   color: colors.textHighlight,
              //   backgroundColor: colors.link,
              //   fontSize: 12,
              //   padding: 8,
              //   marginTop: 16,
              //   borderRadius: 4
              // }: {alignSelf: 'flex-end', maxWidth: 256, color: colors.textHighlight, backgroundColor: colors.foreground, fontSize: 12, padding: 8, marginTop: 16, borderRadius: 4, borderColor: colors.border}
              const styled = {
                maxWidth: 256,
                color: colors.textHighlight,
                backgroundColor: colors.link,
                fontSize: 12,
                padding: 8,
                marginTop: 16,
                borderRadius: 4
              };
              return (
                <>
                  <Text style={[styled, message.userAuthor ? {alignSelf: 'flex-end', backgroundColor: colors.foreground, borderWidth: 1, borderColor: colors.link} : {}]}>
                    {message.content}
                  </Text>
                </>
              )
            })
          }
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