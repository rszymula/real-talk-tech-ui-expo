import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
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
import { RTextInput } from '../../components/core/RTextInput';
import { Link } from '../../components/core/Link';
import { editUser } from '../../services/UserServices';
import { Heading } from '../../components/common/Heading';


export function RawProfileUser(props){

  const { navigation, route, user, editUser} = props;

  console.log("USD", user)

  const [editing, setEditing] = React.useState(false)

  const [name, setName] = React.useState(user.fullName)
  const [username, setUsername] = React.useState(user.username)
  const [password, setPassword] = React.useState("")
  const [bio, setBio] = React.useState(user.bio)
  const [company, setCompany] = React.useState(user.currentCompany)
  const [linkedIn, setLinkedin] = React.useState(user.linkedin_url)
  const [techStack, setTechStack] = React.useState(user.techstack.map(item => item.name));

  const handleEditPress = () => {
    setEditing(true);
  }

  const handleCancelPress = () => {
    setEditing(false);
  }

  const handleSavePress = () => {
    const body = {
      fullName: name,
      email: user.email,
      techstack: techStack,
      bio,
      company,
      linkedIn,
    }
    editUser(body);
    setEditing(false);
  }

  const handleDeleteTechStack = (deleteItem) => {
    setTechStack(techStack => techStack.filter(item => item !== deleteItem))
  }

  const handleLogout = () => {
    navigation.navigate(RouteNames.PROFILE_WELCOME)
  }

  return (
    <View style={styles.container}>
      <Heading navigation={navigation}>
        <Text style={styles.title}>Settings</Text>
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
          Your Profile
        </Text>
        {editing ? (
          <View style={{flexDirection: 'row'}}>
            <Button title={"Cancel"} onPress={handleCancelPress} type={ButtonType.BASIC}/>
            <Button title={"Save Changes"} onPress={handleSavePress} styles={{marginLeft: 8, paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8}} />
          </View>
        ) : 
          <Button title="Edit Profile" onPress={handleEditPress} type={ButtonType.BASIC} styles={{color: colors.textRegular, backgroundColor: colors.foreground}}/>
        }
      </View>
      <RTextInput 
        label={"Name"}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder={""}
        freeze={!editing}
        style={{marginTop: 16}}
      />
      <Image source={{uri: "https://vendor-logos-bucket.s3.amazonaws.com/vendor_logos_prod/sales-tools/talkdesk.png"}} style={{width: 32, height: 32}}/>
      <RTextInput 
        label={"Username"}
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder={""}
        freeze={!editing}
        style={{marginTop: 8}}
      />
      <RTextInput 
        label={"Password"}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={""}
        freeze={!editing}
        style={{marginTop: 8}}
      />
      <RTextInput 
        label={"Bio"}
        value={bio}
        onChangeText={(text) => setBio(text)}
        placeholder={""}
        freeze={!editing}
        style={{marginTop: 8}}
      />
      <RTextInput 
        label={"Company"}
        value={company}
        onChangeText={(text) => setCompany(text)}
        placeholder={""}
        freeze={!editing}
        style={{marginTop: 8}}
      />
      <RTextInput 
        label={"LinkedIn"}
        value={linkedIn}
        onChangeText={(text) => setLinkedin(text)}
        placeholder={""}
        freeze={!editing}
        style={{marginTop: 8}}
      />
      <Text style={styles.h3}>
        Your Tech Stack
      </Text>
      <SelectedItems items={techStack} style={{marginTop: 8}} onDelete={editing ? (item) => handleDeleteTechStack(item) : null}/>
      <Link style={{marginTop: 16}} textLink={"Log out from account"} onPress={handleLogout}/>
    </View>
  )
}

const stp = (state) => ({
  user: state.users[state.auth.userId],
});
const dtp = (dispatch, getState) => ({
  editUser: editUser(dispatch, getState),
});
export const ProfileUser = connect(stp, dtp)(RawProfileUser);

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


