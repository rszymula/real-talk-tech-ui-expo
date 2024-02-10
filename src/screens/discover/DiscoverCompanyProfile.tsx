import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../../core/Button';
import { Card } from '../../core/Card';
import { Separator } from '../../core/Separator';
import { RouteNames } from '../../constants';
import { colors } from '../../context/themes';
// import { getCompanies, getCompany } from '../services/DiscoverService';
import { store } from '../../store/basicStore';
import { ListItem } from '../../common/ListItem';


function CompanyDetail(props){
  const { name, type, description} = props;

  return (
      <ListItem
        heading={name}
        subheading={type}
        body={description}
      />
  );
}

function SingleView({selected, navigation}){

  const handleBackPress = () => {
    navigation.goBack();
  }

  return (
    <View style={{margin: 16}}>
      <CompanyDetail {...selected} style={{margin: 16}} />
      <Separator />,
      <Text style={{color: colors.textHighlight, fontSize: 12, marginTop: 4}}>{`HQ: `}</Text>
      <Text style={{color: colors.textRegular, fontSize: 12, marginTop: 8}}>{`Total Offices: ${selected.offices}`}</Text>
      <Text style={{color: colors.textLowlight, fontSize: 10, marginTop: 4}}>{`Local Employees : ${selected.localEmployees}`}</Text>
      <Text style={{color: colors.textLowlight, fontSize: 10}}>{`Total Employees: ${selected.totalEmployees}`}</Text>
      <Separator style={{marginTop: 16, marginBottom: 8}} />
      <Button
        title={"Back"}
        onPress={handleBackPress}
        type={ButtonType.BASIC}
        styles={{color: colors.textLowlight, marginTop: 8 }}
      />
    </View>
  )
}

export function DiscoverCompanyProfile(props){

  const { navigation, route } = props;
  const { companyId } = route?.params;

  const { getCompany } = store;
  const company = getCompany(companyId);

  return (
    <View style={styles.container}>
      <View style={{width: 512, alignItems: 'center'}}>
        <Text style={styles.title}>
          Explore the market
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8,}}>
          A long description
        </Text>
        <Card styles={{marginBottom: 32, width: 512}}>
          <SingleView selected={company} navigation={navigation} />
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
