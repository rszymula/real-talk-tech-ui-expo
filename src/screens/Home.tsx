import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { colors } from '../context/themes';
import { DiscussHomeScreen } from './discuss/DiscussHomeScreen';
import { Discover } from './discover';
import { categories } from '../constants';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: colors.foreground }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: colors.foreground }} />
);

const tabs = [
  {
    key: "1",
    title: "Discuss",
    component: DiscussHomeScreen,
  },
  {
    key: "2",
    title: "Discover",
    component: Discover,
  },
]

export function Home(){

  const layout = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.sideBar}>
        <Text style={styles.title}>
          HOME
        </Text>
        <View style={styles.categories}>
          {
            categories.map(category => {
              return (
                <Text style={styles.tabButton}>{category.name}</Text>
              );
            })
          }
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.topBar}>
          {
            tabs.map(tab => {
              return (
                <Text style={styles.tabButton}>{tab.title}</Text>
              );
            })
          }
        </View>
        <View style={styles.content}>
          <Text>lksdjf</Text>
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
    // alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'orange'
  },
  content: {
    borderWidth: 1,
    borderColor: 'lightGray'
  },
  tabButton: {
    color: colors.textHighlight,
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