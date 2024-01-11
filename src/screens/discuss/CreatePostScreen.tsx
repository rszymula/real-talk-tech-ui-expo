import React from 'react';
import { Text, View, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../../context/themes';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';


export function CreatePostScreen(props){

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
      <Card>
        <Card>
          <View style={styles.labeledInput}>
            <Text style={styles.label}>Category</Text>
            <TextInput 
              style={styles.input}
              onChangeText={setCategory}
              value={category}
            />
          </View>
        </Card>
        <Card>
          <View style={styles.labeledInput}>
            <Text style={styles.label}>Title</Text>
            <TextInput 
              style={styles.input}
              onChangeText={setTitle}
              value={title}
            />
          </View>
        </Card>
        <Card>
          <TextInput 
            onChangeText={setContent}
            value={content}
            multiline={true}
            numberOfLines={12}
            style={styles.textbox}
          />
        </Card>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleExit} alternate={true} />
          <Button title="Create Post" onPress={handleCreatePost} alternate={true} />
        </View>
      </Card>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: 2,
    padding: 16,
    backgroundColor: colors.background
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
  },
  label: {
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    color: colors.textHighlight,
  },
  input: {
    width: "100%",
  },
  textbox: {
    // height: 200,
    color: colors.textHighlight,
    padding: 8,
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
