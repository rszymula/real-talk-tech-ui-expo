import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Root } from './src/Root';
import { TestRoot } from './src/TestRoot';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Root />
      {/* <TestRoot /> */}
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
