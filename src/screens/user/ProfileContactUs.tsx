import React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { RouteNames, tabs } from '../../constants/constants';
import { Link } from '../core/Link';
import { RTextInput } from '../../components/core/RTextInput';
import { colors } from '../../context/themes';
import { Button } from '../../components/core/Button';
import QUESTION from '../../assets/question.png';
import QUOTE from '../../assets/quote.png';
import QUESTION_CHECK from '../../assets/question_check.png';
import QUIP from '../../assets/quip.png';
import { Separator } from '../../components/core/Separator';
import LinearGradient from 'react-native-linear-gradient';
import { GridView } from '../../components/common/GridView';
import { Heading } from '../../components/common/Heading';
import { RButton, RButtonText } from '../../components/core/RButton';

const callouts = [
  {
    text: "Reach out for help or assistance",
    icon: QUOTE,
  },
  {
    text: "Provide Product feedback",
    icon: QUESTION,
  },
  {
    text: "Submit a question",
    icon: QUESTION_CHECK,
  },
  {
    text: "Inquire about services",
    icon: QUIP,
  },
];

export function ProfileContactUs(props){

  const {navigation, Component} = props;

  // return (
  //   <View style={{flexDirection: 'column'}}>
  //   </View>
  // )

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")

  const [isValidated, setIsValidated] = React.useState(false);

  const isValidName = () => {
    return !!name
  }

  const isValidEmail = () => {
    return !!email
      && String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  const isValidMessage = () => {
    return !!message
  }

  const validators = [isValidName, isValidEmail, isValidMessage];

  const handleSubmitPress = () => {
    const isValid = validators.map(validator => validator()).every(item => !!item)
    if(isValid){
      // TODO
    }else{
      setIsValidated(true);
    }
  }

  const isValid = validators.map(validator => validator()).every(item => !!item)

  return (
    <View style={styles.container}>
      <Heading navigation={navigation}>
        <View>
          <Text style={styles.title}>RealTalk - Your Advantage in the Tech World</Text>
          <Text style={{color: colors.textRegular, fontSize: 14, marginTop: 8, alignSelf: 'center'}}>
            Submit a message and get in touch with our team
          </Text>
      </View>
      </Heading>
      <GridView 
        elements={callouts}
        renderElement={(element, idx, navigation) => {
          const background = idx % 2 === 0 ? colors.gradientBlue : colors.gradientPurple;
          return (
            <View style={{flexDirection: 'row', alignItems: 'center', width: 240, marginTop: 8}}>
              <View style={{justifyContent: 'space-around', alignItems: 'center', borderRadius: 28, width: 28, height: 28, backgroundColor: background}}>
                <Image source={element.icon} style={{width: 14, height: 12}}/>
              </View>
              <Text style={{color: colors.textHighlight, fontSize: 12, marginLeft: 8}}>{element.text}</Text>
            </View>
          )
        }}
      />
      <RTextInput 
        // label={"Name"}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder={"Enter name"}
        style={{marginTop: 16, widthX: 512}}
      />
      {!isValidName() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please enter a name"}</Text>}
      <RTextInput 
        // label={"Email"}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={"Enter email"}
        style={{marginTop: 16, widthX: 512}}
      />
      {!isValidEmail() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please enter a vaid email"}</Text>}
      <RTextInput 
        // label={"Message"}
        value={message}
        onChangeText={(text) => setMessage(text)}
        placeholder={"Enter message"}
        numberOfLines={12}
        style={{marginTop: 16, widthX: 512}}
      />
      {!isValidMessage() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please enter a message"}</Text>}
      {/* <Button styles={{marginTop: 16, widthX: 512, justifyContent: 'center'}} title={"Submit your message"} onPress={handleSubmitPress}/> */}
      <RButton active={isValid} onPress={handleSubmitPress} style={{marginTop: 16}}>
        <RButtonText active={isValid} text={"Submit your message"}/>
      </RButton>
      {/* </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    widthX: 512,
    // alignItems: 'center',
    // border
  },
  title: {
    marginTop: 8,
    color: colors.textHighlight,
    fontSize: 20,
    alignSelf: 'center',
  },
  h2: {
    marginTop: 8,
    color: colors.textHighlight,
    fontSize: 16,
  },
  h3: {
    marginTop: 8,
    color: colors.textHighlight,
    fontSize: 14,
  },
  captionText: {
    color: colors.textRegular,
    fontSize: 12,
  },
  techItem: {
    // borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.foreground,
    color: colors.textRegular,
    margin: 4,
    padding: 4,
  }
});
