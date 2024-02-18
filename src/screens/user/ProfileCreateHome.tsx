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

export function ProfileCreateHome({route, navigation, signup}) {

  const [fullname, setFullname] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [bio, setBio] = React.useState('');

  const { email, password } = route?.params;

  const [vendor, setVendor] = React.useState('');

  const [showVendorDropdown, setShowVendorDropdown] = React.useState(false);
  const [selectedVendors, setSelectedVendors] = React.useState([]);

  const vendors = getCompanies()

  const handleTypeVendor = (text) => {
    setVendor(text)
  }
  
  const onSelectVendor= (item) => {
    console.log("SELZ", item)
    setSelectedVendors(selectedVendors => [...selectedVendors, item])
  }

  const handleDeleteVendor = (item) => {
    console.log({selectedVendors, item})
    setSelectedVendors(selectedVendors => selectedVendors.filter(vendors => vendors.name !== item))
  }

  const handleNextPress = () => {
    const techStack = selectedVendors.map(selected => selected.id)
    navigation.navigate(RouteNames.PROFILE_QUESTION, {email, password, fullname, username, bio, company, techStack, step: "Industry"})
  }

  return (
    <View style={styles.container}>
      {/* <AlternateNavBar navigation={navigation} /> */}
      <View style={{alignItems: 'center', margin: 32}}>
        <Text style={styles.title}>
          Setup your profile
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8}}>
          Choose to join anonymously or as yourself
        </Text>
        <RTextInput 
          onChangeText={setFullname}
          value={fullname}
          placeholder={"Enter your full name"}
          style={styles.inputText}
        />
        <RTextInput 
          onChangeText={setUsername}
          value={username}
          placeholder={"Create your username"}
          style={styles.inputText}
        />
        <RTextInput 
          onChangeText={setCompany}
          value={company}
          placeholder={"Enter your current company"}
          style={styles.inputText}
        />
        <RTextInput
          onChangeText={setBio}
          value={bio}
          placeholder={"Enter bio description"}
          numberOfLines={12}
          style={styles.inputText}
        />
        <RTextInput 
          style={[styles.inputText, {position: 'relative', zIndex: 100}]}
          label="Tag Software"
          onChangeText={handleTypeVendor}
          value={vendor}
          placeholder="Enter Text"
          selections={vendors}
          onSelect={onSelectVendor}
        />
        <SelectedItems
          itemStyle={{color: colors.border, backgroundColor: colors.input}}
          items={selectedVendors.map(item => item.name)}
          onDelete={handleDeleteVendor}
        />
        <Button title="Next Step" onPress={handleNextPress} styles={{marginTop: 8, flex: 1, width: 512, justifyContent: "space-around", position: 'relative'}}/>
        <Text style={{marginTop: 32, color: colors.textLowlight}}>{"Next, let's curate your feed with three quick questions"}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    margin: 8,
    color: colors.textRegular,
    fontSize: 12,
    width: 256,
  },
  container: {
    backgroundColor: colors.background,
    height: "100%",
  },
  title: {
    color: colors.textHighlight,
    marginTop: 32,
    fontSize: 18,
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
    width: 512,
    marginTop: 8,
    //color: colors.textLowlight,
  },
  dropdown: {
    top: 48,
    left: 96,
  },
})
