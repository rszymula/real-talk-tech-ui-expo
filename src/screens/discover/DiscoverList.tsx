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
import { fetchVendorsByGroup } from '../../services/DiscoverService';
import { connect } from '../../state/reduxStore';

function Vendor(props){
  const { id, vendorName, vendorType, description, vendorHomepageUrl, vendorLogoUrl, navigation} = props;

  console.log("NN22")

  const handleOnPress = () => {
    console.log("NVVINGW", id)
    navigation.navigate(RouteNames.DISCOVER_VENDOR_DETAILS, {vendorId: id})
  }

  return (
    <ListItem
      heading={vendorName}
      subheading={vendorType}
      body={description}
      buttonLabel="View Profile"
      onPress={handleOnPress}
    />
  );
}

function ListView({vendorList, navigation}){
  console.log("VENDORSLISTW", vendorList)
  return(
    <SafeAreaView>
      <FlatList
        style={{backgroundColor: colors.foreground}}
        data={vendorList}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Vendor {...item} navigation={navigation} />}
        ItemSeparatorComponent={() => <Separator style={{marginTop: 16, marginBottom: 16}} />}
      />
    </SafeAreaView>
  )
}

function RawDiscoverList(props){

  const { route, navigation, fetchVendorsByGroup, vendorGroups, vendors, auth } = props;
  const { vendorGroupId } = route?.params;

  console.log("PPW", props)

  const { getCompanies } = store;
  const companies = getCompanies(0, 15);

  const handleCreateServiceProfilePress = () => {
    navigation.navigate(RouteNames.PROFILE_CONTACT_US)
  }

  React.useEffect(() => {
    fetchVendorsByGroup(vendorGroupId, auth)
  }, [])

  console.log("VENDW", vendorGroups, vendorGroupId)
  const vendorGroup = vendorGroups[vendorGroupId];
  const vendorList = vendorGroup.vendorIds.map(vendorId => vendors[vendorId])

  console.log("VENDORSW", vendorGroup)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Top Sales Tools
      </Text>
      <Link style={{margin: 8, alignSelf: 'center'}} textLeft="Don't see your company?" textLink="Create a service profile" onPress={handleCreateServiceProfilePress} />
      <Card styles={{marginBottom: 32}}>
        <ListView vendorList={vendorList} navigation={navigation} />
      </Card>
    </View>
  )
}

const stp = (state) => ({
  auth: state.auth,
  vendorGroups: state.vendorGroups,
  vendors: state.vendors,
})
const dtp = (dispatch) => ({
  fetchVendorsByGroup: fetchVendorsByGroup(dispatch),
})
export const DiscoverList = connect(stp, dtp)(RawDiscoverList);

const styles = StyleSheet.create({
  container: {
  },
  title: {
    color: colors.textHighlight,
    fontSize: 18,
    alignSelf: 'center',
  }
});
