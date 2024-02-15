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


export function RawProfileUserOther(props){

  const { navigation, route, fetchUser, users, userLoading, userError, auth } = props;
  console.error("RENDERING", props)

  const {id, username} = route?.params

  // const { getUser } = store;
  // const user = getUser(id);

  React.useEffect(() => {
    fetchUser(username, auth);
  }, [])

  // const techStack = [
  //   "Java", "Typescript", "Python", "C++"
  // ];

  const user = users[username]

  console.log("LDDD", userLoading)
  if(userLoading){
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <View style={{width: 512, alignItems: 'center'}}>
        <Text style={styles.title}>
          {`@${user?.username}`}
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8}}>
          {`${user?.fullname}`}
        </Text>
        <Card styles={{backgroundColor: colors.input, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'column'}}>
            <Text style={styles.captionText}>{"Bio"}</Text>
            {/* <Text style={{maxWidth: 384, alignSelf: 'center', color: colors.textRegular, marginTop: 8 }}>{user.bio}</Text> */}
            <Text style={{maxWidth: 512, color: colors.textRegular, marginTop: 8 }}>{user?.bio}</Text>
          </View>
        </Card>
        <Text style={styles.h2}>
          Endore Tech Stack
        </Text>
        <SelectedItems items={user?.techstack || []} style={{marginTop: 8}}/>
      </View>

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


