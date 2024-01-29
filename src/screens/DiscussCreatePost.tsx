import React from 'react';
import { Text, View, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { ButtonType, Button  } from '../core/Button';
import { Card } from '../core/Card';
import { colors } from '../context/themes';
import { store } from '../store/basicStore';


const TEXT_PLACEHOLDER = 'Enter Text';
const POST_PLACEHOLDER = 'Enter your post';

export function DiscussCreatePost(props){

  const { createPost, getPostsWithCommentIdsAndUpvotes } = store;

  const [category, setCategory] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const { navigation, route } = props;

  const handleCreatePost = () => {
    const postData  = {
      category,
      title,
      content,
    };
    // make API call
    // if API call successful, call passed in function that updates state
    // TODO use id, createdTimestamp, and updatedTimestamp from api call return
    createPost({id: 999, title, description: content, category})
    const posts = getPostsWithCommentIdsAndUpvotes(category, 0, 100)
    console.log(posts)
    handleExit();
  }

  const handleExit = () => {
    navigation.goBack();
  }

  return (
    <Card styles={{width: 512}}>
      <View style={styles.container}>
        <View style={styles.labeledInput}>
          <Text style={styles.label}>Category</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setCategory}
            value={category}
            placeholder={TEXT_PLACEHOLDER}
          />
        </View>
        <View style={[styles.labeledInput, styles.item]}>
          <Text style={styles.label}>Title</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholder={TEXT_PLACEHOLDER}
          />
        </View>
        <TextInput 
          onChangeText={setContent}
          value={content}
          multiline={true}
          numberOfLines={12}
          style={[styles.textbox, styles.item]}
          placeholder={POST_PLACEHOLDER}
        />
        <View style={[styles.buttonContainer, styles.item]}>
          <Button title="Cancel" onPress={handleExit} type={ButtonType.REVERSE} />
          <Button title="Create Post" onPress={handleCreatePost} />
        </View>
      </View>
    </Card>
  )
}


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
  input: {
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

})
