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
import { RTextInput } from '../../components/core/RTextInput';
import { Link } from '../../components/core/Link';


export function RawProfileUser(props){

  const { navigation, route, user } = props;

  console.log("USD", user)

  const [editing, setEditing] = React.useState(false)

  const [name, setName] = React.useState(user.fullname)
  const [username, setUsername] = React.useState(user.username)
  const [password, setPassword] = React.useState("")
  const [bio, setBio] = React.useState(user.bio)
  const [company, setCompany] = React.useState(user.currentCompany)
  const [linkedIn, setLinkedin] = React.useState(user.linkedinUrl)

  const handleEditPress = () => {
    setEditing(true);
  }

  const handleCancelPress = () => {
    setEditing(false);
  }

  const handleSavePress = () => {
    setEditing(false);
  }

  const handleLogout = () => {

  }

  return (
    <View style={styles.container}>
      <View style={{width: 512}}>
        <Text style={styles.title}>Settings</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.h2}>
            Your Profile
          </Text>
          {editing ? (
            <View style={{flexDirection: 'row'}}>
              <Button title={"Cancel"} onPress={handleCancelPress} type={ButtonType.BASIC}/>
              <Button title={"Save Changes"} onPress={handleSavePress} styles={{marginLeft: 8, paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8}} />
            </View>
          ) : 
            <Button title="Edit Profile" onPress={handleEditPress} type={ButtonType.BASIC} styles={{alignSelf: 'flex-start', marginTop: 8, color: colors.textRegular, backgroundColor: colors.foreground}}/>
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
        <SelectedItems items={user.techstack} style={{marginTop: 8}}/>
        <Link textLink={"Log out from account"} onPress={handleLogout}/>
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
    fontSize: 20,
    alignSelf: 'center',
  },
  h2: {
    marginTop: 8,
    color: colors.textHighlight,
    fontSize: 16,
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


