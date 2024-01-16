import React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function NavHeader({navigation}){

  const handlePressDiscuss = () => {
    navigation.navigate("TestDiscuss")
  }

  const handlePressDiscover = () => {
    navigation.navigate("TestDiscover")
  }
  
  return (
    <View style={{flexDirection: 'row'}}>
      <Text>Title</Text>
      <Button title="Discuss" onPress={handlePressDiscuss} />
      <Button title="Discover" onPress={handlePressDiscover} />
    </View>
  )
}

function TestDiscuss({navigation}){
  return (
    <View>
      {/* <NavHeader navigation={navigation} /> */}
      <Text>Discuss</Text>
    </View>
  )
}

function TestDiscover({navigation}){
  return (
    <View>
      {/* <NavHeader navigation={navigation} /> */}
      <Text>Discover</Text>
    </View>
  )
}

function navBarProvider(Component){
  return ({navigation}) => {
    return (
      <>
        <NavHeader navigation={navigation} />
        <Component navigation={navigation} />
      </>
    )
  }
}

export const routes = [
  {
    name: "TestDiscuss",
    component: navBarProvider(TestDiscuss),
  },
  {
    name: "TestDiscover",
    component: navBarProvider(TestDiscover),
  },
  // {
  //   name: "DiscussCreatePost",
  //   component: DiscussCreatePost,
  // },
  // {
  //   name: "BuyerAIMessenger",
  //   component: BuyerAIMessenger,
  // },
  // {
  //   name: "BuyerAIFollowup",
  //   component: BuyerAIFollowup,
  // }
]

export function TestRoot(){

  const [tab, setTab] = React.useState("Discuss")

  const handlePressDiscuss = () => {
    setTab("Discuss")
  }

  const handlePressDiscover = () => {
    setTab("Discover")
  }

  return (
    <>
      {/* <View style={{flexDirection: 'row'}}>
        <Text>Title</Text>
        <Button title="Discuss" onPress={handlePressDiscuss} />
        <Button title="Discover" onPress={handlePressDiscover} />
      </View> */}
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
  container: {
    width: "100%",
  }
})
