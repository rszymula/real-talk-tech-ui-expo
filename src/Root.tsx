import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screens } from './constants';

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
      <Text>YY</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: 'red',
    borderWidth: 2,
  }
})