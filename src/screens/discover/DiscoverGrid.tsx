import React from 'react';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { Card } from '../../components/core/Card';
import { Separator } from '../../components/core/Separator';
import { RouteNames } from '../../constants/constants';
import { colors } from '../../context/themes';
// import { getCompanies } from '../services/DiscoverService';
import { store } from '../../state/basicStore';
import { GridView } from '../../components/common/GridView';
import { fetchVendorGroups } from '../../services/DiscoverService';
import { connect } from '../../state/reduxStore';

export function RawDiscoverGrid(props){

  const { navigation, vendorGroups, fetchVendorGroups, auth } = props;

  const { getCompanies } = store;
  const companies = getCompanies(0, 15);

  const vendorGroupsForGrid = Object.keys(vendorGroups)
    ?.map(item => vendorGroups[item]) || {}

  console.log("VGGSSW", vendorGroups, vendorGroupsForGrid)

  const handleOnPress = (item) => {
    navigation.navigate(RouteNames.DISCOVER_LIST, {vendorGroupId: item.id});
  }

  React.useEffect(() => {
    fetchVendorGroups(auth)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Discover
      </Text>
      <Text style={{color: colors.textLowlight, margin: 8, alignSelf: 'center'}}>
        Explore software solutions
      </Text>
      <View style={{marginBottom: 32}}>
        <GridView
          // data={companies}
          data={vendorGroupsForGrid}
          onPress={(item) => handleOnPress(item)}
          navigation={navigation}
        />
      </View>
    </View>
  )
}

const stp = (state) => ({
  auth: state.auth,
  vendorGroups: state.vendorGroups,
})
const dtp = (dispatch) => ({
  fetchVendorGroups: fetchVendorGroups(dispatch),
})
export const DiscoverGrid = connect(stp, dtp)(RawDiscoverGrid);

const styles = StyleSheet.create({
  container: {
  },
  title: {
    color: colors.textHighlight,
    fontSize: 18,
    alignSelf: 'center',
  }
});
