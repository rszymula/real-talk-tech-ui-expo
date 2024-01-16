import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screens } from './constants';
import { BuyerAIHomeScreen } from './screens/buyerai/BuyerAIHomeScreen';
import { BuyerAIStage1 } from './screens/buyerai/BuyerAIStage1';
import REALTALKTECH from '../assets/titleDefault.png';
import REALTALKTECH_WHITE from '../assets/titleWhite.png';
import FAV from '../assets/favicon.png';

const Tab = createBottomTabNavigator();

export function Root(){
  return (
    <>
      <NavigationContainer>
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
      </NavigationContainer>
      {/* <BuyerAIHomeScreen />
      <BuyerAIStage1 /> */}
      <Text>sdfkj</Text>
      {/* <Image source={REALTALKTECH} style={{paddingTop: 20, paddingBottom: 20, margin: 20,width: 200, height: 200}}/>
      {/* <Image source={FAV} height={50} width={200} style={{marginLeft: 200,width: 200, height: 200}}/> */}
      {/* <Image source={FAV} style={{width: 200, height: 200}}/>
      <Image source={REALTALKTECH} style={{width: 200, height: 20}}/>
      <Image source={REALTALKTECH_WHITE} style={{width: 200, height: 20}}/> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // borderColor: 'red',
    // borderWidth: 2,
  }
})