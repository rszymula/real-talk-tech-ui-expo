import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../../core/Button';
import { Card } from '../../core/Card';
import { Separator } from '../../core/Separator';
import { RouteNames } from '../../constants';
import { colors } from '../../context/themes';
// import { getCompanies } from '../services/DiscoverService';
import { store } from '../../store/basicStore';
import { ListItem } from '../../common/ListItem';
import { Link } from '../../core/Link';
import { MarketplaceList } from './MarketplaceList';

export function MarketplaceHome(props){


  return (
    <View style={styles.container}>
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
  }
});
