import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BuyerAIHomeScreen } from './BuyerAIHomeScreen';

const BuyerAIStack = createNativeStackNavigator();

export enum BuyerAIRouteNames {
  HOME = 'Home',
}

const discussRoutes = [
  {
    name: BuyerAIRouteNames.HOME,
    component: BuyerAIHomeScreen,
  },
]

export function BuyerAIStackStackScreen(){
  return (
    <BuyerAIStack.Navigator screenOptions={{headerShown: false}}>
      {discussRoutes.map(item => <BuyerAIStack.Screen 
        name={item.name}
        component={item.component}
      />)}
    </BuyerAIStack.Navigator>
  )
}
