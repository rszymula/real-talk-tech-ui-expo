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
import { fetchCompanyGroups } from '../../services/DiscoverService';
import { DiscoverGrid } from './DiscoverGrid';


export function DiscoverHome(props){
  return (
    <>
      <DiscoverGrid {...props}/>
    </>
  )
}