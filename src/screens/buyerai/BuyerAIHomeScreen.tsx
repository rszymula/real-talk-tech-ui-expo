import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getCompanies } from '../../services/DiscoverService';
import { Card } from '../../common/Card';
import { colors } from '../../context/themes';
import { BUYERAI_PLACEHOLDER, INPUT_PLACEHOLDER } from '../../constants';
import { InputBar } from '../../common/InputBar';

export function BuyerAIHomeScreen() {

  const companies = getCompanies()
  const large = "s,sf,f".repeat(300).split(',');

  const handleTalkToChat = () => {
    
  }

  return (
    <View style={styles.container}>
      <View style={{width: "30%"}}></View>
      <View style={{width: 500, alignItems: 'center'}}>
        <Text style={styles.title}>
          Buyer AI
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8,}}>
          Simplyfying Software Selection with Smarter Solutions
        </Text>
        <Card styles={{marginBottom: 32, width: 500, padding: 16}}>
          {/* <FlatList 
            data={large}
            renderItem={({item}) => <Text>{item}</Text>}
          /> */}
          <Text style={{color: colors.textHighlight}}>
            Where are you in your buying journey
          </Text>
          <InputBar
            onPress={handleTalkToChat}
            title={"^"}
            placeholder={BUYERAI_PLACEHOLDER}
            style={{marginTop: 16}}
          />
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'row',
    height: "100%",
  },
  title: {
    color: colors.textHighlight,
    marginTop: 32,
    fontSize: 18,
    // fontWeight: 'bold',
  }
});