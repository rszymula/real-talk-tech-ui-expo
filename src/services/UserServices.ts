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
      dispatch({type: "LOGIN_SUCCESS", payload: {token: json.token, user: { id: decodedToken.sub}}})
      dispatch({type: "API_CALL_RESULT", payload: {message: "Account has been successfully created", active: true, error: false}})
    }).catch((err) => {
      console.log("ERR-signup", err)
    })
  }
}

export function login(dispatch){
  return (username, password) => {
    dispatch({type: "LOGIN_LOADING"})
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
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          auth: {
            token: json.token,
            username,
            userId: decodedToken.sub
          },
          user: json.userDetails
        }
      })
    }).catch((err) => {
      console.log("ERR-login", err)
      dispatch({type: "LOGIN_ERROR"})
    })
  }
}

export function fetchOnboarding(dispatch) {
  return () => {
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/onboard`
    const params = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    }
    fetch(url, params).then(res => {
      return res.json()
    }).then(json => {
      console.log("GOOD-fetchOnboarding", json)
      dispatch({type: "ONBOARDING_SUCCESS", payload: json})
    }).catch((err) => {
      console.log("ERR-fetchOnboarding", err)
    })
  }
}

export function fetchUser(dispatch){
  return (username, auth) => {
    dispatch({type: "USER_LOADING"})
    const {userId, token} = auth;
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
      dispatch({type: "USER_SUCCESS", payload: json.userDetails})
    }).catch((err) => {
      console.log("ERR-fetchUser", err)
    })
  }
}

export function endorseUser(dispatch){
  return (body, auth) => {
    const {userId, token} = auth;
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
    }).then(json => {
      console.log("GOOD-endorseUser", json)
    }).catch((err) => {
      console.log("ERR-endorseUser", err)
    })
  }
}

export function editUser(dispatch, getState){
  return (body) => {
    const state = getState()
    console.log("STW", state)
    const {userId, token} = state.auth;
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/editProfile`
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
    }).then(json => {
      console.log("GOOD-editUser", json)
    }).catch((err) => {
      console.log("ERR-editUser", err)
    })
  }
}





