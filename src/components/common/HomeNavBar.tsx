import React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { colors } from '../../context/themes';
import { Button, ButtonType } from '../core/Button';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png'; //'../../assets/titleWhite.png';
import { DEFAULT_TAB, RouteNames } from '../../constants/constants';


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
    routeName: RouteNames.MARKETPLACE_HOME,
    title: "Marketplace",
  },
  {
    routeName: RouteNames.BUYER_AI_HOME,
    title: "Buyer AI"
  },
]

const navRouteNames = [...tabs.map(tab => tab.routeName), RouteNames.PROFILE_USER, RouteNames.PROFILE_CREATE_HOME];

function getMostRecentNavRoute(routes: Array<any>){
  // using routes?.reverse()?.find does not work, since it seems to first sort and then do binary search. We need it sorted as it wsa to start
  for(let i = routes.length - 1; i < routes.length; i--){
    if(navRouteNames.includes(routes[i].name)){
      return routes[i].name
    }
  }
  return ''
}

export function HomeNavBar(props){

  const layout = useWindowDimensions();

  const {navigation, hasTabs = true} = props;

  const navState = navigation.getState()
  const currentRouteName = getMostRecentNavRoute(navState.routes);

  console.log({currentRouteName})

  const handleTabPress = (tab) => {
    navigation.navigate(tab.routeName)
  }

  const handleViewProfilePress = () => {
    navigation.navigate(RouteNames.PROFILE_USER)
  }

  const handleAddProfilePress = () => {
    navigation.navigate(RouteNames.PROFILE_WELCOME)
  }

  return (
    <View style={styles.container}>
      <Image source={REALTALKTECH_WHITE} style={styles.title}/>
        {hasTabs && (<View style={styles.topBar}>
          {
            tabs.map(tab => {
              return (
                <Button title={tab.title} onPress={() => handleTabPress(tab)} styles={styles.tabButton} type={tab.routeName === currentRouteName ? ButtonType.LOUD : ButtonType.BASIC}/>
              );
            })
          }
        </View>)}
      <View style={{flexDirection: 'row'}}>
        <Button title={"P"} onPress={handleViewProfilePress} styles={styles.tabButton} type={RouteNames.PROFILE_USER === currentRouteName ? ButtonType.LOUD : ButtonType.BASIC} />
        <Button title={"+"} onPress={handleAddProfilePress} styles={styles.tabButton} type={RouteNames.PROFILE_WELCOME === currentRouteName ? ButtonType.LOUD : ButtonType.BASIC} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'red',
    // borderWidth: 1
  },
  title: {
    width: 192,
    height: 24,
    borderColor: 'yellow',
    // borderWidth: 1
  },
  body: {
    marginLeft: 32,
    borderWidth: 1,
    // borderColor: 'red'
  },
  topBar: {
    width: 256,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // borderWidth: 1,
    borderColor: 'yellow'
  },
  tabButton: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    paddingBottom: 4,
    margin: 4,
    borderRadius: 2,
    fontSize: 12,
  },
  content: {
    // borderWidth: 1,
    borderColor: 'lightGray'
  },
  sideBar: {
    // borderWidth: 1,
    borderColor: 'blue'
  },
  categories: {
    marginTop: 32,
    // borderWidth: 1,
    borderColor: 'yellow'
  },
});
