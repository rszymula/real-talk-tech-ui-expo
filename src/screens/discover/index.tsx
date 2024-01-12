import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { RouteNames } from '../../constants';
import { colors } from '../../context/themes';
import { Card } from '../../common/Card';
import { getCompanies } from '../../services/DiscoverService';
import { Separator } from '../../common/Separator';
import { Button, ButtonType } from '../../common/Button';

function Company(props){
  const { id, name, type, description, setViewSolo} = props;

  const handleOnPress = () => {
    setViewSolo(id);
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flexDirection: 'column'}}>
        <Button
          title={""}
          onPress={() => {}}
          type={ButtonType.BASIC}
          styles={{height: 50, border: 'none'}}
        />
        <Button
          title={"View Profile"}
          onPress={handleOnPress}
          type={ButtonType.BASIC}
          styles={{color: colors.textLowlight, marginTop: 8}}
        />
      </View>
      <View style={{flexDirection: 'column', marginLeft: 16}}>
        <Text style={{color: colors.textHighlight}}>{name}</Text>
        <Text style={{color: colors.textRegular, marginTop: 4}}>{type}</Text>
        <Text style={{color: colors.textLowlight, marginTop: 4}}>{description}</Text>
      </View>
    </View>
  );
}

export function Discover(props){

  const [viewSolo, setViewSolo] = React.useState(-1);

  const { navigation } = props;

  const handleOnPress = () => {
    // navigation.navigate(RouteNames.DISCUSS)
  }

  console.log("Rendering Discover")

  const companies = getCompanies(0, 5);
  const selected = companies.find(company => company.id === viewSolo);

  return (
    <View style={styles.container}>
      {/* <View style={{justifyContent: 'flex-end'}}> */}
      <View style={{width: "30%"}}></View>
      <View style={{width: 500, alignItems: 'center'}}>
        <Text style={styles.title}>
          Explore the market
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8,}}>
          A long description
        </Text>
        <Card styles={{marginBottom: 32, width: 500}}>
          {!!selected ? (<Company {...selected} style={{margin: 16}} />) : (<FlatList
            style={{margin: 16, backgroundColor: colors.foreground}}
            data={companies}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Company {...item} setViewSolo={setViewSolo} />}
            ItemSeparatorComponent={() => <Separator style={{marginBottom: 12}} />}
          />)}
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    height: "100%",
  },
  title: {
    color: colors.textHighlight,
    marginTop: 32,
    fontSize: 18,
    // fontWeight: 'bold',
  }
})