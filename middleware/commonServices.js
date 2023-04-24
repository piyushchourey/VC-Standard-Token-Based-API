var hexgen = require('hex-generator');

genrateEncryptedToken = (length,uid)=>{
    let strPart1 = uid.substr(0,6);  let strPart2 = uid.substr(6,12);  let strPart3 = uid.substr(18,24);  
    return hexgen(length)+'-'+strPart1+'-'+hexgen(length)+'-'+strPart2+'-'+hexgen(length)+'-'+strPart3;
}

refreshToken = (length) =>{
    return String(Date.now())+Math.floor(Math.random()*100)+'-'+hexgen(length)
}

module.exports = {
    genrateEncryptedToken,
    refreshToken
}