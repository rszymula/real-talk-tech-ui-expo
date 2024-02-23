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
import { MarketplaceList } from './MarketplaceList';
import { Heading } from '../../components/common/Heading';

export function MarketplaceHome(props){


  return (
    <View style={styles.container}>
      <Heading navigation={props.navigation}>
        <View>
          <Text style={styles.title}>
            Marketplace
          </Text>
          <Text style={{color: colors.textRegular, margin: 8, alignSelf: 'center'}}>
            Premium listings and deals for the community
          </Text>
        </View>
      </Heading>
      <MarketplaceList {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    color: colors.textHighlight,
    fontSize: 18,
    alignSelf: 'center',
  }
});
