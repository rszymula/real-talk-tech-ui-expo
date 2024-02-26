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
import { editUser, logout } from '../../services/UserServices';
import { Heading } from '../../components/common/Heading';


export function RawProfileUser(props){

  const { navigation, route, user, skills, editUser, logout} = props;

  console.log("USD", user)

  const editOpen = route?.params?.editOpen;

  const [editing, setEditing] = React.useState(editOpen || false)

  const [fullname, setName] = React.useState(user.fullname)
  const [username, setUsername] = React.useState(user.username)
  // const [password, setPassword] = React.useState("")
  const [bio, setBio] = React.useState(user.bio)
  const [currentCompany, setCompany] = React.useState(user.currentCompany)
  const [linkedinUrl, setLinkedin] = React.useState(user.linkedinUrl)
  const [techStack, setTechStack] = React.useState(user.techStack.map(item => item.name));

  const [skill, setSkill] = React.useState('');
  // const [selectedSkills, setSelectedSkills] = React.useState(user.techStack.map(item => item.name));
  // const [customSkills, setCustomSkills] = React.useState([]);

  const handleTypeSkill = (text) => {
    setSkill(text)
  }


  const handleSelectSkill = (item) => {
    console.log("ITEMTOADW", item)
    if (!techStack.includes(item.name)) {
      setTechStack(skill => [...skill, item.name])
    }
  }

  const handleSubmitCustomSkill = (item) => {
    console.log("ITEMTOADW", item)
    if (!techStack.includes(item)) {
      setTechStack(skill => [...skill, item])
    }
  }

  // const handleDeleteSkill = (item) => {
  //   console.log({selectedSkills, customSkills, item})
  //   setSelectedSkills(selectedSkills => selectedSkills.filter(skill => skill.name !== item))
  //   setCustomSkills(customSkills => customSkills.filter(skill => skill !== item));
  // }

  const handleDeleteTechStack = (deleteItem) => {
    setTechStack(techStack => techStack.filter(item => item !== deleteItem))
  }

  const handleEditPress = () => {
    setEditing(true);
  }

  const handleCancelPress = () => {
    setName(user.fullname)
    setUsername(user.username)
    setBio(user.bio)
    setCompany(user.currentCompany)
    setTechStack(user.techStack.map(item => item.name))
    setEditing(false);
  }

  const handleSavePress = () => {
    const body = {
      fullname,
      email: user.email,
      techStack,
      bio,
      currentCompany,
      linkedinUrl,
    }
    editUser(body);
    setEditing(false);
  }

  const handleLogout = () => {
    logout();
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
        value={fullname}
        onChangeText={(text) => setName(text)}
        placeholder={""}
        freeze={!editing}
        style={{marginTop: 16}}
      />
      {/* <Image
        source={{uri: "https://vendor-logos-bucket.s3.amazonaws.com/vendor_logos_prod/sales-tools/talkdesk.png"}}
        style={{width: 32, height: 32}}
      /> */}
      <RTextInput 
        label={"Username"}
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder={""}
        freeze={!editing}
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
        label={!editing ? "Bio" : null}
        value={bio}
        onChangeText={(text) => setBio(text)}
        placeholder={""}
        freeze={!editing}
        numberOfLines={!editing ? null : 12}
        style={{marginTop: 8}}
      />
      <RTextInput 
        label={"Company"}
        value={currentCompany}
        onChangeText={(text) => setCompany(text)}
        placeholder={""}
        freeze={!editing}
        style={{marginTop: 8}}
      />
      <RTextInput 
        label={"LinkedIn"}
        value={linkedinUrl}
        onChangeText={(text) => setLinkedin(text)}
        placeholder={""}
        freeze={!editing}
        style={{marginTop: 8}}
      />
      <Text style={styles.h3}>
        Your Tech Stack
      </Text>
      {editing && (<RTextInput 
        style={{position: 'relative', zIndex: 100, marginTop: 8}}
        label="Tech Stack"
        onChangeText={handleTypeSkill}
        value={skill}
        placeholder="What software do you use?"
        selections={skills}
        onSelect={handleSelectSkill}
        onSubmit={handleSubmitCustomSkill}
        dropUp
      />)}
      <SelectedItems
        items={techStack}
        style={{marginTop: 8}}
        onDelete={editing ? (item) => handleDeleteTechStack(item) : null}
      />
      <Link style={{marginTop: 16}} textLink={"Log out from account"} onPress={handleLogout}/>
    </View>
  )
}

const stp = (state) => ({
  user: state.users[state.auth.userId],
  skills: state.skills,
});
const dtp = (dispatch, getState) => ({
  editUser: editUser(dispatch, getState),
  logout: logout(dispatch, getState)
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


