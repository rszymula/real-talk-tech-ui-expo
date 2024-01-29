import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../core/Button';
import { Card } from '../core/Card';
import { Separator } from '../core/Separator';
import { RouteNames } from '../constants';
import { colors } from '../context/themes';
// import { getCompanies } from '../services/DiscoverService';
import { store } from '../store/basicStore';

function Company(props){
  const { id, name, type, description, navigation} = props;

  const handleOnPress = () => {
    navigation.navigate(RouteNames.DISCOVER_COMPANY_PROFILE, {companyId: id})
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flexDirection: 'column'}}>
        <Button
          title={""}
          onPress={() => {}}
          type={ButtonType.BASIC}
          styles={{height: 50, width: 100, border: 'none'}}
        />
        <Button
          title={"View Profile"}
          onPress={handleOnPress}
          type={ButtonType.BASIC}
          styles={{color: colors.textLowlight, marginTop: 8}}
        />
      </View>
      <View style={{flexDirection: 'column', marginLeft: 16}}>
        <Text style={{color: colors.textHighlight}}>{name}</Text>
        <Text style={{color: colors.textRegular, marginTop: 4}}>{type}</Text>
        <Text style={{color: colors.textLowlight, fontSize: 12, marginTop: 4}}>{description}</Text>
      </View>
    </View>
  );
}

function ListView({companies, navigation}){
  return(
    <SafeAreaView>
      <FlatList
        style={{backgroundColor: colors.foreground}}
        data={companies}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Company {...item} navigation={navigation} />}
        ItemSeparatorComponent={() => <Separator style={{marginTop: 16, marginBottom: 16}} />}
      />
    </SafeAreaView>
  )
}

export function DiscoverHome(props){

  const { navigation } = props;

  const { getCompanies } = store;
  const companies = getCompanies(0, 15);

  return (
    <View style={styles.container}>
    {/* <View style={{justifyContent: 'flex-end'}}> */}
      <View style={{width: 512, alignItems: 'center'}}>
        <Text style={styles.title}>
          Explore the market
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8,}}>
          A long description
        </Text>
        <Card styles={{marginBottom: 32, width: 512}}>
          <ListView companies={companies} navigation={navigation} />
        </Card>
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
