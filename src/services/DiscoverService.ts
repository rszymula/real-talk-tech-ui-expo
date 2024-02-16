
export enum CompanyType {
  DATABASE = 'Database',
  ANALYTICS = 'Analytics',
  CLOUD = 'Cloud',
  PERFORMANCE = 'Performance',
}

export const companies = [
  {
    id: 1,
    name: "Asana",
    type: CompanyType.DATABASE,
    description: "check us out",
    offices: 2,
    localEmployees: 35,
    totalEmployees: 35,
    image: null,
  },
  {
    id: 2,
    name: "Teamwork",
    type: CompanyType.CLOUD,
    description: "we work as a unit",
    offices: 2,
    localEmployees: 0,
    totalEmployees: 12,
    image: null,
  },
  {
    id: 3,
    name: "Zoho Projects",
    type: CompanyType.DATABASE,
    description: "we are a cool company",
    offices: 5,
    localEmployees: 105,
    totalEmployees: 256,
    image: null,
  },
  {
    id: 4,
    name: "Celoxis",
    type: CompanyType.DATABASE,
    description: "we do good work",
    offices: 1,
    localEmployees: 41,
    totalEmployees: 41,
    image: null,
  },
  {
    id: 5,
    name: "Ganttpro",
    type: CompanyType.ANALYTICS,
    description: "trust this place",
    offices: 23,
    localEmployees: 45,
    totalEmployees: 1024,
    image: null,
  },
];

export function getCompanies(page = 0, count = 5){
  return companies.filter((item, idx) => idx >= page * count && idx < (page + 1) * count);
}

export function getCompany(id){
  return companies.find(item => item.id === id);
}

// export function fetchVendors(dispatch){
//   return (page = 1) => {
//     const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/getCommentsForPost?postId=45`
//     fetch(url).then(res => {
//       return res.json()
//     }).then(json => {
//       console.log("VENDORS", json)
//       dispatch({type: "VENDORS_SUCCESS", payload: json.posts})
//     })
//   }
// }

export function fetchVendors(dispatch){
  return (auth, page = 1) => {
    console.log("FVW2")
    const {userId, token} = auth;
    const url = `http://ec2-3-95-180-146.compute-1.amazonaws.com/discover/categories`;
    // const url2 = `http://ec2-3-95-180-146.compute-1.amazonaws.com/discover/items/1`;
    // const url3 = `http://ec2-3-95-180-146.compute-1.amazonaws.com/discover/user/1`;
    const params = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
    fetch(`${url}`, params).then(res => {
      console.log("FVW3")
      return res.json()
    }).then(json => {
      // console.log("FVW5", json)
      // console.log("FVW4", json)
      console.log("JJJ", json)
      // const groups = json.categories

      const groups = [1, 2, 3, 4, 5]
      Promise.all(groups.map(group => fetch(`${url}/${group}`, params)))
        .then(responses =>
          Promise.all(responses.map(res => res.json()))
        ).then(jsons => {
          // return jsons
          const res = {
            vendors: jsons,
            vendorGroups: groups,
          }
          console.log("VENDORS", res)
          dispatch({type: "VENDORS_SUCCESS", payload: res})
        })
      console.log("VENDORS", json)
      dispatch({type: "VENDORS_SUCCESS", payload: json})
    })
  }
}

