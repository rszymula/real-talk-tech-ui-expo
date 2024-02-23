import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { BUYERAI_PLACEHOLDER, DEFAULT_TAB, RouteNames } from '../../constants/constants';
import { colors } from '../../context/themes';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png'; // '../../assets/titleWhite.png';
import { RTextInput } from '../../components/core/RTextInput';
import { connect } from '../../state/reduxStore';
import { signup } from '../../services/UserServices';
import { SelectedItems } from '../../components/common/SelectedItems';

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

function RawProfileQuestion({route, navigation, industry, categories, interests, signup}) {

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
        industryInvolvement: route.params[ProfileStep.INDUSTRY].map(item => item.industry_name),
        workCategories: route.params[ProfileStep.DO].map(item => item.category_name),
        linkedinUrl: route.params.linkedIn,
        bio: route.params.bio,
        // interestAreas: route.params[ProfileStep.SOFTWARE],
        interestAreas: items.map(item => item.interest_area_name),
      }
      console.log("SIGNUPW", body)
      signup(body)
      navigation.navigate(DEFAULT_TAB)
    }else{
      console.log("ITEMS SEND", items)
      const stepItems = [...items]
      setItems([])
      navigation.navigate(RouteNames.PROFILE_QUESTION, {...route.params, step: next, [step]: stepItems})
    }
  }

  const handleOnSelect = (newItem) => {
    if(items.every(item => item.name !== newItem.name)){
      setItems(items => ([...items, newItem]))
    }
  }

  const handleRemoveItem = (deleteItem) => {
    setItems(items => items.filter(item => item.name !== deleteItem))
  }

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
      <Button title={!!next ? "Next Step" : "Finish"} onPress={handleNextPress} styles={{marginTop: 8, widthX: 512, justifyContent: 'space-around'}}/>
      <Text style={{marginTop: 256, color: colors.textRegular, alignSelf: 'center'}}>{`Question ${stepNumber} of ${Object.keys(ProfileStep).length}`}</Text>
    </View>
  )
}

const stp = (state) => ({
  industry: state.industry,
  categories: state.categories,
  interests: state.interests,
});
const dtp = (dispatch) => ({
  signup: signup(dispatch),
});
export const ProfileQuestion = connect(stp, dtp)(RawProfileQuestion);

const styles = StyleSheet.create({
  container: {
    margin: 32,
    marginLeft: 192,
    marginRight: 192,
    maxWidth: 768,
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