import moment from "moment"

export function getDateText(createdTimestamp){
  // console.log(createdTimestamp)
  // console.log(new Date())
  // console.log(moment.utc(new Date()))

  // const MS_IN_MIN = 60000
  console.log("DATEW",
    createdTimestamp,
    new Date(createdTimestamp),
    moment(new Date(createdTimestamp)),
    moment(new Date(createdTimestamp)).local(),
    moment(new Date(createdTimestamp)).local,
    moment.utc(new Date(createdTimestamp)),
    moment.utc(createdTimestamp).local().format("YYYY-MM-DDTHH:mm:ss.SSSS")
  )
  // const res = moment(new Date(createdTimestamp)).local().fromNow()
  // const stamp = moment(new Date(createdTimestamp))
  // const now = moment(new Date());
  // const res = now.diff(stamp);
  // if(res)
  // console.log("RESSSS", res)
  const local = moment.utc(createdTimestamp).local().format("YYYY-MM-DDTHH:mm:ss.SSSS")
  const res = moment(local).fromNow()
  console.log("RESW", res)
  return res
}
