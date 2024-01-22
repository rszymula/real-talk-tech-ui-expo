import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Card } from '../core/Card';
import { InputBar } from '../core/InputBar';
import { Separator } from '../core/Separator';
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
      <Card styles={{width: 512, padding: 16}}>
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
      </Card>
  )
}
