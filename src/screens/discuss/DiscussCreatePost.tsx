import React from 'react';
import { Text, View, Modal, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { ButtonType, Button  } from '../../components/core/Button';
import { Card } from '../../components/core/Card';
import { colors } from '../../context/themes';
import { store } from '../../state/basicStore';
import { Dropdown } from '../../components/core/Dropdown';
import { CategoryNames, categories } from '../../constants/constants';
import { SelectedItems } from '../../components/common/SelectedItems';
import { getCompanies } from '../../services/DiscoverService';
import { RTextInput } from '../../components/core/RTextInput';
import { RLabeledTextInput } from '../../components/core/RLabeledTextInput';
import { connect } from '../../state/reduxStore';
import { makeComment, makePost } from '../../services/DiscussService';
import { Heading } from '../../components/common/Heading';
import { RButton, RButtonText } from '../../components/core/RButton';

export function RawDiscussCreatePost(props){

  const { navigation, route, makePost, skills, auth } = props;
  const { input, currentCategory } = route?.params;

  const [category, setCategory] = React.useState('');
  const [skill, setSkill] = React.useState('');
  const [title, setTitle] = React.useState(input);
  const [content, setContent] = React.useState('');
  const [anonymous, setAnonymous] = React.useState(false);

  const [selectedCategories, setSelectedCategories] = React.useState(categories.filter(item => item.name === currentCategory));
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [customSkills, setCustomSkills] = React.useState([]);

  const [isValidated, setIsValidated] = React.useState(false);

  const containsCategory = () => {
    return selectedCategories.length > 0
  }

  const isValidTitle = () => {
    return !!title
  }

  const isValidContent = () => {
    return !!content
  }


  const validators = [containsCategory, isValidTitle, isValidContent];

  console.log({categories, currentCategory, skills})

  // const vendorList = Object.keys(vendors).map(id => ({id, name: vendors[id].vendorName}))

  const anonymousSelections = [
    {
      anonymous: false,
      name: "No, share to discussion",
    },
    {
      anonymous: true,
      name: "Yes, post anonymously",
    },
  ]

  const handleSetTitle = (newTitle) => {
    if(newTitle.length < 200){
      setTitle(newTitle)
    }
  }

  // const handleSetContent = (newContent) => {
  //   if(newContent.length < 200){
  //     setTitle(newContent)
  //   }
  // }

  const handleTypeCategory = (text) => {
    setCategory(text)
  }

  const handleTypeSkill = (text) => {
    setSkill(text)
  }

  // document.cookie = "userId: 123";

  const handleCreatePost = () => {
    console.log({
      title,
      content,
      selectedCategories,
      skills,
      auth
    })
    // make API call
    // if API call successful, call passed in function that updates state
    // TODO use id, createdTimestamp, and updatedTimestamp from api call return
    console.log("AW", auth)
    // makePost(title, content, selectedCategories, skills, anonymous, auth)
    const isValid = validators.map(validator => validator()).every(item => !!item)
    if(isValid){
      makePost(
        title,
        content,
        selectedCategories, 
        [
          ...selectedSkills.map(item => item.name),
          ...customSkills
        ],
        anonymous,
        auth
      );
      handleExit();
    } else {
      setIsValidated(true)
    }
  }

  const handleSelectCategory = (item) => {
    // really should use a Set
    if(!selectedCategories.includes(item)){
      setSelectedCategories(selectedCategories => [...selectedCategories, item])
    }
  }

  const handleDeleteCategory = (item) => {
    console.log({selectedCategories, item})
    setSelectedCategories(selectedCategories => selectedCategories.filter(category => category.name !== item))
  }
  
  const handleSelectSkill= (item) => {
    // really should use a Set
    if(!selectedSkills.includes(item)){
      setSelectedSkills(selectedSkills => [...selectedSkills, item])
    }
  }

  const handleSubmitCustomSkill = (item) => {
    console.log("CUSTOW", item)
    setCustomSkills(customSkills => [...customSkills, item])
  }

  const handleDeleteSkill = (item) => {
    console.log({selectedSkills, customSkills, item})
    setSelectedSkills(selectedSkills => selectedSkills.filter(skill => skill.name !== item))
    setCustomSkills(customSkills => customSkills.filter(skill => skill !== item));
  }

  const handleExit = () => {
    navigation.goBack();
  }

  const isValid = validators.map(validator => validator()).every(item => !!item)

  return (
    <View>
      <Heading navigation={navigation}>
      </Heading>
      <Card styles={{minWidthX: 512, flexX: 1}}>
        <View style={styles.container}>
          <RTextInput 
            style={{marginTop: 8, position: 'relative', zIndex: 100}}
            label="Category"
            onChangeText={handleTypeCategory}
            value={category}
            placeholder="Enter Text"
            selections={categories}
            onSelect={handleSelectCategory}
          />
          <SelectedItems itemStyle={{color: colors.border, backgroundColor: colors.input}} items={selectedCategories.map(item => item.name)} onDelete={handleDeleteCategory}/>
          {!containsCategory() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please select at least one category"}</Text>}
          <RTextInput 
            style={{marginTop: 8}}
            label="Title"
            onChangeText={handleSetTitle}
            value={title}
            placeholder="Enter post title"
          />
          {!isValidTitle() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please enter a post title"}</Text>}
          <RTextInput 
            style={{marginTop: 8}}
            onChangeText={setContent}
            value={content}
            placeholder="Enter your post"
            numberOfLines={12}
          />
          {!isValidContent() && isValidated && <Text style={{color: colors.error, fontSize: 10}}>{"Please enter content"}</Text>}
          <RTextInput 
            style={{marginTop: 8, position: 'relative', zIndex: 100}}
            label="Tag Software"
            onChangeText={handleTypeSkill}
            value={skill}
            placeholder="Add Technology (select OR manually enter)"
            selections={skills}
            onSelect={handleSelectSkill}
            onSubmit={handleSubmitCustomSkill}
            dropUp
            // dropdownStyle={{
            //   top: -256,
            //   width: 256,
            // }}
          />
          <SelectedItems itemStyle={{color: colors.border, backgroundColor: colors.input}} items={[...selectedSkills.map(item => item.name), ...customSkills]} onDelete={handleDeleteSkill}/>
          <RTextInput 
            style={{marginTop: 8, position: 'relative', zIndex: 100}}
            label="Hide Username"
            onChangeText={null}
            value={anonymous ? "Yes, post anonymously" : "No"}
            freeze
            placeholder="Enter Text"
            selections={anonymousSelections}
            onSelect={(item) => {setAnonymous(item.anonymous)}}
            dropUp
          />
          <RButton onPress={handleCreatePost} active={isValid} style={{marginTop: 8}}>
            <RButtonText text={"Create Post"} active={isValid}/>
          </RButton>
        </View>
      </Card>
    </View>
  )
}

const stp = (state) => ({
  skills: state.skills,
  auth: state.auth,
})
const dtp = (dispatch, getState) => ({
  makePost: makePost(dispatch, getState),
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
    // width: "100%",
    paddingLeft: 8,
    color: colors.textRegular,
  },
  textbox: {
    color: colors.textRegular,
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

