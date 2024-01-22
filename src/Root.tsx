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

function Categories({navigation, Component}){

  const [currentCategory, handleSetCurrentCategory] = React.useState<CategoryNames>(CategoryNames.HOME);

  const handleCategoryPress = (categoryInput: CategoryNames) => {
    console.log('pressed', categoryInput)
    handleSetCurrentCategory(categoryInput);
  }

  return (
    <View style={{backgroundColor: colors.background, flexDirection: 'row'}}>
      <View style={{flexDirection: 'column'}}>
        {categories.map(category => <Text style={{color: colors.textHighlight}}>{category.name}</Text>)}
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
      {/* <Component {...props} currentCategory={currentCategory} /> */}
      <Component navigation={navigation} currentCategory={currentCategory} />
      {/* {props.children({currentCategory})} */}
    </View>
  )
}


function useSideBarProvider(Component, hasCategories = false){

  return ({navigation}) => {
    if(hasCategories){
      return (
        // <Categories {...props} >
        //   <Component />
        // </Categories>
        <Categories navigation={navigation} Component={Component}/>
      )
    }
    return (
      <View style={{backgroundColor: colors.background}}>
        <View style={styles.sidebar}>
          <Component navigation={navigation} />
        </View>
      </View>
    )
  }
}

function navBarProvider(Component, hasCategories = false){
  const ComponentWithSideBar = useSideBarProvider(Component, hasCategories)
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
    component: useSideBarProvider(DiscussCreatePost),
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
  title: {
    ...buttonTypetoStyle[ButtonType.BARE],
    fontSize: 12,
  }
})
