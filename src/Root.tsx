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
import { CategoryNames, categories } from './constants';
import { ButtonType, buttonTypetoStyle, Button } from './core/Button';

const Stack = createNativeStackNavigator();

function CategoriesX({navigation, Component}){

  const [currentCategory, setCurrentCategory] = React.useState<CategoryNames>(CategoryNames.HOME);

  const handleCategoryPress = (categoryInput: CategoryNames) => {
    setCurrentCategory(categoryInput);
  }

  return (
    <View style={{backgroundColor: colors.background, flexDirection: 'row'}}>
      <View style={{flexDirection: 'column', width: 256}}>
        <Text style={styles.title}>CATEGORIES</Text>
        <View>
          {categories.map(category => {
            return <Button
              title={category.name}
              onPress={() => handleCategoryPress(category.name)}
              type={ButtonType.BARE}
              styles={category.name === currentCategory ? {color: colors.textHighlight} : {}}
            />
          })}
        </View>
      </View>
      <Component navigation={navigation} currentCategory={currentCategory} />
    </View>
  )
}

function Categories({currentCategory, handleCategoryPress}){
  return (
    <View>
      <Text style={styles.title}>CATEGORIES</Text>
      <View>
        {categories.map(category => {
          return <Button
            title={category.name}
            onPress={() => handleCategoryPress(category.name)}
            type={ButtonType.BARE}
            styles={category.name === currentCategory ? {color: colors.textHighlight} : {}}
          />
        })}
      </View>
    </View>
  )
}

function SideBar({navigation, Component, hasCategories}){

  const [currentCategory, setCurrentCategory] = React.useState<CategoryNames>(CategoryNames.HOME);

  const handleCategoryPress = (categoryInput: CategoryNames) => {
    setCurrentCategory(categoryInput);
  }

  if(hasCategories){
    return (
      <View style={{backgroundColor: colors.background, flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', width: 256}}>
          <Text style={styles.title}>CATEGORIES</Text>
          <Categories currentCategory={currentCategory} handleCategoryPress={handleCategoryPress} />
        </View>
        <Component navigation={navigation} currentCategory={currentCategory} />
      </View>
    )
  }else{
    return (
      <View style={{backgroundColor: colors.background}}>
        <View style={styles.sidebar}>
          <Component navigation={navigation} />
        </View>
      </View>
    )
  }
}


function sideBarProvider(Component, hasCategories = false){
  return ({navigation}) => {
    return (
      <SideBar navigation={navigation} Component={Component} hasCategories={hasCategories}/>
    )
  }
}

function navBarProvider(Component, hasCategories = false){
  const ComponentWithSideBar = sideBarProvider(Component, hasCategories)
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
    component: navBarProvider(DiscussHome, true),
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
    backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'row',
    height: "100%",
  },
  sidebar: {
    marginLeft: 256,
  },
  title: {
    ...buttonTypetoStyle[ButtonType.BARE],
    fontSize: 12,
  }
})
