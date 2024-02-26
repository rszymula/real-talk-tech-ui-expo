export function checkHasAll(list, obj){
  const keys = Object.keys(obj);
  const hasAll = list.every(id => keys.includes(`${id}`))
  return hasAll
}

export function getCount(list, obj){
  console.log("FUZZW", list, obj)
  const count = list.reduce((accum, curr) => {
    if(obj[curr]){
      accum += 1
    }
    return accum;
  }, 0)
  console.log("COUNTW", count)
  return count
}
