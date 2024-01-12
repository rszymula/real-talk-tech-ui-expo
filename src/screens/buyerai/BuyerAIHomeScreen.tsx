import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { getCompanies } from '../../services/DiscoverService';
import { Card } from '../../common/Card';

export function BuyerAIHomeScreen() {

  const companies = getCompanies()
  const large = "s,sf,f".repeat(300).split(',');

  return (
    <View>
      <Card >
        <FlatList 
          data={large}
          renderItem={({item}) => <Text>{item}</Text>}
        />
      </Card>
    </View>
  )

}