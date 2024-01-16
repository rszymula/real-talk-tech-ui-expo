import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Card } from '../common/Card';
import { InputBar } from '../common/InputBar';
import { Separator } from '../common/Separator';
import { RouteNames, INPUT_PLACEHOLDER } from '../constants';
import { colors } from '../context/themes';
import { getPostsWithCommentIdsAndUpvotes } from '../services/DiscussService';
import { DiscussRouteNames } from './discuss';
import { Post } from './discuss/DiscussHomeScreen/DiscussContent/Post';

const POST_PAGE_OFFSET = 10;

export function DiscussHome(props){

  const [currentPage, setCurrentPage] = React.useState(0);

  const { currentCategory, navigation } = props;
  const posts = getPostsWithCommentIdsAndUpvotes(currentCategory, 0, POST_PAGE_OFFSET);

  console.log("Rendering Discuss")

  return (
    <Card styles={{width: 500, marginTop: 32}}>
      <View style={styles.container}>
        <InputBar 
          onPress={(input) => {
            navigation.navigate("DiscussCreatePost", { input })
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
