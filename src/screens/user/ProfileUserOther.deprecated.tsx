import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
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
import { fetchUser } from '../../services/UserServices';
import { Heading } from '../../components/common/Heading';

export function RawProfileUserOther(props){

  const { navigation, route, fetchUser, users, userLoading, userError, auth } = props;
  const {id, username} = route?.params

  React.useEffect(() => {
    fetchUser(username, auth);
  }, [])

  const user = users[username]

  console.log("LDDD", userLoading)
  if(userLoading){
    return <ActivityIndicator />
  }

  console.log("USRW", user)

  return (
    <View style={styles.container}>
      <Heading navigation={navigation}>
      </Heading>
      <Text style={styles.title}>
        {`@${user?.username}`}
      </Text>
      <Text style={{color: colors.textLowlight, margin: 8}}>
        {`${user?.fullname}`}
      </Text>
      <Card styles={{backgroundColor: colors.input, flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.captionText}>{"Bio"}</Text>
        <Text style={{maxWidthX: 512, color: colors.textHighlight, fontSize: 12, marginTop: 8 }}>{user?.bio}</Text>
      </View>
      </Card>
      <Text style={styles.h2}>
        Endorse Tech Stack
      </Text>
      <SelectedItems items={user?.techstack || []} style={{marginTop: 8}}/>
    </View>
  )
}

const stp = (state) => ({
  users: state.users,
  userLoading: state.userLoading,
  userError: state.userError,
  auth: state.auth,
});
const dtp = (dispatch) => ({
  fetchUser: fetchUser(dispatch)
});
export const ProfileUserOther = connect(stp, dtp)(RawProfileUserOther);

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
    fontSize: 14,
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
