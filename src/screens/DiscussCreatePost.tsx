import React from 'react';
import { Text, View, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { ButtonType, Button  } from '../common/Button';
import { Card } from '../common/Card';
import { colors } from '../context/themes';


const TEXT_PLACEHOLDER = 'Enter Text';
const POST_PLACEHOLDER = 'Enter your post';

export function DiscussCreatePost(props){

  const [category, setCategory] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const { navigation } = props;

  const handleCreatePost = () => {
    const postData  = {
      category,
      title,
      content,
    };
    // make API call
    // if API call successful, call passed in function that updates state
    handleExit();
  }

  const handleExit = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Card styles={{padding: 16}}>
        <Card>
          <View style={styles.labeledInput}>
            <Text style={styles.label}>Category</Text>
            <TextInput 
              style={styles.input}
              onChangeText={setCategory}
              value={category}
              placeholder={TEXT_PLACEHOLDER}
            />
          </View>
        </Card>
        <Card styles={{marginTop: 8}}>
          <View style={styles.labeledInput}>
            <Text style={styles.label}>Title</Text>
            <TextInput 
              style={styles.input}
              onChangeText={setTitle}
              value={title}
              placeholder={TEXT_PLACEHOLDER}
            />
          </View>
        </Card>
        <Card styles={{marginTop: 8}}>
          <TextInput 
            onChangeText={setContent}
            value={content}
            multiline={true}
            numberOfLines={12}
            style={styles.textbox}
            placeholder={POST_PLACEHOLDER}
          />
        </Card>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleExit} type={ButtonType.REVERSE} />
          <Button title="Create Post" onPress={handleCreatePost} />
        </View>
      </Card>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 2,
    padding: 32,
    backgroundColor: colors.background,
    height: "100%",
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    margin: 16,
    backgroundColor: colors.foreground,
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
  },
  label: {
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    color: colors.textHighlight,
  },
  input: {
    width: "100%",
    marginLeft: 8,
    color: colors.textLowlight,
  },
  textbox: {
    // height: 200,
    color: colors.textLowlight,
    backgroundColor: colors.input,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    margin: 16,
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
