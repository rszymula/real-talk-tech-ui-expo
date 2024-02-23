import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
// import { DiscussPost}
import { BuyerAIHome } from './screens/buyerai/BuyerAIHome';
import { colors } from './context/themes';
import { CategoryNames, RouteNames, categories } from './constants/constants';
import { ButtonType, buttonTypetoStyle, Button } from './components/core/Button';
import { ProfileCreateHome } from './screens/user/ProfileCreateHome';
import { ProfileQuestion } from './screens/user/ProfileQuestion';
import { DiscoverVendorDetails } from './screens/discover/DiscoverVendorDetails';
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
import { AlternateNavBar } from './components/common/AlternateNavBar';
import { spacing } from './constants/styles';
import { DiscussPostDetail } from './screens/discuss/DiscussPostDetail';

export const routes = [
  {
    name: RouteNames.PROFILE_WELCOME,
    component: ProfileWelcome,
  },
  {
    name: RouteNames.DISCUSS_HOME,
    component: navBarProvider(DiscussHome, true),
  },
  {
    name: RouteNames.DISCUSS_POST_DETAIL,
    component: navBarProvider(DiscussPostDetail, true),
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
    name: RouteNames.DISCOVER_VENDOR_DETAILS,
    component: navBarProvider(DiscoverVendorDetails),
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
    name: RouteNames.PROFILE_LOGIN,
    component: ProfileLogin,
  },
  {
    name: RouteNames.PROFILE_CREATE_HOME,
    component: alternateNavBarProvider(ProfileCreateHome),
  },
  {
    name: RouteNames.PROFILE_QUESTION,
    component: alternateNavBarProvider(ProfileQuestion),
  },
  {
    name: RouteNames.PROFILE_CONTACT_US,
    component: navBarProvider(ProfileContactUs),
  },
]

const Stack = createNativeStackNavigator();

function Categories({currentCategory, handleCategoryPress}){
  return (
    <View>
      <Text style={styles.title}>CATEGORIES</Text>
      <View>
        {categories.map(category => {
          // return <Button
          //   title={category.name}
          //   onPress={() => handleCategoryPress(category.name)}
          //   type={ButtonType.BARE}
          //   styles={category.name === currentCategory ? {color: colors.textHighlight} : {}}
          // />
          const activeStyle = category.name === currentCategory ? {color: colors.textHighlight} : {color: colors.textRegular}
          return (
            <TouchableOpacity
              onPress={() => handleCategoryPress(category.name)}
            >
              <Text
                style={[{fontSize: 12, paddingTop: 4}, activeStyle]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          )
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

  return (
    <View style={{
      marginTop: 16,
      borderWidthX: 1,
      borderColor: 'red',
      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <View style={{
        flexDirection: 'column',
        // width: 192,
        width: spacing.sideWidth,
        // width: 128,
        borderWidthX: 1, 
        borderColor: 'yellow'
      }}>
        {props.hasCategories ? (
          <Categories currentCategory={currentCategory} handleCategoryPress={handleCategoryPress} />
          ) : <></>
        }
      </View>
      <View style={{paddingLeft: 32, paddingRight: 32, flex: 1, maxWidth: 768}}>
        <props.Component {...props} currentCategory={currentCategory} />
      </View>
      <View style={{
        // width: 192,
        width: spacing.sideWidth,
        // width: 128,
        borderWidthX: 1,
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

// function navBarProvider(Component, hasCategories = false, hasTabs = true){
//   // const ComponentWithBottomBar = bottomBarProvider(Component)
//   const stp = (state) => ({
//     apiCallResult: state.apiCallResult
//   })
//   const dtp = (dispatch) => ({
//   })
//   const ComponentWithSideBar = sideBarProvider(Component, hasCategories)
//   return (props) => {
//     const Raw = ({apiCallResult}) => {
//       <View style={styles.rootContainer}>
//         {apiCallResult.active && <Text>{apiCallResult.message}</Text>}
//         <HomeNavBar {...props} hasTabs={hasTabs} />
//         {/* <ScrollView style={styles.container}>
//           <ComponentWithSideBar {...props} />
//         </ScrollView> */}
//         <View style={styles.container}>
//           <ComponentWithSideBar {...props} />
//         </View>
//         <HomeBottomBar {...props} />
//       </View>
//     }
//     return connect(stp, dtp)(Raw)
//   }
// }

function alternateNavBarProvider(Component){
  return (props) => {
    return (
      <View style={styles.rootContainer}>
        <AlternateNavBar {...props} />
        <View style={styles.container}>
          <Component {...props} />
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
      {/* <Text style={{position: 'absolute', bottom: 20, right: 0, color: colors.textRegular}}>{"LKSDJF"}</Text> */}
    </View>
  );
}


function navBarProvider(Component, hasCategories = false, hasTabs = true){
  // const ComponentWithBottomBar = bottomBarProvider(Component)
  const ComponentWithSideBar = sideBarProvider(Component, hasCategories)
  const stp = (state) => ({
    apiCallResult: state.apiCallResult
  })
  const dtp = (dispatch) => ({
    dispatch: dispatch
  })
  return connect(stp, dtp)((props) => {
    if(props.apiCallResult?.active){
      setTimeout(() => {
        props.dispatch({type: "API_CALL_RESULT", payload: {...props.apiCallResult, active: !props.apiCallResult.active}})
      }, 4000)
    }
    return (
      <>
        {props.apiCallResult?.active && (
        <View style={{backgroundColor: colors.link}}>
          <Text style={{margin: 8, alignSelf: 'center', backgroundColor: colors.link, fontSize: 12, color: colors.textLowlight}}>{props.apiCallResult.message}</Text>
        </View>
      )}
      <View style={styles.rootContainer}>
        <HomeNavBar {...props} hasTabs={hasTabs} />
        {/* <ScrollView style={styles.container}>
          <ComponentWithSideBar {...props} />
        </ScrollView> */}
        <View style={styles.container}>
          <ComponentWithSideBar {...props} />
        </View>
        <HomeBottomBar {...props} />
      </View>
      </>
    )
  })
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: colors.background,
    padding: 32,
    // height: 1024,
    borderColor: 'purple',
    borderWidthX: 1,
  },
  container: {
    // minHeight: 512,
  },
  sidebar: {
    // marginLeft: 192,
    // marginLeft: 128,
    marginLeft: spacing.sideWidth,
  },
  title: {
    ...buttonTypetoStyle[ButtonType.BARE],
    fontSize: 12,
    paddingTop: 0,
  }
})
