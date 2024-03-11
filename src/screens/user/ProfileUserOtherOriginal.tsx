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
import { SelectedItems, SelectedItemsClickable } from '../../components/common/SelectedItems';
import { connect } from '../../state/reduxStore';
import { fetchUser, endorseUser } from '../../services/UserServices';
import { Heading } from '../../components/common/Heading';
import { Link } from '../../components/core/Link';

export function RawProfileUserOtherOriginal(props){

  const { navigation, route, fetchUser, users, userLoading, userError, endorseUser, auth } = props;
  const {id, username: usernameParam} = route?.params
  const user = users?.[usernameParam] || users?.[id] || null

  const loadData = () => {
    fetchUser(usernameParam, auth);
  }

  React.useEffect(() => {
    loadData();
  }, [])

  console.log("LDDD", userLoading)
  if(userLoading){
    return <ActivityIndicator />
  }

  console.log("USRW", user)

  const isUser = auth.username === usernameParam

  const handleEndorsePress = (item) => {
    console.log("ENDORSW")
    endorseUser(user, item)
  }

  const handleEditPress = () => {
    navigation.navigate(RouteNames.PROFILE_USER, {editOpen: true})
  }

  if(!user || userError){
    return (<View style={{margin: 32}}>
      <Text style={{alignSelf: 'center', color: colors.textRegular}}>{"Failed loading data..."}</Text>
      <Link onPress={loadData()} textLink={"Retry"} style={{alignSelf: 'center', marginTop: 8}}/>
    </View>);
  }

  return (
    <View style={styles.container}>
      <Heading navigation={navigation}>
      </Heading>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'red',
        borderWidthX: 1,
      }}
      >
        <View>
          <Text style={styles.title}>
            {`@${user?.username}`}
          </Text>
          <Text style={{color: colors.textRegular, margin: 8}}>
            {`${user?.fullname}`}
          </Text>
        </View>
        {isUser && <Button title="Edit Profile" onPress={handleEditPress} type={ButtonType.BASIC} styles={{color: colors.textRegular, backgroundColor: colors.foreground}}/>}
      </View>
      <Card styles={{backgroundColor: colors.input, flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.captionText}>{"Bio"}</Text>
        <Text style={{maxWidthX: 512, color: colors.textHighlight, fontSize: 12, marginTop: 8 }}>{user?.bio}</Text>
      </View>
      </Card>
      <Text style={styles.h3}>
        {isUser ? `Your Tech Stack` : `Endorse Tech Stack`}
      </Text>
      {isUser ?
        (<SelectedItems items={user?.techStack?.map(item => item.name) || []} style={{marginTop: 4}} />) :
        (<SelectedItemsClickable onPress={handleEndorsePress} items={user?.techStack || []} style={{marginTop: 4}} />)
      }
      {/* <SelectedItems items={user?.techstack || []} style={{marginTop: 8}}/> */}
    </View>
  )
}

const stp = (state) => ({
  users: state.users,
  userLoading: state.userLoading,
  userError: state.userError,
  auth: state.auth,
});
const dtp = (dispatch, getState) => ({
  fetchUser: fetchUser(dispatch),
  endorseUser: endorseUser(dispatch, getState),
});
export const ProfileUserOtherOriginal = connect(stp, dtp)(RawProfileUserOtherOriginal);

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
  h3: {
    marginTop: 8,
    color: colors.textHighlight,
    fontSize: 14,
  },
  captionText: {
    color: colors.textRegular,
    fontSize: 12,
  },
  techItem: {
    // borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.foreground,
    color: colors.textRegular,
    margin: 4,
    padding: 4,
  }
});
