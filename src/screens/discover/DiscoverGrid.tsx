import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { Card } from '../../components/core/Card';
import { Separator } from '../../components/core/Separator';
import { RouteNames, discoverGroupsImages } from '../../constants/constants';
import { colors } from '../../context/themes';
// import { getCompanies } from '../services/DiscoverService';
import { store } from '../../state/basicStore';
import { GridView } from '../../components/common/GridView';
import { fetchVendorGroups } from '../../services/DiscoverService';
import { connect } from '../../state/reduxStore';
import FORWARD_THIN from '../../assets/forward_thin.png';
import BACK from '../../assets/back.png';
import { Heading } from '../../components/common/Heading';
import Svg, {
  Use,
  Image as SvgImage,
} from 'react-native-svg';

const renderElement = (item, idx, navigation) => {
  const handleOnPress = (item) => {
    // console.log("NAVW", item)
    navigation.navigate(RouteNames.DISCOVER_LIST, {vendorGroupId: item.id});
  }

  const image = discoverGroupsImages[item.id];
  return (
    <Card styles={{flexDirection: 'row', justifyContent: 'space-between', width: 176, marginRight: 16, marginBottom: 16 ,padding: 0, backgroundColor: colors.input}}>
      <View style={{flexDirection: 'row', flexShrink: 1, padding: 16, alignItems: 'center'}}>
      {/* <Svg width="80" height="80" style={{width: 80, height: 80}}>
        <Image href={item.icon} />
      </Svg> */}
        <Image source={image} style={{width: 32, height: 32}}/>
        {/* <Text style={{flexDirection: 'row', width: 128, color: colors.textRegular, fontSize: 12}}> */}
        <Text style={{color: colors.textRegular, fontSize: 12, marginLeft: 16}}>
          {item.name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleOnPress(item)}
        style={{
          padding: 4,
          justifyContent: 'space-around',
          // alignContent: 'center',
          // alignSelf: 'center',
          // alignItems: 'center',
          borderColor: 'green',
          borderWidthX: 1,
          borderLeftColor: colors.border,
          borderLeftWidth: 1,
          // padding: 4,
          // paddingTop: 16,
          backgroundColor: colors.foreground,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4
        }}
      >
        <Image source={FORWARD_THIN} style={{
          width: 11,
          height: 10,
          // alignSelf: 'center',
          borderColor: 'red',
          borderWidthX: 1,
        }}/>
      </TouchableOpacity>
    </Card>
  )
}

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

  const handleBackPress = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Heading navigation={navigation}>
        <View>
          <Text style={styles.title}>
            Discover
          </Text>
          <Text style={{color: colors.textRegular, margin: 8, alignSelf: 'center'}}>
            Explore software solutions
          </Text>
        </View>
      </Heading>
      <View style={{marginBottom: 32}}>
         <GridView
          // data={companies}
          elements={vendorGroupsForGrid}
          onPress={(item) => handleOnPress(item)}
          navigation={navigation}
          renderElement={renderElement}
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
