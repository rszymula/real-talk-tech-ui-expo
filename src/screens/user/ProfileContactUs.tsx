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

export function ProfileContactUs(props){

  const {navigation, Component} = props;

  // return (
  //   <View style={{flexDirection: 'column'}}>
  //   </View>
  // )

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")

  const handleSubmitPress = () => {
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RealTalk - Your Advantage in the Tech World</Text>
      <Text style={{color: colors.textLowlight, fontSize: 14, marginTop: 8}}>
        Submit a message and get in touch with our team
      </Text>
      {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: colors.textLowlight, fontSize: 14, marginTop: 8}}>
          Your Profile
        </Text>
      </View> */}
      <View style={{width: 512, marginTop: 16}}>
        <View style={{marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', width: 512, flexWrap: 'wrap'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', width: 240, marginRightX: 8, marginTop: 8}}>
            {/* <View style={{borderTopStartRadius: 32, borderTopEndRadius: 32, borderBottomStartRadius: 32, borderBottomEndRadius: 32, width: 32, height: 24, backgroundColor: colors.link}}></View> */}
            {/* <LinearGradient colors={[colors.gradientBlue, colors.gradientPurple]}> */}
              <View style={{justifyContent: 'space-around', alignItems: 'center', transformX:[{scaleX: 1.25}], borderRadius: 28, width: 28, height: 28, backgroundColor: colors.gradientBlue}}>
                <Image source={QUESTION} style={{width: 14, height: 12}}/>
              </View>
            {/* </LinearGradient> */}
            {/* <View style={{flex: 1}}></View> */}
            <Text style={{color: colors.textHighlight, fontSize: 12, marginLeft: 8}}>Reach out for help or assistance</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', width: 240, marginRightX: 8, marginTop: 8}}>
            <View style={{justifyContent: 'space-around', alignItems: 'center', borderRadius: 28, width: 28, height: 28, backgroundColor: colors.gradientPurple}}>
              <Image source={QUOTE} style={{width: 14, height: 12}}/>
            </View>
            <Image source={QUOTE} />
            {/* <View style={{flex: 1}}></View> */}
            <Text style={{color: colors.textHighlight, fontSize: 12, marginLeft: 8}}>Provide Product feedback</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', width: 240, marginRightX: 8, marginTop: 8}}>
            <View style={{justifyContent: 'space-around', alignItems: 'center', borderRadius: 28, width: 28, height: 28, backgroundColor: colors.gradientBlue}}>
              <Image source={QUESTION_CHECK} style={{width: 16, height: 12}}/>
            </View>
            {/* <View style={{flex: 1}}></View> */}
            <Text style={{color: colors.textHighlight, fontSize: 12, marginLeft: 8}}>Submit a question</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', width: 240, marginRightX: 8, marginTop: 8}}>
            <View style={{justifyContent: 'space-around', alignItems: 'center', borderRadius: 28, width: 28, height: 28, backgroundColor: colors.gradientPurple}}>
              <Image source={QUIP} style={{width: 14, height: 12}}/>
            </View>
            {/* <View style={{flex: 1}}></View> */}
            <Text style={{color: colors.textHighlight, fontSize: 12, marginLeft: 8}}>Inquire about services</Text>
          </View>
        </View>
      </View>
      {/* <Separator style={{marginTop: 16}} /> */}
      <RTextInput 
        // label={"Name"}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder={"Enter name"}
        style={{marginTop: 16, width: 512}}
      />
      <RTextInput 
        // label={"Email"}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={"Enter email"}
        style={{marginTop: 16, width: 512}}
      />
      <RTextInput 
        // label={"Message"}
        value={message}
        onChangeText={(text) => setMessage(text)}
        placeholder={"Enter message"}
        numberOfLines={12}
        style={{marginTop: 16, width: 512}}
      />
      <Button styles={{marginTop: 16, width: 512, justifyContent: 'center'}} title={"Submit your message"} onPress={handleSubmitPress}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 512,
    alignItems: 'center',
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
    color: colors.textLowlight,
    fontSize: 12,
  },
  techItem: {
    // borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.foreground,
    color: colors.textLowlight,
    margin: 4,
    padding: 4,
  }
});
