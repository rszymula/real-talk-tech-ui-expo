import React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { RouteNames, tabs } from '../../constants/constants';
import { Link } from '../core/Link';
import { colors } from '../../context/themes';

export function HomeBottomBarHOC(props){

  const {navigation, Component} = props;

  return (
    <View style={{flexDirection: 'column', borderColor: 'green', borderWidthX: 1, backgroundColor: colors.background, marginBottom: 32}}>
      <Component {...props} />
      <View style={styles.container}>
        <View style={styles.links}>
          {tabs.map(tab => <Link textLink={tab.title} onPress={() => {navigation.navigate(tab.routeName)}} style={styles.link} />)}
          <Link textLink={"Contact Us"} onPress={() => {navigation.navigate(RouteNames.PROFILE_CONTACT_US)}} style={styles.link} />
        </View>
        <Text style={{fontSize: 12, color: colors.textRegular, alignSelf: 'center'}}>{`@Realtalk ${new Date().getFullYear()}`}</Text>
      </View>
    </View>
  )
}

export function HomeBottomBar(props){

  const {navigation} = props;
  const [isActive, setIsActive] = React.useState(false);

  return (
    <>
      <View style={{flexDirection: 'column', borderColor: 'green', borderWidthX: 1, backgroundColor: colors.background, marginBottom: 32}}>
        <View style={styles.container}>
          <View style={styles.links}>
            {tabs.map(tab => <Link textLink={tab.title} onPress={() => {navigation.navigate(tab.routeName)}} style={styles.link} />)}
            <TouchableOpacity onPress={() => navigation.navigate(RouteNames.PROFILE_CONTACT_US)} onLongPress={() => setIsActive(isActive => !isActive)} style={styles.link}>
              <Text style={styles.contactUs}>{"Contact Us"}</Text>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 12, color: colors.textRegular, alignSelf: 'center'}}>{`@Realtalk ${new Date().getFullYear()}`}</Text>{isActive && <Text style={{alignSelf: 'center', marginTop: 128, color: '#888888', fontSize: 8}}>{"App developed by RadekTech www.radektech.io"}</Text>}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
    // marginBotton: 16,
  },
  links: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    borderColor: 'red',
    borderWidthX: 1,
    marginTop: 16,
    // marginLeft: 64,
    // marginRight: 64,
  },
  link: {
    margin: 8,
  },
  contactUs: {
    color: colors.link,
    fontSize: 12,
  },
});
