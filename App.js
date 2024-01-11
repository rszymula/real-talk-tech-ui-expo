import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Root } from './src/Root';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! 22</Text>
      <StatusBar style="auto" />
      {/* <NavigationContainer>
        <Tab.NavigationContainer>
          <Tab.Screen 
            name=
          />
        </Tab.NavigationContainer>
      </NavigationContainer> */}
      <Root />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
