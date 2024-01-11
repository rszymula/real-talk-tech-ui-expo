import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput } from 'react-native';
import { CategoryNames } from '../../../../constants';
import { Post } from './Post';
import { getPostsWithCommentIdsAndUpvotes } from '../../../../services/DiscussService';
import { DiscussRouteNames } from '../..';
import { Card } from '../../../../common/Card';
import { Separator } from '../../../../common/Separator';
import { Button, ButtonType } from '../../../../common/Button';
import { colors } from '../../../../context/themes';

const POST_PAGE_OFFSET = 10;

const INPUT_PLACEHOLDER = 'Share your SaaS experiences with the community';

function InputBar({navigation}){

  const [input, setInput] = React.useState('');

  const handleSetInput = (newInput) => {
    setInput(newInput);
  }

  const handleCreatePost = () => {
    navigation.navigate(DiscussRouteNames.CREATE_POST);
  } 

  return (
    <Card styles={styles.card}>
      <View style={styles.inputBarContainer}>
        <TextInput 
          onChangeText={handleSetInput}
          value={input}
          placeholder={INPUT_PLACEHOLDER}
          style={styles.input}
        />
        <Button title='Create Post' onPress={handleCreatePost} styles={styles.button} type={ButtonType.BASIC} />
      </View>
    </Card>
  )
}

export function DiscussContent(props){

  const [currentPage, setCurrentPage] = React.useState(0);
  // const [input, setInput] = React.useState('');

  // const handleSetInput = (newInput) => {
  //   setInput(newInput);
  // }

  const { currentCategory, navigation } = props;
  const posts = getPostsWithCommentIdsAndUpvotes(currentCategory, 0, POST_PAGE_OFFSET);

  console.log("Rendering Discuss")

  return (
    <Card>
      <View style={styles.container}>
        <InputBar {...props} />
        <Separator />
        <View>
          <FlatList 
            data={posts}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => <Post {...item} currentCategory={currentCategory} navigation={navigation} />}
          />
        </View>
      </View>
    </Card>
  )
}


const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 8,
  },
  button: {
    // width: 256,
    marginLeft: 16,
  },
  inputBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    // borderColor:'red',
    // borderWidth: 2,
    padding: 8,
    backgroundColor: colors.background,
  },
  input: {
    color: colors.textRegular,
    fontSize: 12,
  },
  card: {
    marginBottom: 16,
  }
})
