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
import { editUser, fetchUser, endorseUser } from '../../services/UserServices';
import { Heading } from '../../components/common/Heading';
import { RTextInput } from '../../components/core/RTextInput';
import { Link } from '../../components/core/Link';


export function RawProfileUserOther(props){

  // const { navigation, route, user, editUser, logout} = props;
  const { navigation, route, fetchUser, editUser, endorseUser, users, userLoading, userError, auth } = props;
  const {id, username: usernameParam} = route?.params
  const user = users?.[usernameParam] || users?.[id] || null

  console.log("XXXXX USERW", user)

  // const loadData = () => {
  //   const promise = new Promise(() => {
  //     fetchUser(usernameParam, auth);
  //   }).then(() => {
  //     setName()
  //   })
  // }

  const loadData = () => {
    fetchUser(usernameParam, auth);
  }

  React.useEffect(() => {
    loadData();
  }, [])


  console.log("UNAMEW", usernameParam, users, user)

  console.log("LDDD", userLoading)
  if(userLoading){
    return <ActivityIndicator />
  }

  console.log("USD", user)

  if(!user || userError){
    return (<View style={{margin: 32}}>
      <Text style={{alignSelf: 'center', color: colors.textRegular}}>{"Failed loading data..."}</Text>
      <Link onPress={loadData()} textLink={"Retry"} style={{alignSelf: 'center', marginTop: 8}}/>
    </View>);
  }

  const isUser = auth.username === usernameParam

  const handleEditPress = () => {
    navigation.navigate(RouteNames.PROFILE_USER, {editOpen: true})
  }

  const handleEndorsePress = (item) => {
    console.log("ENDORSW")
    endorseUser(user, item)
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
        <Text style={styles.h2}>
          {isUser ? `Your Profile` : `User Profile`}
        </Text>
        {isUser && <Button title="Edit Profile" onPress={handleEditPress} type={ButtonType.BASIC} styles={{color: colors.textRegular, backgroundColor: colors.foreground}}/>}
      </View>
      <RTextInput 
        label={"Name"}
        value={user?.fullname}
        onChangeText={null}
        placeholder={""}
        freeze
        style={{marginTop: 16}}
      />
      {/* <Image
        source={{uri: "https://vendor-logos-bucket.s3.amazonaws.com/vendor_logos_prod/sales-tools/talkdesk.png"}}
        style={{width: 32, height: 32}}
      /> */}
      <RTextInput 
        label={"Username"}
        value={user?.username}
        onChangeText={null}
        placeholder={""}
        freeze
        style={{marginTop: 8}}
      />
      {/* <RTextInput 
        label={"Password"}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={""}
        freeze={!editing}
        style={{marginTop: 8}}
      /> */}
      <RTextInput 
        label={"Bio"}
        value={user?.bio}
        onChangeText={null}
        placeholder={""}
        freeze
        numberOfLines={12}
        style={{marginTop: 8}}
      />
      <RTextInput 
        label={"Company"}
        value={user?.currentCompany}
        onChangeText={null}
        placeholder={""}
        freeze
        style={{marginTop: 8}}
      />
      <RTextInput 
        label={"LinkedIn"}
        value={user?.linkedinUrl}
        onChangeText={null}
        placeholder={""}
        freeze
        style={{marginTop: 8}}
      />
      <Text style={styles.h3}>
        {isUser ? `Your Tech Stack` : `Endorse Tech Stack`}
      </Text>
      {isUser ?
        (<SelectedItems items={user?.techStack?.map(item => item.name) || []} style={{marginTop: 8}} />) :
        (<SelectedItemsClickable onPress={handleEndorsePress} items={user?.techStack || []} style={{marginTop: 8}} />)}
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
  editUser: editUser(dispatch, getState),
  endorseUser: endorseUser(dispatch, getState),
});
export const ProfileUserOther = connect(stp, dtp)(RawProfileUserOther);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: 512,
  },
  title: {
    // marginTop: 8,
    color: colors.textHighlight,
    fontSize: 20,
    alignSelf: 'center',
  },
  h2: {
    marginTop: 8,
    color: colors.textHighlight,
    fontSize: 16,
    alignSelf: 'center',
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
