export const api = 'http://localhost:2000/api/'
export const generatePublicUrl = (fileName) =>{
    return `http://localhost:2000/public/${fileName}`
}

// export const api = 'https://geekgram-rest-server.herokuapp.com/api/'
// export const generatePublicUrl = (fileName) =>{
//     return `http://geekgram-rest-server.herokuapp.com/public/${fileName}`
// }
// export const api = 'http://ec2-3-15-169-42.us-east-2.compute.amazonaws.com:2000/api/'
// export const generatePublicUrl = (fileName) =>{
//     return `http://ec2-3-15-169-42.us-east-2.compute.amazonaws.com:2000/public/${fileName}`
// }