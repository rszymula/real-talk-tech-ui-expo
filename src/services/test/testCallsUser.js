const DEFAULT_TOKEN = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDk2MDkxNDEsImlhdCI6MTcwOTU5ODM0MSwic3ViIjoxfQ.-xbu5-85HhJjN_jXVTX29Oyu1ws89c4Al_UpeVTwd-Q"

// User -------------------------------------

const fetchUser = (username, token = DEFAULT_TOKEN) => {
  // const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/user/${username}`
  const url = `http://localhost:5000/user/${username}/1`
  const params = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }
  fetch(url, params).then(res => {
    return res.text()
  }).then(json => {
    console.log("GOOD-fetchUser", json)
    // dispatch({type: "POSTS_SUCCESS", payload: json})
  }).catch((err) => {
    console.log("ERR-fetchUser", err)
  })
}
// fetchUser("msmith21")
fetchUser("elongates")

const endorseUser = (body, token = DEFAULT_TOKEN) => {
  const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/endorseUser`
  const params = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body)
  }
  fetch(url, params).then(res => {
    return res.json()
    // return res.text()
  }).then(json => {
    console.log("GOOD-endorseUser", json)
    // dispatch({type: "POSTS_SUCCESS", payload: json})
  }).catch((err) => {
    console.log("ERR-endorseUser", err)
  })
}

const bodyEndorse = {
  endorserUserId: 1,
  endorseeUsername: 2,
  vendorId: 5,
}
//endorseUser(bodyEndorse)



