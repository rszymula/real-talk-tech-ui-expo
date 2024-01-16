import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BuyerAIHomeScreen } from './BuyerAIHomeScreen';
import { BuyerAIStage1 } from './BuyerAIStage1';
import { BuyerAIChat } from './BuyerAIChat';

const BuyerAIStack = createNativeStackNavigator();

export enum BuyerAIRouteNames {
  HOME = 'Home',
  FOLLOWUP = 'Followup',
  CHAT = 'Chat',
}

const discussRoutes = [
  {
    name: BuyerAIRouteNames.HOME,
    component: BuyerAIHomeScreen,
  },
  {
    name: BuyerAIRouteNames.FOLLOWUP,
    component: BuyerAIStage1,
  },
  {
    name: BuyerAIRouteNames.CHAT,
    component: BuyerAIChat,
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
