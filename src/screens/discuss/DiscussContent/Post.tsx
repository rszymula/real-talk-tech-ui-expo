import { Text, View, Button, StyleSheet } from 'react-native';

function PostHeading({ title, description }){
  return (
    <>
      <Text>{title}</Text>
      <Text>{description}</Text>
    </>
  );
}

function PostComments({comments}){
  // console.log(comments)

  return (
    <View>
      {comments.map(comment => {return <Text>{comment.text}</Text>})}
      {/* <Text>LKJ</Text> */}
    </View>
  );
}

export function Post(props){

  return (
    <>
      <PostHeading {...props} />
      <PostComments comments={props.comments} />
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
