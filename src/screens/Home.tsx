import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { colors } from '../context/themes';
import { DiscussHomeScreen } from './discuss/DiscussHomeScreen';
import { Discover } from './discover';
import { categories } from '../constants';
import { Button } from '../common/Button';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: colors.foreground }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: colors.foreground }} />
);

const tabs = [
  {
    key: "Discuss",
    title: "Discuss",
    // component: DiscussHomeScreen,
  },
  {
    key: "Discuss",
    title: "Discover",
    // component: Discover,
  },
]

export function Home(props){

  const {navigation} = props;

  const layout = useWindowDimensions();

  const handleTabPress = (tab) => {
    navigation.navigate(tab.key)
  }

  return (
    <View style={styles.container}>
      <View style={styles.sideBar}>
        <Text style={styles.title}>
          HOME
        </Text>
        <View style={styles.categories}>
          <Text>CATEGORIES</Text>
          <View style={{marginTop: 8}}>
            {
              categories.map(category => {
                return (
                  <Text style={{marginTop: 8}}>{category.name}</Text>
                );
              })
            }
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.topBar}>
            {
              tabs.map(tab => {
                return (
                  // <Text style={styles.tabButton}>{tab.title}</Text>
                  <Button title={tab.title} onPress={() => handleTabPress(tab)} styles={styles.tabButton}/>
                );
              })
            }
          </View>
        </View>
        <View style={styles.content}>
          <Text>lksdjfksdjflsdklfjsdlkfjsldkfjdslkfjlsdkjfldskjflsdkjflsdkjflsdkfjdlsk</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    padding: 32,
    borderWidth: 1,
    borderColor: 'purple'
  },
  title: {
    color: colors.textHighlight,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: 'green'
  },
  body: {
    // flexDirection: 'row',
    marginLeft: 32,
    borderWidth: 1,
    borderColor: 'red'
  },
  topBar: {
    flexDirection: 'row',
    // marginLeft: 4,
    // marginRight: 4,
    // alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'orange'
  },
  tabButton: {
    marginLeft: 4,
    marginRight: 4,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 2,
  },
  content: {
    borderWidth: 1,
    borderColor: 'lightGray'
  },
  sideBar: {
    borderWidth: 1,
    borderColor: 'blue'
  },
  categories: {
    borderWidth: 1,
    borderColor: 'yellow'
  },
});