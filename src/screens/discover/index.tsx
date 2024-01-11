import { Text, View, StyleSheet, Button } from 'react-native';
import { RouteNames } from '../../constants';

export function Discover(props){

  const { navigation } = props;

  const handleOnPress = () => {
    navigation.navigate(RouteNames.DISCUSS)
  }

  console.log("Rendering Discover")

  return (
    <View style={styles.container}>
      <Text>
        DISCOVER
      </Text>
      <Button title="n" onPress={handleOnPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: 'red',
    borderWidth: 2,
  }
})