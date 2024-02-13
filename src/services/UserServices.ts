
// export function createUser(dispatch){
//   return (postId) => {
//     const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/signup`
//     const params = {
//       method: "PUT",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         // first_name: "bob",
//         fullname: "bob the builder",
//         username: "thebob1",
//         email: "bob1@gmail.com",
//         password: "bob123",
//         techStack: [],
//         currentCompany: "HERE",
//       })
//     }
//     fetch(url, params).then(res => {
//       return res.json()
//       // return res.text()
//     }).then(json => {
//       console.log("ZCOMMENTS", json)
//       dispatch({type: "POSTS_SUCCESS", payload: json})
//     }).catch((err) => {
//       console.log("ERRZ", err)
//     })
//   }
// }

// export function fetchUser(dispatch){
//   return (username) => {
//     const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/user/${username}`
//     fetch(url).then(res => {
//       return res.json()
//     }).then(json => {
//       console.log("XYZ", json)
//       dispatch({type: "POSTS_SUCCESS", payload: json})
//     })
//   }
// }




export function signup(dispatch){
  return (body) => {
    console.log("SIGNINGUPX")
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/signup`
    const params = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }
    fetch(url, params).then(res => {
      return res.json()
    }).then(json => {
      console.log("GOOD-createUser", json)
      // dispatch({type: "POSTS_SUCCESS", payload: json})
    }).catch((err) => {
      console.log("ERR-createUser", err)
    })
  }
}

export function fetchUser(dispatch){
  return (username, token = DEFAULT_TOKEN) => {
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/user/${username}`
    const params = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
    fetch(url, params).then(res => {
      return res.json()
    }).then(json => {
      console.log("GOOD-fetchUser", json)
      // dispatch({type: "POSTS_SUCCESS", payload: json})
    }).catch((err) => {
      console.log("ERR-fetchUser", err)
    })
  }
}

export function login(dispatch){
  return (username, password, token = DEFAULT_TOKEN) => {
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/login`
    const params = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        username,
        password,
      })
    }
    fetch(url, params).then(res => {
      return res.json()
    }).then(json => {
      console.log("GOOD-login", json)
      // dispatch({type: "POSTS_SUCCESS", payload: json})
    }).catch((err) => {
      console.log("ERR-login", err)
    })
  }
}

export function endorseUser(dispatch){
  return (body, token = DEFAULT_TOKEN) => {
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
}





