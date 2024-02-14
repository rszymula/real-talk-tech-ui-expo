import { jwtDecode } from "jwt-decode";

export function signup(dispatch){
  return (body) => {
    console.log("SIGNINGUPX", body)
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
      console.log("BEFOREDECODE-signup", json)
      const decodedToken = jwtDecode(json.token)
      console.log("GOOD-signup", json, decodedToken)
      dispatch({type: "LOGIN_SUCCESS", payload: {token: json.token, userId: decodedToken.sub}})
    }).catch((err) => {
      console.log("ERR-signup", err)
    })
  }
}

export function login(dispatch){
  return (username, password) => {
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/login`
    console.log("LOGINX", {username, password})
    const params = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    }
    fetch(url, params).then(res => {
      return res.json()
    }).then(json => {
      console.log("BEFOREDECODE-login", json)
      const decodedToken = jwtDecode(json.token)
      console.log("GOOD-login", json, decodedToken)
      // dispatch({type: "POSTS_SUCCESS", payload: json})
      dispatch({type: "LOGIN_SUCCESS", payload: {token: json.token, username, userId: decodedToken.sub}})
    }).catch((err) => {
      console.log("ERR-login", err)
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





