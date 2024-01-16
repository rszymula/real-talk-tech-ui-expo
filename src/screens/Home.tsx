import React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { colors } from '../context/themes';
import { DiscussHomeScreen } from './discuss/DiscussHomeScreen';
import { Discover } from './discover';
import { CategoryNames, categories } from '../constants';
import { Button, ButtonType, buttonTypetoStyle } from '../common/Button';
import REALTALKTECH from '../../assets/title.png';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: colors.foreground }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: colors.foreground }} />
);

const tabs = [
  {
    key: "Discuss",
    title: "Discuss",
    // component: DiscussHomeScreen,
  },
  {
    key: "Discuss",
    title: "Discover",
    // component: Discover,
  },
]

export function Home(props){

  const [currentCategory, setCurrentCategory] = React.useState(CategoryNames.HOME);

  const layout = useWindowDimensions();

  const {navigation} = props;

  const handleTabPress = (tab) => {
    navigation.navigate(tab.key)
  }

  const handleCategoryPress = (category: CategoryNames) => {
    setCurrentCategory(category);
  }

  return (
    <View style={styles.container}>
      <View style={styles.sideBar}>
        <Image style={styles.title} source={REALTALKTECH} width={200} height={50}/>
        <View style={styles.categories}>
          <Text style={{...buttonTypetoStyle[ButtonType.BARE], fontSize: 12}}>CATEGORIES</Text>
          <View style={{marginTop: 8}}>
            {categories.map(category => {
              return <Button
                title={category.name}
                onPress={() => handleCategoryPress(category.name)}
                type={ButtonType.BARE}
                styles={category.name === currentCategory ? {color: colors.textHighlight} : {}}
              />
            })}
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.topBar}>
            {
              tabs.map(tab => {
                return (
                  // <Text style={styles.tabButton}>{tab.title}</Text>
                  <Button title={tab.title} onPress={() => handleTabPress(tab)} styles={styles.tabButton}/>
                );
              })
            }
          </View>
        </View>
        <View style={styles.content}>
          <Text>lksdjfksdjflsdklfjsdlkfjsldkfjdslkfjlsdkjfldskjflsdkjflsdkjflsdkfjdlsk</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    padding: 32,
    borderWidth: 1,
    borderColor: 'purple'
  },
  title: {
    // paddingTop: 8,
    // paddingBottom: 8,
    padding: 16,
    // borderWidth: 1,
    // borderColor: 'green'
  },
  body: {
    // flexDirection: 'row',
    marginLeft: 32,
    borderWidth: 1,
    borderColor: 'red'
  },
  topBar: {
    flexDirection: 'row',
    // marginLeft: 4,
    // marginRight: 4,
    // alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'orange'
  },
  tabButton: {
    marginLeft: 4,
    marginRight: 4,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 2,
  },
  content: {
    borderWidth: 1,
    borderColor: 'lightGray'
  },
  sideBar: {
    borderWidth: 1,
    borderColor: 'blue'
  },
  categories: {
    borderWidth: 1,
    borderColor: 'yellow'
  },
});