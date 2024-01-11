import { Text, View, Button, StyleSheet } from 'react-native';

export function Post({ title, description, username, commentIds, createdTimestamp, currentCategory }){

  const commentCount = commentIds?.length || 0;

  return (
    <>
      <Text>{currentCategory}</Text>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <Text>{commentCount}</Text>
      <Text>{username}</Text>
      <Text>{createdTimestamp}</Text>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: 'red',
    borderWidth: 2,
    padding: 16,
  }
})
