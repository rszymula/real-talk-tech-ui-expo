import { Text, View, Button, StyleSheet } from 'react-native';
import { CategoryNames, categories } from '../../../constants';

export function DiscussNavBar(props){

  console.log("Whatever")

  const { handleSetCurrentCategory } = props;

  const handleCategoryPress = (category: CategoryNames) => {
    console.log('pressed', category)
    handleSetCurrentCategory(category);
  }


  return (
    <View style={styles.container}>
      <Text>DiscussNavBar</Text>
      {categories.map(category => {
        return <Button
          title={category.name}
          onPress={() => handleCategoryPress(category.name)}
        />
      })}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: "30%",
    borderColor: 'red',
    borderWidth: 2,
    padding: 16,
  }
})
