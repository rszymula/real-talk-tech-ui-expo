import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { Card } from '../../components/core/Card';
import { Separator } from '../../components/core/Separator';
import { RouteNames } from '../../constants/constants';
import { colors } from '../../context/themes';
// import { getCompanies } from '../services/DiscoverService';
import { store } from '../../state/basicStore';
import { GridView } from '../../components/common/GridView';


export function DiscoverHome(props){

  const { navigation } = props;

  const { getCompanies } = store;
  const companies = getCompanies(0, 15);

  const handleOnPress = (item) => {
    navigation.navigate(RouteNames.DISCOVER_LIST, {type: item.type});
  }

  return (
    <View style={styles.container}>
    {/* <View style={{justifyContent: 'flex-end'}}> */}
      <View style={{width: 512, alignItems: 'center'}}>
        <Text style={styles.title}>
          Explore the market
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8}}>
          A long description
        </Text>
        <View style={{marginBottom: 32, width: 512}}>
          <GridView data={companies} onPress={(item) => handleOnPress(item)} navigation={navigation} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    color: colors.textHighlight,
    fontSize: 18,
  }
});
