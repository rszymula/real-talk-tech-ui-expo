import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { colors } from '../../context/themes';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png'// '../../assets/titleWhite.png';
import { RouteNames } from '../../constants/constants';
import { SelectedItems } from '../../components/common/SelectedItems';
import { Dropdown } from '../../components/core/Dropdown';
import { getCompanies } from '../../services/DiscoverService';

export function ProfileCreateHome({route, navigation}) {

  console.log("ESPECIALLY you")

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [bio, setBio] = React.useState('');

  const { email, password } = route?.params;

  const [vendor, setVendor] = React.useState('');

  const [showVendorDropdown, setShowVendorDropdown] = React.useState(false);
  const [selectedVendors, setSelectedVendors] = React.useState([]);

  // const showDropdown = category.length > 0

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
    navigation.navigate(RouteNames.PROFILE_QUESTION, {email, password, firstName, lastName, username, bio, step: "Industry"})
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', margin: 32}}>
      <Image source={REALTALKTECH_WHITE} style={{width: 256, height: 32}}/>
        <Text style={styles.title}>
            Setup your profile
          </Text>
          <Text style={{color: colors.textLowlight, margin: 8}}>
            Choose to join anonymously or as yourself
          </Text>
            <TextInput 
              onChangeText={setFirstName}
              value={firstName}
              placeholder={"Enter your first name"}
              style={styles.inputText}
            />
            <TextInput 
              onChangeText={setLastName}
              value={lastName}
              placeholder={"Enter your last name"}
              style={styles.inputText}
            />
            <TextInput 
              onChangeText={setUsername}
              value={username}
              placeholder={"Create your username"}
              style={styles.inputText}
            />
            <TextInput
              onChangeText={setBio}
              value={bio}
              placeholder={"Enter bio description"}
              style={styles.inputText}
            />
            <View style={[styles.labeledInput, {zIndex: 100, marginTop: 8}]}>
            {showVendorDropdown && (<Dropdown items={vendors} onSelect={onSelectVendor} style={styles.dropdown}/>)}
            <Text style={styles.label}>Tag Software</Text>
            <TextInput 
              style={[styles.inputText]}
              onChangeText={handleTypeVendor}
              value={vendor}
              placeholder={"Enter Text"}
              onFocus={() => setShowVendorDropdown(true)}
              onBlur={() => setTimeout(() => setShowVendorDropdown(false), 100)}
            />
          </View>
          {/* <SelectedCategories selectedCategories={selectedCategories}/> */}
          <SelectedItems items={selectedVendors.map(item => item.name)} onDelete={handleDeleteVendor}/>
        
          <Button title="Next Step" onPress={handleNextPress} styles={{marginTop: 8}}/>
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
    width: "100%",
    paddingLeft: 8,
    color: colors.textLowlight,
  },
  dropdown: {
    top: 48,
    left: 96,
  },
})

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'space-between',
//   },
//   item: {
//     marginTop: 8,
//   },
//   exit: {
//     color: colors.textRegular,
//     alignSelf: 'flex-end',
//     paddingRight: 8,
//   },
//   labeledInput: {
//     flexDirection: 'row',
//     backgroundColor: colors.input,
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   label: {
//     padding: 16,
//     borderRightWidth: 1,
//     borderRightColor: colors.border,
//     color: colors.textHighlight,
//   },
//   input: {
//     width: "100%",
//     paddingLeft: 8,
//     color: colors.textLowlight,
//   },
//   textbox: {
//     color: colors.textLowlight,
//     backgroundColor: colors.input,
//     padding: 8,
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     backgroundColor: colors.link,
//     paddingTop: 8,
//     paddingBottom: 8,
//     paddingLeft: 32,
//     paddingRight: 32,
//     borderWidth: 1,
//     borderColor: colors.link,
//     borderRadius: 4,
//     fontSize: 12,
//   },
//   dropdown: {
//     top: 48,
//     left: 96,
//   },
// })
