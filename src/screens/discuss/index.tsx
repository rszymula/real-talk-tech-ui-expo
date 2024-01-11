import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DiscussHomeScreen } from './DiscussHomeScreen/index';
import { CreatePostScreen } from './CreatePostScreen';

const DiscussStack = createNativeStackNavigator();

export enum DiscussRouteNames {
  HOME = 'Home',
  CREATE_POST = 'CreatePost',
}

const discussRoutes = [
  {
    name: DiscussRouteNames.HOME,
    component: DiscussHomeScreen,
  },
  {
    name: DiscussRouteNames.CREATE_POST,
    component: CreatePostScreen,
  },
]

export function DiscussStackScreen(){
  return (
    <DiscussStack.Navigator screenOptions={{headerShown: false}}>
      {discussRoutes.map(item => <DiscussStack.Screen 
        name={item.name}
        component={item.component}
      />)}
    </DiscussStack.Navigator>
  )
}
