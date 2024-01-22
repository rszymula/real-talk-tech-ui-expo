import React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { colors } from '../context/themes';
import { Button, ButtonType } from '../core/Button';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png';
import { DEFAULT_TAB, RouteNames } from '../constants';


const tabs = [
  {
    routeName: RouteNames.DISCUSS_HOME,
    title: "Discuss"
  },
  {
    routeName: RouteNames.DISCOVER_HOME,
    title: "Discover"
  },
  {
    routeName: RouteNames.BUYER_AI_HOME,
    title: "Buyer AI"
  },
]

const tabNames = tabs.map(tab => tab.routeName);

function getMostRecentTabRoute(routes: Array<any>){
  // using routes?.reverse()?.find does not work, since it seems to first sort and then do binary search. We need it sorted as it wsa to start
  for(let i = routes.length - 1; i < routes.length; i--){
    console.log("Hmmm", routes[i].name)
    if(tabNames.includes(routes[i].name)){
      console.log("YES", routes[i].name)
      return routes[i].name
    }
  }
  return ''
}

export function HomeNavBar(props){

  const layout = useWindowDimensions();

  const {navigation} = props;

  const navState = navigation.getState()
  const currentRouteName = getMostRecentTabRoute(navState.routes);

  console.log({currentRouteName})

  const handleTabPress = (tab) => {
    navigation.navigate(tab.routeName)
  }

  const handleAddProfilePress = () => {
    navigation.navigate(RouteNames.PROFILE_CREATE_HOME)
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', borderColor: 'red', borderWidth: 1}}>
      <Image source={REALTALKTECH_WHITE} style={{width: 192, height: 24, borderColor: 'yellow', borderWidth: 1}}/>
        <View style={styles.topBar}>
          {
            tabs.map(tab => {
              return (
                <Button title={tab.title} onPress={() => handleTabPress(tab)} styles={styles.tabButton} type={tab.routeName === currentRouteName ? ButtonType.LOUD : ButtonType.BASIC}/>
              );
            })
          }
        </View>
      <Button title={"+"} onPress={handleAddProfilePress} type={ButtonType.BASIC} />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    padding: 16,
    // borderWidth: 1,
    // borderColor: 'green'
  },
  body: {
    marginLeft: 32,
    borderWidth: 1,
    borderColor: 'red'
  },
  topBar: {
    width: 256,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'yellow'
  },
  tabButton: {
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
