import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { BUYERAI_PLACEHOLDER, DEFAULT_TAB, RouteNames } from '../../constants/constants';
import { colors } from '../../context/themes';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png'; // '../../assets/titleWhite.png';
import { RTextInput } from '../../components/core/RTextInput';
import { connect } from '../../state/reduxStore';
import { signup } from '../../services/UserServices';
import { SelectedItems } from '../../components/common/SelectedItems';
import { Error } from '../../components/common/Error';
import { RButton, RButtonText } from '../../components/core/RButton';

enum ProfileStep {
  INDUSTRY = "Industry",
  DO = "Do",
  SOFTWARE = "Software",
}

function getStepDetailsFunc(industry, categories, interests){
  return function(step){
    switch(step){
      case ProfileStep.INDUSTRY:
        return {
          next: ProfileStep.DO,
          description: "Select your industry",
          placeholder: "Select industry",
          selections: industry,
          // field: "industry",
          stepNumber: 1,
        };
      case ProfileStep.DO:
        return {
          next: ProfileStep.SOFTWARE,
          description: "Select your role",
          placeholder: "Select role",
          selections: categories,
          // field: "categories",
          stepNumber: 2,
        };
      case ProfileStep.SOFTWARE:
        return {
          next: null,
          description: "Select your interests",
          placeholder: "Select your interests",
          selections: interests,
          // field: "interests",
          stepNumber: 3,
        };
      default:
        return categories;
    }
  }
}


const bodySignup = {
  fullname: 'mike smith',
  username: 'msmith21',
  email: 'msmitty1@gmail.com',
  password: 'pass123',
  techStack: [],
  currentCompany: "HERE",
  industryInvolvement: [],
  workCategories: [],
  linkedinUrl: "www.linedin.com/mikeyman",
  bio: "a little bit aboutme",
  interestAreas: [],
}

function RawProfileQuestion({route, navigation, industry, categories, interests, signup, auth, signupLoading, signupError}) {

  const [text, setText] = React.useState('')
  const [items, setItems] = React.useState([])
  console.log("ITEMS SATART", items)
  console.log({industry, categories, interests})
  console.log("ROUTEPARAM", route.params)

  // const {step, answers} = route.params;
  // const { email, password, firstName, lastName, username, bio, selectedIndustry, selectedCategories, selectedInterests } = answers
  const { step } = route.params
  const stepDetails = getStepDetailsFunc(industry, categories, interests)(step)
  const {next, description, selections, placeholder, stepNumber} = stepDetails

  // React.useEffect(() => {
  //   console.log({signupLoading, signupError, auth})
  //   if(!signupLoading){
  //     if(!signupError && !!auth.token){
  //       navigation.navigate(RouteNames.DISCUSS_HOME)
  //     }
  //   }
  // }, [signupLoading, auth])

  const handleNextPress = () => {
    console.log(next)
    if(!next){
      const body = {
        fullname: route.params.fullname,
        username: route.params.username,
        email: route.params.email,
        password: route.params.password,
        techStack: route.params.techStack,
        currentCompany: route.params.company,
        industryInvolvement: route.params[ProfileStep.INDUSTRY].map(item => item.name),
        workCategories: route.params[ProfileStep.DO].map(item => item.name),
        linkedinUrl: route.params.linkedIn,
        bio: route.params.bio,
        // interestAreas: route.params[ProfileStep.SOFTWARE],
        interestAreas: items.map(item => item.name),
      }
      console.log("SIGNUPW", body)
      // signup(body)
      // navigation.navigate(DEFAULT_TAB)
      navigation.navigate(RouteNames.PROFILE_LOADING, { body })
    }else{
      console.log("ITEMS SEND", items)
      const stepItems = [...items]
      setItems([])
      navigation.push(RouteNames.PROFILE_QUESTION, {...route.params, step: next, [step]: stepItems})
    }
  }

  // currently when you restart, error state remains, and autimatically causes error screen to show up 
  // const handleRestartPress = () => {
  //   navigation.navigate(RouteNames.PROFILE_WELCOME)
  // }

  const handleOnSelect = (newItem) => {
    if(items.every(item => item.name !== newItem.name)){
      setItems(items => ([...items, newItem]))
    }
  }

  const handleRemoveItem = (deleteItem) => {
    setItems(items => items.filter(item => item.name !== deleteItem))
  }

  // if(signupLoading){
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator />
  //     </View>
  //   )
  // }

  // if(signupError){
  //   return (
  //     <View style={styles.container}>
  //       {/* <Error handleRestartPress={handleRestartPress} handleRetryPress={handleNextPress}/> */}
  //       <Error handleRetryPress={handleNextPress}/>
  //     </View>
  //   )
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {description}
      </Text>
      <Text style={{color: colors.textRegular, margin: 8, alignSelf: 'center'}}>
        Choose all that apply
      </Text>
      <RTextInput 
        onChangeText={setText}
        value={text}
        placeholder={placeholder}
        selections={selections}
        onSelect={handleOnSelect}
        style={styles.input}
      />
      <SelectedItems style={{marginTop: 4}} items={items.map(item => item.name)} onDelete={handleRemoveItem}/>
      <RButton active onPress={handleNextPress} style={{marginTop: 8}}>
        <RButtonText active text={!!next ? "Next Step" : "Finish"}/>
      </RButton>
      <Text style={{marginTop: 256, color: colors.textRegular, alignSelf: 'center'}}>{`Question ${stepNumber} of ${Object.keys(ProfileStep).length}`}</Text>
    </View>
  )
}

const stp = (state) => ({
  industry: state.industry,
  categories: state.categories,
  interests: state.interests,
  signupLoading: state.signupLoading,
  signupError: state.signupError,
  auth: state.auth,
});
const dtp = (dispatch) => ({
  signup: signup(dispatch),
});
export const ProfileQuestion = connect(stp, dtp)(RawProfileQuestion);

const styles = StyleSheet.create({
  container: {
    margin: 32,
    // marginLeft: 192,
    // marginRight: 192,
    // maxWidth: 768,
    width: 512,
    alignSelf: 'center',
  },
  input: {
    marginTop: 8,
    widthX: 512,
    position: 'relative',
    zIndex: 100,
  },
  title: {
    color: colors.textHighlight,
    marginTop: 32,
    fontSize: 18,
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
})
