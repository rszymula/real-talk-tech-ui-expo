import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { routes, screens } from './constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

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
  container: {
    width: "100%",
    // borderColor: 'red',
    // borderWidth: 2,
  }
})
