export default function getFetchOptions(method,body){
    return {
        method:`${method}`,
        headers:{
            'Content-type': 'application/json'
          },
          body: JSON.stringify(body)
    }
};
