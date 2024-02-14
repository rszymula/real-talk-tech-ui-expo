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


// const TEXT_PLACEHOLDER = 'Enter Text';
// const POST_PLACEHOLDER = 'Enter your post';

// function SelectedCategories(props){
//   return (
//     <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
//       {props.selectedCategories.map(item => (<Text>{item.name}</Text>))}
//     </View>
//   )
// }

// function DropdownModal(props) {
//   const [visible, setVisible] = React.useState(true);
//   const handlePress = () => {
//     console.log("PRESSZ")
//     setVisible(!visible)
//   }
//   return (
//     <View>
//       <Modal
//         animationType='slide'
//         transparent={false}
//         onRequestClose={() => {
//           setVisible(!visible)
//         }}
//         visible={visible}
//       >
//         <View>
//           <Text>Dropdown Modal</Text>
//           <Pressable 
//             onPress={handlePress}
//           >
//             <Text>Press Me to Close</Text>
//           </Pressable>
//         </View>
//       </Modal>
//     </View>
//   )
// }


export function RawDiscussCreatePost(props){

  // const { createPost, getPostsWithCommentIdsAndUpvotes, makePost } = store;

  const [category, setCategory] = React.useState('');
  const [vendor, setVendor] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const [showVendorDropdown, setShowVendorDropdown] = React.useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [selectedVendors, setSelectedVendors] = React.useState([]);

  // const showDropdown = category.length > 0

  const { navigation, route, makePost, vendors, fetchVendors, auth } = props;

  // const vendors = getCompanies()

  console.log({categories, vendors})

  React.useEffect(() => {
    fetchVendors();
  }, [])

  const handleTypeCategory = (text) => {
    setCategory(text)
  }

  const handleTypeVendor = (text) => {
    setVendor(text)
  }

  // document.cookie = "userId: 123";

  const handleCreatePost = () => {
    // const postData  = {
    //   category,
    //   title,
    //   content,
    // };
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
    makePost(title, content, selectedCategories, vendors, false, auth)
    // createPost({id: 999, title, description: content, category})
    // const posts = getPostsWithCommentIdsAndUpvotes(category, 0, 100)
    // console.log(posts)
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
        {/* <View style={[styles.labeledInput, {zIndex: 100}]}>
          {showCategoryDropdown && (<Dropdown items={categories} onSelect={onSelectCategory} style={styles.dropdown}/>)}
          <Text style={styles.label}>Category</Text>
          <TextInput 
            style={[styles.inputText]}
            onChangeText={handleTypeCategory}
            value={category}
            placeholder={TEXT_PLACEHOLDER}
            onFocus={() => setShowCategoryDropdown(true)}
            onBlur={() => setTimeout(() => setShowCategoryDropdown(false), 100)}
          />
        </View> */}
        <RTextInput 
          style={{marginTop: 8, position: 'relative', zIndex: 100}}
          label="Category"
          onChangeText={handleTypeCategory}
          value={category}
          placeholder="Enter Text"
          selections={categories}
          onSelect={onSelectCategory}
        />
        <SelectedItems items={selectedCategories.map(item => item.name)} onDelete={handleDeleteCategory}/>
        <RTextInput 
          style={{marginTop: 8}}
          label="Title"
          onChangeText={setTitle}
          value={title}
          placeholder="Enter Text"
        />
        <RTextInput 
          style={{marginTop: 8}}
          onChangeText={setContent}
          value={content}
          placeholder="Enter your post"
          numberOfLines={12}
        />
        {/* <View style={[styles.labeledInput, {zIndex: 100, marginTop: 8}]}>
          {showVendorDropdown && (<Dropdown items={vendors} onSelect={onSelectVendor} style={styles.dropdown}/>)}
          <Text style={styles.label}>Tag Software</Text>
          <TextInput 
            style={[styles.inputText]}
            onChangeText={handleTypeVendor}
            value={vendor}
            placeholder={TEXT_PLACEHOLDER}
            onFocus={() => setShowVendorDropdown(true)}
            onBlur={() => setTimeout(() => setShowVendorDropdown(false), 100)}
          />
        </View> */}
        <RTextInput 
          style={{marginTop: 8, position: 'relative', zIndex: 100}}
          label="Tag Software"
          onChangeText={handleTypeVendor}
          value={vendor}
          placeholder="Enter Text"
          selections={vendors}
          onSelect={onSelectVendor}
        />
        {/* <SelectedCategories selectedCategories={selectedCategories}/> */}
        <SelectedItems items={selectedVendors.map(item => item.name)} onDelete={handleDeleteVendor}/>
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

