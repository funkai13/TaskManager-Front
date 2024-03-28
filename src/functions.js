import axios from 'axios'



export async function sendRequest({method:method, url:url, data:params}) {
  let res;
  await axios({method:method, url:url, data:params}).then(
    response=>{
      res=response.data.status;
    }).catch((errors)=>{
      let desc='';
      res = errors.response.data.status
      errors.response.data.errors.map((e)=>{desc=desc+e})
      console.log(res)

  })
  return res;
}
