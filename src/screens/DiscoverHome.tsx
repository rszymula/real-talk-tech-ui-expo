import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../core/Button';
import { Card } from '../core/Card';
import { Separator } from '../core/Separator';
import { RouteNames } from '../constants';
import { colors } from '../context/themes';
import { getCompanies } from '../services/DiscoverService';


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
          styles={{height: 50, width: 100, border: 'none'}}
        />
        {setViewSolo && <Button
          title={"View Profile"}
          onPress={handleOnPress}
          type={ButtonType.BASIC}
          styles={{color: colors.textLowlight, marginTop: 8}}
        />}
      </View>
      <View style={{flexDirection: 'column', marginLeft: 16}}>
        <Text style={{color: colors.textHighlight}}>{name}</Text>
        <Text style={{color: colors.textRegular, marginTop: 4}}>{type}</Text>
        <Text style={{color: colors.textLowlight, fontSize: 12, marginTop: 4}}>{description}</Text>
      </View>
    </View>
  );
}

function SingleView({selected, setViewSolo}){
  return (
    <View style={{margin: 16}}>
      <Company {...selected} style={{margin: 16}} />
      <Separator />,
      <Text style={{color: colors.textHighlight, fontSize: 12, marginTop: 4}}>{`HQ: `}</Text>
      <Text style={{color: colors.textRegular, fontSize: 12, marginTop: 8}}>{`Total Offices: ${selected.offices}`}</Text>
      <Text style={{color: colors.textLowlight, fontSize: 10, marginTop: 4}}>{`Local Employees : ${selected.localEmployees}`}</Text>
      <Text style={{color: colors.textLowlight, fontSize: 10}}>{`Total Employees: ${selected.totalEmployees}`}</Text>
      <Separator style={{marginTop: 16, marginBottom: 8}} />
      <Button
        title={"Back"}
        onPress={() => setViewSolo(-1)}
        type={ButtonType.BASIC}
        styles={{color: colors.textLowlight, marginTop: 8 }}
      />
    </View>
  )
}

function ListView({companies, setViewSolo}){
  return(
    <SafeAreaView>
      <FlatList
        style={{margin: 16, backgroundColor: colors.foreground}}
        data={companies}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Company {...item} setViewSolo={setViewSolo} />}
        ItemSeparatorComponent={() => <Separator style={{marginBottom: 12}} />}
      />
    </SafeAreaView>
  )
}

export function DiscoverHome(props){

  const [viewSolo, setViewSolo] = React.useState(-1);

  const { navigation } = props;

  console.log("Rendering Discover")

  const companies = getCompanies(0, 15);
  const selected = companies.find(company => company.id === viewSolo);

  return (
    <View style={styles.container}>
      {/* <View style={{justifyContent: 'flex-end'}}> */}
      <View style={{width: 500, alignItems: 'center'}}>
        <Text style={styles.title}>
          Explore the market
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8,}}>
          A long description
        </Text>
        <Card styles={{marginBottom: 32, width: 500}}>
          {!!selected ? (<SingleView selected={selected} setViewSolo={setViewSolo} />)
          : (<ListView companies={companies} setViewSolo={setViewSolo}/>)}
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
