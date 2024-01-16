import React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { colors } from '../context/themes';
import { DiscussHomeScreen } from './discuss/DiscussHomeScreen';
import { Discover } from './discover';
import { CategoryNames, categories } from '../constants';
import { Button, ButtonType, buttonTypetoStyle } from '../common/Button';
import REALTALKTECH from '../../assets/title.png';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png';
import { BuyerAIHomeScreen } from './buyerai/BuyerAIHomeScreen';
import { DiscussHome } from './DiscussHome';
import { BuyerAIHome } from './BuyerAIHome';
import { DiscoverHome } from './DiscoverHome';

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
    component: DiscussHome,
  },
  {
    key: "Discover",
    title: "Discover",
    component: DiscoverHome,
  },
  {
    key: "BuyerAI",
    title: "BuyerAI",
    component: BuyerAIHome,
  },
];

export function Home(props){

  const [currentTab, setCurrentTab] = React.useState("Discuss");
  const [currentCategory, setCurrentCategory] = React.useState(CategoryNames.HOME);

  const layout = useWindowDimensions();

  const {navigation} = props;

  const handleTabPress = (tab) => {
    setCurrentTab(tab.key)
  }

  const handleCategoryPress = (category: CategoryNames) => {
    setCurrentCategory(category);
  }

  const Component = tabs.find(tab => {
    console.log(tab.key, currentTab)
    return tab.key === currentTab
  })?.component || null;

  // console.log(Component)

  return (
    <View style={styles.container}>
      <View style={styles.sideBar}>
        <Image source={REALTALKTECH_WHITE} style={{width: 256, height: 32}}/>
        {currentTab === "Discuss" && (<View style={styles.categories}>
          <Text style={{...buttonTypetoStyle[ButtonType.BARE], fontSize: 12}}>CATEGORIES</Text>
          <View style={{marginTop: 8}}>
            {categories.map(category => {
              return <Button
                title={category.name}
                onPress={() => handleCategoryPress(category.name)}
                type={ButtonType.BARE}
                styles={category.name === currentCategory ? {color: colors.textHighlight} : {}}
              />
            })}
          </View>
        </View>)}
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
          <Component currentCategory={currentCategory} navigation={navigation} />
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
    // paddingTop: 8,
    // paddingBottom: 8,
    padding: 16,
    // borderWidth: 1,
    // borderColor: 'green'
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
    marginTop: 32,
    borderWidth: 1,
    borderColor: 'yellow'
  },
});