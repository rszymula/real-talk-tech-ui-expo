import { Text, View, Button, StyleSheet } from 'react-native';
import { DiscussNavBar } from './DiscussNavBar';
import { DiscussContent } from './DiscussContent';

export function Discuss(props){

  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>WHY</Text>
      {/* <DiscussNavBar/>
      <DiscussContent/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: 'red',
    borderWidth: 2,
    // display: 'flex',
    // flexDirection: 'column',
  }
})