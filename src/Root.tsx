import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeNavBar } from './common/HomeNavBar';
import { BuyerAIFollowup } from './screens/BuyerAIFollowup';
import { BuyerAIMessenger } from './screens/BuyerAIMessenger';
import { DiscoverHome } from './screens/DiscoverHome';
import { DiscussCreatePost } from './screens/DiscussCreatePost';
import { DiscussHome } from './screens/DiscussHome';
import { BuyerAIHome } from './screens/BuyerAIHome';
import { colors } from './context/themes';

const Stack = createNativeStackNavigator();

function sideBarProvider(Component){
  return (props) => {
    return (
      <View style={{backgroundColor: colors.background}}>
        <View style={styles.sidebar}>
          <Component {...props} />
        </View>
      </View>
    )
  }
}

function navBarProvider(Component){
  const ComponentWithSideBar = sideBarProvider(Component)
  return ({navigation}) => {
    return (
      <>
        <HomeNavBar navigation={navigation} />
        <View style={styles.container}>
          <ComponentWithSideBar navigation={navigation} />
        </View>
      </>
    )
  }
}

export const routes = [
  {
    name: "DiscussHome",
    component: navBarProvider(DiscussHome),
  },
  {
    name: "DiscoverHome",
    component: navBarProvider(DiscoverHome),
  },
  {
    name: "DiscussCreatePost",
    component: sideBarProvider(DiscussCreatePost),
  },
  {
    name: "BuyerAIHome",
    component: navBarProvider(BuyerAIHome),
  },
  {
    name: "BuyerAIMessenger",
    component: navBarProvider(BuyerAIMessenger),
  },
  {
    name: "BuyerAIFollowup",
    component: navBarProvider(BuyerAIFollowup),
  }
]

export function Root(){
  return (
    <>
      {/* <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            {
              screens.map(screen => {
                return (
                  <Tab.Screen
                    name={screen.name}
                    component={screen.component}
                  />
                );
              })
            }
          </Tab.Navigator>
      </NavigationContainer> */}

      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {
            routes.map(route => {
              return (
                <Stack.Screen name={route.name} component={route.component} />
              )
            })
          }
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   width: "100%",
  //   // borderColor: 'red',
  //   // borderWidth: 2,
  // }
  container: {
    backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'row',
    height: "100%",
  },
  sidebar: {
    marginLeft: 256,
  },
})
