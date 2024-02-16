import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { HomeNavBar } from './components/common/HomeNavBar';
import { BuyerAIFollowup } from './screens/buyerai/BuyerAIFollowup';
import { BuyerAIMessenger } from './screens/buyerai/BuyerAIMessenger';
import { DiscoverHome } from './screens/discover/DiscoverHome';
import { DiscussCreatePost } from './screens/discuss/DiscussCreatePost';
import { DiscussHome } from './screens/discuss/DiscussHome';
import { BuyerAIHome } from './screens/buyerai/BuyerAIHome';
import { colors } from './context/themes';
import { CategoryNames, RouteNames, categories } from './constants/constants';
import { ButtonType, buttonTypetoStyle, Button } from './components/core/Button';
import { ProfileCreateHome } from './screens/user/ProfileCreateHome';
import { ProfileQuestion } from './screens/user/ProfileQuestion';
import { DiscoverCompanyProfile } from './screens/discover/DiscoverCompanyProfile';
import { ReduxContext, connect, createStore, reducer } from './state/reduxStore';
import { DiscoverList } from './screens/discover/DiscoverList';
import { ProfileUser } from './screens/user/ProfileUser';
import { ProfileUserOther } from './screens/user/ProfileUserOther';
import { ProfileWelcome } from './screens/user/ProfileWelcome';
import { ProfileLogin } from './screens/user/ProfileLogin';
import { MarketplaceHome } from './screens/marketplace/MarketplaceHome';
import { Link } from './components/core/Link';
import { HomeBottomBar } from './components/common/HomeBottomBar';
import { ProfileContactUs } from './screens/user/ProfileContactUs';

export const routes = [
  {
    name: RouteNames.DISCUSS_HOME,
    component: navBarProvider(DiscussHome, true),
  },
  {
    name: RouteNames.DISCUSS_CREATE_POST,
    component: navBarProvider(DiscussCreatePost, false, false),
  },
  {
    name: RouteNames.DISCOVER_HOME,
    component: navBarProvider(DiscoverHome),
  },
  {
    name: RouteNames.DISCOVER_LIST,
    component: navBarProvider(DiscoverList),
  },
  {
    name: RouteNames.DISCOVER_COMPANY_PROFILE,
    component: navBarProvider(DiscoverCompanyProfile),
  },
  {
    name: RouteNames.MARKETPLACE_HOME,
    component: navBarProvider(MarketplaceHome),
  },
  {
    name: RouteNames.BUYER_AI_HOME,
    component: navBarProvider(BuyerAIHome),
  },
  {
    name: RouteNames.BUYER_AI_MESSENGER,
    component: navBarProvider(BuyerAIMessenger),
  },
  {
    name: RouteNames.BUYER_AI_FOLLOWUP,
    component: navBarProvider(BuyerAIFollowup),
  },
  {
    name: RouteNames.PROFILE_USER,
    component: navBarProvider(ProfileUser),
  },
  {
    name: RouteNames.PROFILE_USER_OTHER,
    component: navBarProvider(ProfileUserOther),
  },
  {
    name: RouteNames.PROFILE_WELCOME,
    component: ProfileWelcome,
  },
  {
    name: RouteNames.PROFILE_LOGIN,
    component: ProfileLogin,
  },
  {
    name: RouteNames.PROFILE_CREATE_HOME,
    component: ProfileCreateHome,
  },
  {
    name: RouteNames.PROFILE_QUESTION,
    component: ProfileQuestion,
  },
  {
    name: RouteNames.PROFILE_CONTACT_US,
    component: ProfileContactUs,
  },
]

const Stack = createNativeStackNavigator();

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

function SideBar(props){

  const [currentCategory, setCurrentCategory] = React.useState<CategoryNames>(CategoryNames.HOME);

  const handleCategoryPress = (categoryInput: CategoryNames) => {
    setCurrentCategory(categoryInput);
  }

  // if(hasCategories){
  //   return (
  //     <View style={{backgroundColor: colors.background, flexDirection: 'row'}}>
  //       <View style={{flexDirection: 'column', width: 256}}>
  //         <Text style={styles.title}>CATEGORIES</Text>
  //         <Categories currentCategory={currentCategory} handleCategoryPress={handleCategoryPress} />
  //       </View>
  //       <Component navigation={navigation} currentCategory={currentCategory} />
  //     </View>
  //   )
  // }else{
  //   return (
  //     <View style={{backgroundColor: colors.background}}>
  //       <View style={styles.sidebar}>
  //         <Component navigation={navigation} />
  //       </View>
  //     </View>
  //   )
  // }
  return (
    <View style={{
      marginTop: 16,
      // borderWidth: 1,
      borderColor: 'red',
      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <View style={{
        flexDirection: 'column',
        width: 192,
        // borderWidth: 1, 
        borderColor: 'yellow'
      }}>
        {props.hasCategories ? (
          <Categories currentCategory={currentCategory} handleCategoryPress={handleCategoryPress} />
          ) : <></>
        }
      </View>
      <props.Component {...props} currentCategory={currentCategory} />
      <View style={{
        width: 32,
        // borderWidth: 1,
        borderColor: 'yellow'
      }}></View>
    </View>
  )
}

function bottomBarProvider(Component){
  return (props) => {
    return (
      <HomeBottomBar {...props} Component={Component}/>
    )
  }
}

function sideBarProvider(Component, hasCategories = false){
  return (props) => {
    return (
      <SideBar {...props} Component={Component} hasCategories={hasCategories}/>
    )
  }
}

function navBarProvider(Component, hasCategories = false, hasTabs = true){
  const ComponentWithBottomBar = bottomBarProvider(Component)
  const ComponentWithSideBar = sideBarProvider(ComponentWithBottomBar, hasCategories)
  return (props) => {
    return (
      <View style={styles.rootContainer}>
        <HomeNavBar {...props} hasTabs={hasTabs} />
        <View style={styles.container}>
          <ComponentWithSideBar {...props} />
        </View>
      </View>
    )
  }
}

export function Root(){
  const store = createStore(reducer);
  return (
    <View style={{backgroundColor: colors.background}}>
      <ReduxContext.Provider value={store}>
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
      </ReduxContext.Provider>
    </View>
  );
}

// export function B(props){
//   return (
//     <>
//       <Text>B1</Text>
//       <Text>{props.thing}</Text>
//       <Button onPress={() => props.inc()} title="inc" />
//       <Text>B2</Text>
//     </>
//   )
// }
// const mapStateToProps = function(state){
//   return ({
//     thing: state.count,
//   })
// }
// const mapDispatchToProps = function(dispatch){
//   return ({
//     inc: () => dispatch({type: "INCREMENT"})
//   })
// }
// const BR = connect(mapStateToProps, mapDispatchToProps)(B)

// export function A(props){
//   return (
//     <>
//       <Text>A1</Text>
//       <BR/>
//       <Text>A2</Text>
//     </>
//   )
// }

// export function Root2(){
//   const store = createStore(reducer);
//   return (
//     <>
//       <ReduxContext.Provider value={store}>
//         <A/>
//       </ReduxContext.Provider>
//     </>
//   );
// }

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: colors.background,
    padding: 32,
    // height: "100%",
    // borderWidth: 1,
    borderColor: 'purple',
  },
  container: {
    // backgroundColor: colors.background,
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // margin: 32,
  },
  sidebar: {
    marginLeft: 256,
  },
  title: {
    ...buttonTypetoStyle[ButtonType.BARE],
    fontSize: 12,
  }
})
