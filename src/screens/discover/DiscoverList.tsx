import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { Card } from '../../components/core/Card';
import { Separator } from '../../components/core/Separator';
import { RouteNames } from '../../constants/constants';
import { colors } from '../../context/themes';
// import { getCompanies } from '../services/DiscoverService';
import { store } from '../../state/basicStore';
import { ListItem } from '../../components/common/ListItem';
import { Link } from '../../components/core/Link';

function Company(props){
  const { id, name, type, description, navigation} = props;

  const handleOnPress = () => {
    navigation.navigate(RouteNames.DISCOVER_COMPANY_PROFILE, {companyId: id})
  }

  return (
    <ListItem
      heading={name}
      subheading={type}
      body={description}
      buttonLabel="View Profile"
      onPress={handleOnPress}
    />
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

export function DiscoverList(props){

  const { navigation } = props;

  const { getCompanies } = store;
  const companies = getCompanies(0, 15);

  const handleCreateServiceProfilePress = () => {
    navigation.navigate(RouteNames.PROFILE_CONTACT_US)
  }

  return (
    <View style={styles.container}>
      <View style={{width: 512, alignItems: 'center'}}>
        <Text style={styles.title}>
          Top Sales Tools
        </Text>
        <Link style={{margin: 8}} textLeft="Don't see your company?" textLink="Create a service profile" onPress={handleCreateServiceProfilePress} />
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
