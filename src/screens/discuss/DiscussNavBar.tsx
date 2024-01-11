import { Text, View, Button, StyleSheet } from 'react-native';

export function DiscussNavBar(){
  return (
    <View style={styles.container}>
      <Text>DiscussNavBar</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    // width: "100%",
    borderColor: 'red',
    borderWidth: 2,
  }
})
