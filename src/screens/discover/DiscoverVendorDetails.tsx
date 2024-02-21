import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { Card } from '../../components/core/Card';
import { Separator } from '../../components/core/Separator';
import { RouteNames } from '../../constants/constants';
import { colors } from '../../context/themes';
// import { getCompanies, getCompany } from '../services/DiscoverService';
import { store } from '../../state/basicStore';
import { ListItem } from '../../components/common/ListItem';
import { fetchVendorDetails } from '../../services/DiscoverService';
import { connect } from '../../state/reduxStore';
import { Heading } from '../../components/common/Heading';


function VendorDetail(props){
  const { vendorName, vendorType, description} = props;

  return (
      <ListItem
        heading={vendorName}
        subheading={vendorType}
        body={description}
      />
  );
}

function SingleView({selected, navigation}){

  const handleBackPress = () => {
    navigation.goBack();
  }

  const {description, localEmployees, totalEmployees, totalOffices, vendorHomepageUrl, vendorHq, vendorLogoUrl, vendorName, vendorType} = selected;

  return (
    <View style={{margin: 16}}>
      <VendorDetail {...selected} style={{margin: 16}} />
      <Separator />,
      <Text style={{color: colors.textHighlight, fontSize: 12, marginTop: 4}}>{`HQ: ${vendorHq}`}</Text>
      <Text style={{color: colors.textRegular, fontSize: 12, marginTop: 8}}>{`Total Offices: ${totalOffices}`}</Text>
      <Text style={{color: colors.textLowlight, fontSize: 10, marginTop: 4}}>{`Local Employees : ${localEmployees}`}</Text>
      <Text style={{color: colors.textLowlight, fontSize: 10}}>{`Total Employees: ${totalEmployees}`}</Text>
      {/* <Separator style={{marginTop: 16, marginBottom: 8}} /> */}
      {/* <Button
        title={"Back"}
        onPress={handleBackPress}
        type={ButtonType.BASIC}
        styles={{color: colors.textLowlight, marginTop: 8 }}
      /> */}
    </View>
  )
}

function RawDiscoverVendorDetails(props){

  const { vendors, fetchVendorDetails, navigation, route } = props;
  const { vendorId } = route?.params;

  const vendor = vendors[vendorId];

  console.log("VINDORSINGLEW", vendor)

  // const { getCompany } = store;
  // const company = getCompany(companyId);

  React.useEffect(() => {
    fetchVendorDetails(vendorId);
  }, [])

  return (
    <View style={styles.container}>
       <Heading navigation={navigation}>
        <View>
          <Text style={styles.title}>
            Explore the market
          </Text>
          {/* <Text style={{color: colors.textLowlight, margin: 8, alignSelf: 'center'}}>
            A long description
          </Text> */}
        </View>
      </Heading>
      <Card styles={{marginBottom: 32}}>
        <SingleView selected={vendor} navigation={navigation} />
      </Card>
    </View>
  )
}
const stp = (state) => ({
  vendors: state.vendors,
})
const dtp = (dispatch, getState) => ({
  fetchVendorDetails: fetchVendorDetails(dispatch, getState),
})
export const DiscoverVendorDetails = connect(stp, dtp)(RawDiscoverVendorDetails);

const styles = StyleSheet.create({
  container: {
  },
  title: {
    color: colors.textHighlight,
    fontSize: 18,
    alignSelf: 'center',
  }
});
