import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { Card } from '../../components/core/Card';
import { Separator } from '../../components/core/Separator';
import { RouteNames } from '../../constants/constants';
import { colors } from '../../context/themes';
// import { getCompanies, getCompany } from '../services/DiscoverService';
import { store } from '../../state/basicStore';
import { ListItem } from '../../components/common/ListItem';
import { FullWindowOverlay } from 'react-native-screens';
import { SelectedItems } from '../../components/common/SelectedItems';
import { connect } from '../../state/reduxStore';


export function RawProfileUser(props){

  const { navigation, route, user } = props;

  return (
    <View style={styles.container}>
      <View style={{width: 512}}>
        <Text style={styles.h2}>
          Your Profile
        </Text>
        <Button title="Edit Profile" onPress={() => {}} type={ButtonType.BASIC} styles={{alignSelf: 'flex-start', marginTop: 8, color: colors.textRegular, backgroundColor: colors.foreground}}/>
        <Text style={styles.title}>
          {`@${user.username}`}
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8,}}>
          {`${user.firstName} ${user?.lastName || ''}`}
        </Text>
        <Card styles={{backgroundColor: colors.input, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.captionText}>{"Bio"}</Text>
            <Text style={{maxWidth: 512, color: colors.textRegular, marginTop: 8 }}>{user.bio}</Text>
          </View>
        </Card>
        <Text style={styles.h2}>
          Your Tech Stack
        </Text>
        <SelectedItems items={user.techstack} style={{marginTop: 8}}/>
      </View>

    </View>
  )
}

const stp = (state) => ({
  user: state.users[state.auth.userId],
});
const dtp = (dispatch) => ({
});
export const ProfileUser = connect(stp, dtp)(RawProfileUser);

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


