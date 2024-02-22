


const DEFAULT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDgxMjIzOTIsImlhdCI6MTcwODExMTU5Miwic3ViIjo1fQ.MOSqFHPW1bYfVoax1T4S0TIj5WSzD0e73gDB0eViu60"


// Post ---------------------------------------------

function makePost(userId, title, body, categories, vendors, isAnonymous, token = DEFAULT_TOKEN) {
  const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/makePost`
  const params = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
      title,
      body,
      categories,
      vendors,
      isAnonymous,
    })
  }
  fetch(url, params).then(res => {
    return res.json()
    // return res.text()
  }).then(json => {
    console.log("GOOD-makePost", json)
    //dispatch({type: "POSTS_SUCCESS", payload: json})
  }).catch((err) => {
    console.log("ERR-makePost", err)
  })
}
// makePost(8, "sometitle", "somebody", ["Engineering", "Operations"],[], false)
// makePost(8, "sometitle", "sombody", [1, 2],[1, 4, 6], false)

function fetchPosts(categoryId, userId, token = DEFAULT_TOKEN, page) {
  const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/feed?categoryId=2&page=2&count=3`
  const params = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }
  console.log("POSTSZ", url)
  fetch(url, params).then(res => {
    return res.json()
  }).then(json => {
    console.log("GOOD-fetchPosts", json)
    // dispatch({type: "POSTS_SUCCESS", payload: {category: categories.find(cat => cat.id === categoryId)?.name, data: json.posts}})
  }).catch((err) => {
    console.log("ERR-fetchPosts", err)
  })
}
fetchPosts(2, 8, DEFAULT_TOKEN, 2);










// Comment -----------------------

function fetchComments(postId, token = DEFAULT_TOKEN, page = 1) {
  const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/getCommentsForPost?postId=${postId}`
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
    console.log("GOOD-fetchComments", json)
    // dispatch({type: "POSTS_SUCCESS", payload: json.posts})
  }).catch((err) => {
    console.log("ERR-fetchComments", err)
  })
}
fetchComments(1)

function makeComment(userId, postId, text, taggedUsernames = [], token = DEFAULT_TOKEN) {
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/makeComment`
    const params = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId,
        userId,
        taggedUsernames: taggedUsernames,
        commentText: text,
      })
    }
    fetch(url, params).then(res => {
      return res.json()
      // return res.text()
    }).then(json => {
      console.log("GOOD-makeComment", json)
      // dispatch({type: "POSTS_SUCCESS", payload: json})
    }).catch((err) => {
      console.log("ERR-makeComment", err)
    })
  }
//makeComment(1, 1, "mycomment", []);

// const TEMP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDgxMjIzOTIsImlhdCI6MTcwODExMTU5Miwic3ViIjo1fQ.MOSqFHPW1bYfVoax1T4S0TIj5WSzD0e73gDB0eViu60"

function fetchOnboarding() {
  const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/onboard`
  const params = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${TEMP_TOKEN}`,
    },
    // body: JSON.stringify({
    //   postId,
    //   userId,
    //   taggedUsernames: taggedUsernames,
    //   commentText: text,
    // })
  }
  fetch(url, params).then(res => {
    return res.json()
    // return res.text()
  }).then(json => {
    console.log("GOOD-fetchOnboarding", json)
    // dispatch({type: "POSTS_SUCCESS", payload: json})
    // dispatch({type: "ONBOARDING_SUCCESS", payload: json})
  }).catch((err) => {
    console.log("ERR-fetchOnboarding", err)
  })
}

fetchOnboarding();


