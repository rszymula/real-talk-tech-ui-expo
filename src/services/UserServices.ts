
export function createUser(dispatch){
  return (postId) => {
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/signup`
    const params = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: "bob",
        last_name: "the builder",
        username: "thebob1",
        email: "bob1@gmail.com",
        password: "bob123",
        techStack: [],
      })
    }
    fetch(url, params).then(res => {
      return res.json()
      // return res.text()
    }).then(json => {
      console.log("ZCOMMENTS", json)
      dispatch({type: "POSTS_SUCCESS", payload: json})
    }).catch((err) => {
      console.log("ERRZ", err)
    })
  }
}
