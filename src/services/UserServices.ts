import { jwtDecode } from "jwt-decode";
import { FAIL_MESSAGE } from "../constants/constants";

export function logout(dispatch, getState){
  return () => {
    dispatch({type: "LOGOUT"})
  }
}

export function signup(dispatch){
  return (body) => {
    console.log("SIGNINGUPX", body)
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/signup`
    const params = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({...body, techStack: body.techStack.map(item => item.name)})
      body: JSON.stringify(body)
    }
    fetch(url, params).then(res => {
      return res.json()
    }).then(json => {
      console.log("BEFOREDECODE-signup", json)
      if(json.error){
        dispatch({type: "LOGIN_ERROR"})
      }else{
        const decodedToken = jwtDecode(json.token)
        console.log("GOOD-signup", json, decodedToken)
        dispatch({type: "LOGIN_SUCCESS", payload: {
          auth: {
            token: json.token,
            username: body.username,
            userId: decodedToken.sub
          },
          user: {
            id: decodedToken.sub,
            username: body.username,
            bio: body.bio,
            email: body.email,
            fullname: body.fullname, // this ones casing is different
            // industryInvolvement: body.industryInvolvement,
            // interestAreas: body.interestAreas,
            currentCompany: body.currentCompany,
            linkedinUrl: body.linkedinUrl,
            // occupationalAreas: body.workCategories,
            techStack: body.techStack,
          }
        }})
        dispatch({
          type: "API_CALL_RESULT",
          payload: {message: "Account has been successfully created", active: true, error: false}
        })
      }
      
    }).catch((err) => {
      console.log("ERR-signup", err)
      dispatch({type: "LOGIN_ERROR"})
      dispatch({
        type: "API_CALL_RESULT",
        payload: {message: `Signup ${FAIL_MESSAGE}`, active: true, error: true}
      })
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
      if(json.error && json.error === "Invalid username or password"){
        dispatch({
          type: "API_CALL_RESULT",
          payload: {message: `Login failed due to an invalid username or email and/or an invalid password`, active: true, error: true}
        })
      }else{
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
            user: {
              id: json.userDetails.id,
              username: json.userDetails.username,
              fullname: json.userDetails.fullName,
              email: json.userDetails.email,
              bio: json.userDetails.bio,
              currentCompany: json.userDetails.currentCompany,
              linkedinUrl: json.userDetails.linkedin_url,
              techStack: json.userDetails.techstack // .map(item => item.name),
            }
          }
        })
      }
    }).catch((err) => {
      console.log("ERR-login", err)
      dispatch({
        type: "API_CALL_RESULT",
        payload: {message: `Login ${FAIL_MESSAGE}`, active: true, error: true}
      })
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
    // const url = `ec2-44-201-178-172.compute-1.amazonaws.com/user/${username}`
    const params = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
    fetch(url, params).then(res => {
      console.log("USERW")
      return res.json()
    }).then(json => {
      console.log("GOOD-fetchUser", json)
      dispatch({type: "USER_SUCCESS", payload: {
        ...json.userDetails,
        techStack: json.vendors?.map(
          item => ({
            id: item.vendorId,
            name: item.vendorName,
            endorsed: item.endorsedByRequester,
            // TODO endorsementCount: item.endorsementCount,
          })
        ) || []
      }})
    }).catch((err) => {
      console.log("ERR-fetchUser", err)
    })
  }
}

export function endorseUser(dispatch, getState){
  return (user, item) => {
    const store = getState();
    const {userId, token} = store.auth;
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/endorse`;
    const body = {
      endorseeUsername: user.username,
      vendorId: item.id
    }
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
      dispatch({type: "USER_ENDORSE_SUCCESS", payload: {user, item}})
      dispatch({
        type: "API_CALL_RESULT",
        payload: {message: "Endorsement has been successful", active: true, error: false}
      })
    }).catch((err) => {
      console.log("ERR-endorseUser", err)
      dispatch({
        type: "API_CALL_RESULT",
        payload: {message: `Endorsement ${FAIL_MESSAGE}`, active: true, error: true}
      })
    })
  }
}

export function editUser(dispatch, getState){
  return (body) => {
    const state = getState()
    const formattedBody = {
      id: state.auth.userId,
      fullname: body.fullname,
      email: body.email,
      techstack: body.techStack,
      bio: body.bio,
      company: body.currentCompany,
      linkedin: body.linkedinUrl,
    }
    console.log("STW", state, body, formattedBody)
    const {userId, token} = state.auth;
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/editProfile`
    const params = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formattedBody)
    }
    fetch(url, params).then(res => {
      return res.json()
    }).then(json => {
      dispatch({type: "USER_EDIT_SUCCESS", payload: formattedBody})
      dispatch({type: "API_CALL_RESULT", payload: {message: "Profile has been successfully updated", active: true, error: false}})
      console.log("GOOD-editUser", json)
    }).catch((err) => {
      dispatch({
        type: "API_CALL_RESULT",
        payload: {message: `Editing profile ${FAIL_MESSAGE}`, active: true, error: true}
      })
      console.log("ERR-editUser", err)
    })
  }
}





