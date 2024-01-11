import { Text, View, Button, StyleSheet } from 'react-native';

// function PostHeading({ title, description }){
//   return (
//     <>
//       <Text>{title}</Text>
//       <Text>{description}</Text>
//     </>
//   );
// }

// function PostComments({commentIds}){
//   // console.log(comments)

//   return (
//     <View>
//       {/* {comments.map(comment => {return <Text>{comment.text}</Text>})} */}
//       {commentIds.map(commentId => {return <Text>{commentId}</Text>})}
//       {/* <Text>LKJ</Text> */}
//     </View>
//   );
// }

export function Post({ title, description, createdTimestamp }){

  return (
    <>
      <Text>{title}</Text>
      <Text>{description}</Text>
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
