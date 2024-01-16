import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput } from 'react-native';
import { CategoryNames, INPUT_PLACEHOLDER, RouteNames } from '../../../../constants';
import { Post } from './Post';
import { getPostsWithCommentIdsAndUpvotes } from '../../../../services/DiscussService';
import { DiscussRouteNames } from '../..';
import { Card } from '../../../../core/Card';
import { Separator } from '../../../../core/Separator';
import { Button, ButtonType } from '../../../../core/Button';
import { colors } from '../../../../context/themes';
import { InputBar } from '../../../../core/InputBar';
import { TabView, SceneMap } from 'react-native-tab-view';

const POST_PAGE_OFFSET = 10;

export function DiscussContent(props){

  const [currentPage, setCurrentPage] = React.useState(0);
  // const [input, setInput] = React.useState('');

  // const handleSetInput = (newInput) => {
  //   setInput(newInput);
  // }

  const { currentCategory, navigation } = props;
  const posts = getPostsWithCommentIdsAndUpvotes(currentCategory, 0, POST_PAGE_OFFSET);

  const handleOnPress = () => {
    navigation.navigate(RouteNames.DISCOVER)
  }

  console.log("Rendering Discuss")

  return (
    <Card styles={{width: 500}}>
      <View style={styles.container}>
        <Button title={"xcvc"} onPress={handleOnPress}/>
        <InputBar 
          onPress={(input) => {
            console.log("XXX", input)
            navigation.navigate(DiscussRouteNames.CREATE_POST, { input })
          }}
          title={"Create Post"}
          placeholder={INPUT_PLACEHOLDER}
        />
        <Separator />
        <View>
          <FlatList 
            data={posts}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => <Post {...item} currentCategory={currentCategory} navigation={navigation} />}
            ItemSeparatorComponent={() => <Separator />}
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
  },
  input: {
    color: colors.textRegular,
    fontSize: 12,
  },
  card: {
    marginBottom: 16,
  }
})
