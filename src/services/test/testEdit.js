const DEFAULT_TOKEN = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDk2MDkxNDEsImlhdCI6MTcwOTU5ODM0MSwic3ViIjoxfQ.-xbu5-85HhJjN_jXVTX29Oyu1ws89c4Al_UpeVTwd-Q"

function edit(body, token = DEFAULT_TOKEN) {
  // const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/editProfile`
  const url = `http://localhost:5000/editProfile/1`
  const params = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
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

const body = {
  id: 1,
  fullname: 'Elon Gatesx',
  email: 'elongates@example.com',
  // techstack: [{id: 1, vendor_name: "flksdjflsdkjfldkfj"}],
  techstack: ["PayPal"],
  // techstack: [],
  bio: 'lkasjdlaskjdaslkdjasldkajldksajdlkasjdlkajsldkajslkdjaslkdjalskdjlaskjdlkasjldkajsldaksjdlaskdjalskdjalkdjlaskdjsddddx',
  company: 'SuperchargedSoftwarexsdfdf',
  linkedin: 'somelinkedINother',
}
edit(body, DEFAULT_TOKEN);
