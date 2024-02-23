import React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { colors } from '../../context/themes';
import { Button, ButtonType } from '../core/Button';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png';
import { DEFAULT_TAB, RouteNames, tabs } from '../../constants/constants';
import SETTINGS from '../../assets/settings.png';
import SETTINGS_ACTIVE from '../../assets/settings_active.png';
import NOTIFICATIONS from '../../assets/notifications.png';
import NOTIFICATIONS_ACTIVE from '../../assets/notifications_active.png';
import DISCUSS from '../../assets/discuss.png';
import DISOVER from '../../assets/discover.png';
import MARKETPLACE from '../../assets/marketplace.png';
import DISCUSS_ACTIVE from '../../assets/discuss_active.png';
import DISOVER_ACTIVE from '../../assets/discover_active.png';
import MARKETPLACE_ACTIVE from '../../assets/marketplace_active.png';
import LOGO_V2 from '../../assets/logo_v2.png';
import { spacing } from '../../constants/styles';
import { connect } from '../../state/reduxStore';
// import BUYERAI from '../../assets/buyerai.png';

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

function RawHomeNavBar(props){

  const layout = useWindowDimensions();

  const {navigation, hasTabs = true, apiCallResult} = props;
  console.log("APIW", props)

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

  const handleNavigateHomePress = () => {
    navigation.navigate(RouteNames.DISCUSS_HOME)
  }

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateHomePress} style={{paddingTop: 10, paddingBottom: 10, borderColor: 'green', borderWidthX: 1}}>
          <Image source={LOGO_V2} style={styles.title}/>
          {/* <Image source={REALTALKTECH_WHITE} style={styles.title}/> */}
        </TouchableOpacity>
          {hasTabs && (<View style={styles.topBar}>
            {
              tabs.map(tab => {
                return (
                  <Button image={tab.routeName === currentRouteName ? tab.iconActive : tab.icon} title={tab.title} onPress={() => handleTabPress(tab)} styles={styles.tabButton} imageSize={12} imageWidthRatio={1.1} type={tab.routeName === currentRouteName ? ButtonType.LOUD : ButtonType.BASIC}/>
                );
              })
            }
          </View>)}
        <View style={styles.rightButtons}>
          <Button image={RouteNames.PROFILE_WELCOME === currentRouteName ? NOTIFICATIONS_ACTIVE : NOTIFICATIONS} onPress={handleAddProfilePress} styles={styles.tabButton} type={RouteNames.PROFILE_WELCOME === currentRouteName ? ButtonType.LOUD : ButtonType.BASIC} />
          <Button image={RouteNames.PROFILE_USER === currentRouteName ? SETTINGS_ACTIVE : SETTINGS} imageWidthRatio={1.2} onPress={handleViewProfilePress} styles={styles.tabButton} type={RouteNames.PROFILE_USER === currentRouteName ? ButtonType.LOUD : ButtonType.BASIC} />
        </View>
      </View>
    </View>
  )
}
const stp = (state) => ({
  apiCallResult: state.apiCallResult
})
const dtp = (dispatch) => ({
});
export const HomeNavBar = connect(stp, dtp)(RawHomeNavBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'red',
    borderWidthX: 1
  },
  title: {
    width: spacing.sideWidth,
    height: spacing.navHeight,
    // width: 192,
    // height: 18,
    // width: 192,
    // height: 42,
    // width: 128,
    // height: 28,
    borderColor: 'yellow',
    borderWidthX: 1
  },
  rightButtons: {
    flexDirection: 'row',
    width: spacing.sideWidth,
    // width: 192,
    // width: 128,
    justifyContent: 'flex-end',
    borderColor: 'green',
    borderWidthX: 1
  },
  body: {
    marginLeft: 32,
    borderWidthX: 1,
    borderColor: 'red'
  },
  topBar: {
    // width: 256,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidthX: 1,
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
    borderColorX: 'red',
    borderWidthX: 1,
  },
  content: {
    borderWidthX: 1,
    borderColor: 'lightGray'
  },
  sideBar: {
    borderWidthX: 1,
    borderColor: 'blue'
  },
  categories: {
    marginTop: 32,
    borderWidthX: 1,
    borderColor: 'yellow'
  },
});
