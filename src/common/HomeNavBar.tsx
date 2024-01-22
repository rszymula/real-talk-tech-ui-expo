import React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { colors } from '../context/themes';
import { DiscoverHome } from '../screens/DiscoverHome';
import { CategoryNames } from '../constants';
import { Button, ButtonType } from '../core/Button';
import { BuyerAIHome } from '../screens/BuyerAIHome';
import { DiscussHome } from '../screens/DiscussHome';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png';


const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: colors.foreground }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: colors.foreground }} />
);

// const tabs = [
//   {
//     key: "Discuss",
//     title: "Discuss",
//     component: DiscussHome,
//   },
//   {
//     key: "Discover",
//     title: "Discover",
//     component: DiscoverHome,
//   },
//   {
//     key: "BuyerAI",
//     title: "BuyerAI",
//     component: BuyerAIHome,
//   },
// ];

const tabs = [
  {
    routeName: "DiscussHome",
    title: "Discuss"
  },
  {
    routeName: "DiscoverHome",
    title: "Discover"
  },
  {
    routeName: "BuyerAIHome",
    title: "Buyer AI"
  },
]

export function HomeNavBar(props){

  const [currentTab, setCurrentTab] = React.useState("Discuss");
  const [currentCategory, setCurrentCategory] = React.useState(CategoryNames.HOME);

  const layout = useWindowDimensions();

  const {navigation} = props;

  const handleTabPress = (tab) => {
    // setCurrentTab(tab.key)
    navigation.navigate(tab.routeName)
  }

  const handleCategoryPress = (category: CategoryNames) => {
    setCurrentCategory(category);
  }

  const handleAddProfilePress = () => {
    navigation.navigate("ProfileCreateHome")
  }

  // const Component = tabs.find(tab => {
  //   console.log(tab.routeName, currentTab)
  //   return tab.routeName === currentTab
  // })?.component || null;

  // console.log(Component)

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', borderColor: 'red', borderWidth: 1}}>
        <Image source={REALTALKTECH_WHITE} style={{width: 192, height: 24, borderColor: 'pink', borderWidth: 1}}/>
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
        <Button title={"+"} onPress={handleAddProfilePress} type={ButtonType.BASIC} />
      </View>
      {/* <View style={styles.sideBar}>
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
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    // flexDirection: 'row',
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
    margin: 0,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 2,
    fontSize: 12,
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
