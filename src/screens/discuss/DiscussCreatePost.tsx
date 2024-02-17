import React from 'react';
import { Text, View, Modal, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { ButtonType, Button  } from '../../components/core/Button';
import { Card } from '../../components/core/Card';
import { colors } from '../../context/themes';
import { store } from '../../state/basicStore';
import { Dropdown } from '../../components/core/Dropdown';
import { CategoryNames, categories } from '../../constants/constants';
import { SelectedItems } from '../../components/common/SelectedItems';
import { fetchVendors, getCompanies } from '../../services/DiscoverService';
import { RTextInput } from '../../components/core/RTextInput';
import { RLabeledTextInput } from '../../components/core/RLabeledTextInput';
import { connect } from '../../state/reduxStore';
import { makeComment, makePost } from '../../services/DiscussService';

export function RawDiscussCreatePost(props){

  const { navigation, route, makePost, vendors, fetchVendors, auth } = props;
  const { input } = route?.params;

  const [category, setCategory] = React.useState('');
  const [vendor, setVendor] = React.useState('');
  const [title, setTitle] = React.useState(input);
  const [content, setContent] = React.useState('');
  const [anonymous, setAnonymous] = React.useState(false);

  const [showVendorDropdown, setShowVendorDropdown] = React.useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [selectedVendors, setSelectedVendors] = React.useState([]);

  console.log({categories, vendors})
  const anonymousSelections = [
    {
      anonymous: false,
      name: "No, post publicly",
    },
    {
      anonymous: true,
      name: "Yes, post anonymously",
    },
  ]

  const handleTypeCategory = (text) => {
    setCategory(text)
  }

  const handleTypeVendor = (text) => {
    setVendor(text)
  }

  // document.cookie = "userId: 123";

  const handleCreatePost = () => {
    console.log({
      title,
      content,
      selectedCategories,
      vendors,
      auth
    })
    // make API call
    // if API call successful, call passed in function that updates state
    // TODO use id, createdTimestamp, and updatedTimestamp from api call return
    makePost(title, content, selectedCategories, vendors, anonymous, auth)
    handleExit();
  }

  const onSelectCategory = (item) => {
    console.log("SELZ", item)
    setSelectedCategories(selectedCategories => [...selectedCategories, item])
  }

  const handleDeleteCategory = (item) => {
    console.log({selectedCategories, item})
    setSelectedCategories(selectedCategories => selectedCategories.filter(category => category.name !== item))
  }
  
  const onSelectVendor= (item) => {
    console.log("SELZ", item)
    setSelectedVendors(selectedVendors => [...selectedVendors, item])
  }

  const handleDeleteVendor = (item) => {
    console.log({selectedVendors, item})
    setSelectedVendors(selectedVendors => selectedVendors.filter(vendors => vendors.name !== item))
  }

  const handleExit = () => {
    navigation.goBack();
  }

  return (
    <Card styles={{width: 512}}>
      <View style={styles.container}>
        <RTextInput 
          style={{marginTop: 8, position: 'relative', zIndex: 100}}
          label="Category"
          onChangeText={handleTypeCategory}
          value={category}
          placeholder="Enter Text"
          selections={categories}
          onSelect={onSelectCategory}
        />
        <SelectedItems itemStyle={{color: colors.border, backgroundColor: colors.input}} items={selectedCategories.map(item => item.name)} onDelete={handleDeleteCategory}/>
        <RTextInput 
          style={{marginTop: 8}}
          label="Title"
          onChangeText={setTitle}
          value={title}
          placeholder="Enter post title"
        />
        <RTextInput 
          style={{marginTop: 8}}
          onChangeText={setContent}
          value={content}
          placeholder="Enter your post"
          numberOfLines={12}
        />
        <RTextInput 
          style={{marginTop: 8, position: 'relative', zIndex: 100}}
          label="Tag Software"
          onChangeText={handleTypeVendor}
          value={vendor}
          placeholder="Enter Text"
          selections={vendors}
          onSelect={onSelectVendor}
        />
        <SelectedItems itemStyle={{color: colors.border, backgroundColor: colors.input}} items={selectedVendors.map(item => item.name)} onDelete={handleDeleteVendor}/>
        <RTextInput 
          style={{marginTop: 8, position: 'relative', zIndex: 10}}
          label="Post Anonymously"
          onChangeText={() => {}}
          value={anonymous ? "Yes, post anonymously" : "No, post publicly"}
          freeze
          placeholder="Enter Text"
          selections={anonymousSelections}
          onSelect={(item) => {setAnonymous(item.anonymous)}}
        />
        <View style={[styles.buttonContainer, styles.item]}>
          <Button title="Cancel" onPress={handleExit} type={ButtonType.REVERSE} />
          <Button title="Create Post" onPress={handleCreatePost} />
        </View>
      </View>
    </Card>
  )
}

const stp = (state) => ({
  vendors: state.vendors,
  auth: state.auth,
})
const dtp = (dispatch) => ({
  makePost: makePost(dispatch),
  fetchVendors: fetchVendors(dispatch),
});
export const DiscussCreatePost = connect(stp, dtp)(RawDiscussCreatePost);


const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  item: {
    marginTop: 8,
  },
  exit: {
    color: colors.textRegular,
    alignSelf: 'flex-end',
    paddingRight: 8,
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
  textbox: {
    color: colors.textLowlight,
    backgroundColor: colors.input,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.link,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
    borderWidth: 1,
    borderColor: colors.link,
    borderRadius: 4,
    fontSize: 12,
  },
  dropdown: {
    top: 48,
    left: 96,
  },
})

