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
import { fetchVendors } from '../../services/DiscoverService';
import { connect } from '../../state/reduxStore';


export function RawDiscoverGrid(props){

  const { navigation, fetchVendors, auth } = props;

  const { getCompanies } = store;
  const companies = getCompanies(0, 15);

  const handleOnPress = (item) => {
    navigation.navigate(RouteNames.DISCOVER_LIST, {type: item.type});
  }

  React.useEffect(() => {
    console.log("FVW")
    fetchVendors(auth)
  }, [])

  return (
    <View style={styles.container}>
    {/* <View style={{justifyContent: 'flex-end'}}> */}
      <View style={{width: 512, alignItems: 'center'}}>
        <Text style={styles.title}>
          Discover
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8}}>
          Explore software solutions
        </Text>
        <View style={{marginBottom: 32, width: 512}}>
          <GridView data={companies} onPress={(item) => handleOnPress(item)} navigation={navigation} />
        </View>
      </View>
    </View>
  )
}

const stp = (state) => ({
  auth: state.auth
})
const dtp = (dispatch) => ({
  fetchVendors: fetchVendors(dispatch),
})
export const DiscoverGrid = connect(stp, dtp)(RawDiscoverGrid);

const styles = StyleSheet.create({
  container: {
  },
  title: {
    color: colors.textHighlight,
    fontSize: 18,
  }
});
