import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { colors } from '../../context/themes';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png'
import { RouteNames } from '../../constants/constants';
import { SelectedItems } from '../../components/common/SelectedItems';
import { Dropdown } from '../../components/core/Dropdown';
import { getCompanies } from '../../services/DiscoverService';
import { RTextInput } from '../../components/core/RTextInput';
import { connect } from '../../state/reduxStore';
import BACK from '../../assets/back.png';
import { AlternateNavBar } from '../../components/common/AlternateNavBar';

export function RawProfileCreateHome({route, navigation, skills}) {

  const [fullname, setFullname] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [linkedIn, setLinkedIn] = React.useState('');
  const [bio, setBio] = React.useState('');

  const [isValidated, setIsValidated] = React.useState(false);

  const { email, password } = route?.params;

  const [skill, setSkill] = React.useState('');

  // const [showVendorDropdown, setShowVendorDropdown] = React.useState(false);
  const [selectedSkills, setSelectedSkills] = React.useState([]);

  const isValidName = () => {
    return !!fullname
  }

  const isValidUsername = () => {
    return !!username
  }

  const isValidCompany = () => {
    return !!company
  }

  const isValidLinkedin = () => {
    return !!linkedIn
  }

  const validators = [isValidName, isValidUsername, isValidCompany, isValidLinkedin];

  // const vendors = getCompanies()

  const handleTypeSkill = (text) => {
    setSkill(text)
  }
  
  const onSelectSkill= (item) => {
    console.log("SELZ", item)
    setSelectedSkills(selectedSkills => [...selectedSkills, item])
  }

  const handleDeleteSkill = (item) => {
    console.log({selectedSkills, item})
    setSelectedSkills(selectedSkills => selectedSkills.filter(skills => skills.name !== item))
  }

  const handleNextPress = () => {
    const techStack = selectedSkills// .map(selected => selected.name)
    const isValid = validators.map(validator => validator()).every(item => !!item)
    if(isValid){
      navigation.navigate(RouteNames.PROFILE_QUESTION, {email, password, fullname, username, linkedIn, bio, company, techStack, step: "Industry"})
    }else{
      setIsValidated(true)
    }
    
  }

  // const isValidBio = () => {
  //   return !!bio
  // }

  return (
    <View style={styles.container}>
      {/* <AlternateNavBar navigation={navigation} /> */}
      {/* <View style={{alignItemsX: 'center', marginTop: 32, marginLeft}}> */}
      <Text style={styles.title}>
        Setup your profile
      </Text>
      <Text style={{color: colors.textLowlight, marginTop: 8, alignSelf: 'center'}}>
        Get verified!
      </Text>
      <RTextInput 
        onChangeText={setFullname}
        value={fullname}
        placeholder={"Enter your name"}
        style={styles.inputText}
      />
      {!isValidName() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please enter a name"}</Text>}
      <RTextInput 
        onChangeText={setUsername}
        value={username}
        placeholder={"Create your username"}
        style={styles.inputText}
      />
      {!isValidUsername() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please enter a username"}</Text>}
      <RTextInput 
        onChangeText={setCompany}
        value={company}
        placeholder={"Enter your current company"}
        style={styles.inputText}
      />
      {!isValidCompany() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please enter a company name"}</Text>}
      <RTextInput 
        onChangeText={setLinkedIn}
        value={linkedIn}
        placeholder={"Enter your LinkedIn URL"}
        style={styles.inputText}
      />
      {!isValidLinkedin() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please enter a valid linkedin url"}</Text>}
      <RTextInput
        onChangeText={setBio}
        value={bio}
        placeholder={"Enter bio (optional)"}
        numberOfLines={12}
        style={styles.inputText}
      />
      <RTextInput 
        style={[styles.inputText, {position: 'relative', zIndex: 100}]}
        label="Tech Stack"
        onChangeText={handleTypeSkill}
        value={skill}
        placeholder="What software do you use?"
        selections={skills}
        onSelect={onSelectSkill}
        // dropdownStyle={{
        //   top: -256,
        //   width: 256,
        // }}
        dropUp
      />
      {/* {!isValidName && <Text style={{color: 'red'}}>{"Please enter a valid name"}</Text>} */}
      <SelectedItems
        itemStyle={{color: colors.border, backgroundColor: colors.input}}
        items={selectedSkills.map(item => item.name)}
        onDelete={handleDeleteSkill}
      />
      <Button title="Continue to next step" onPress={handleNextPress} styles={{marginTop: 8, flex: 1, widthX: 512, justifyContent: "space-around", position: 'relative'}}/>
      <Text style={{marginTop: 32, color: colors.textLowlight, alignSelf: 'center'}}>{"Next, let's curate your feed with three quick questions"}</Text>{isValidName() && !isValidUsername() && isValidated && <Text style={{alignSelf: 'center', marginTop: 128, color: '#888888', fontSize: 8}}>{"App developed by RadekTech www.radektech.io"}</Text>}
      {/* </View> */}
    </View>
  )
}
const stp = (state) => ({
  skills: state.skills,
})
const dtp = (dispatch) => ({
});
export const ProfileCreateHome = connect(stp, dtp)(RawProfileCreateHome)

const styles = StyleSheet.create({
  input: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    margin: 8,
    color: colors.textRegular,
    fontSize: 12,
    widthX: 256,
  },
  container: {
    backgroundColor: colors.background,
    marginTop: 32,
    marginLeft: 256,
    marginRight: 256,
    maxWidth: 512,
  },
  title: {
    color: colors.textHighlight,
    marginTop: 32,
    fontSize: 18,
    alignSelf: 'center',
  },
  labeledInput: {
    flexDirection: 'row',
    backgroundColor: colors.input,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    color: colors.textHighlight,
  },
  inputText: {
    // width: "100%",
    // paddingLeft: 8,
    // width: 512,
    marginTop: 8,
    //color: colors.textLowlight,
  },
  dropdown: {
    top: 48,
    left: 96,
  },
})
