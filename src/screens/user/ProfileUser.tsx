import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../../core/Button';
import { Card } from '../../core/Card';
import { Separator } from '../../core/Separator';
import { RouteNames } from '../../constants';
import { colors } from '../../context/themes';
// import { getCompanies, getCompany } from '../services/DiscoverService';
import { store } from '../../store/basicStore';
import { ListItem } from '../../common/ListItem';
import { FullWindowOverlay } from 'react-native-screens';


export function ProfileUser(props){

  const { navigation, route } = props;

  const { getUser } = store;
  const user = getUser();

  const techStack = [
    "Java", "Typescript", "Python", "C++"
  ];

  return (
    <View style={styles.container}>
      <View style={{width: 512, alignItems: 'center'}}>
        <Text style={styles.h2}>
          Your Profile
        </Text>
        <Text style={styles.title}>
          {`@${user.username}`}
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8,}}>
          {`${user.firstName} ${user?.lastName || ''}`}
        </Text>
        <Card styles={{backgroundColor: colors.input, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.captionText}>{"Bio"}</Text>
            <Text style={{maxWidth: 384, alignSelf: 'center', color: colors.textRegular, marginTop: 8 }}>{user.bio}</Text>
          </View>
          <Button title="Edit" onPress={() => {}} type={ButtonType.BASIC} styles={{color: colors.textRegular, backgroundColor: colors.foreground, alignItems: 'center' }}/>
        </Card>
        <Text style={styles.h2}>
          Your Tech Stack
        </Text>
        <View style={{flexDirection: 'row', marginTop: 8}}>
          {techStack.map(item => {
            return (
              <Text style={styles.techItem}>{item}</Text>
            )
          })}
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    marginTop: 8,
    color: colors.textHighlight,
    fontSize: 18,
  },
  h2: {
    marginTop: 8,
    color: colors.textHighlight,
    fontSize: 16,
  },
  captionText: {
    color: colors.textLowlight,
    fontSize: 12,
  },
  techItem: {
    // borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.foreground,
    color: colors.textLowlight,
    margin: 4,
    padding: 4,
  }
});


