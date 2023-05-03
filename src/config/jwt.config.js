const jwt = require('jsonwebtoken');

const getToken = (paylod) =>{

    return jwt.sign({
        data: paylod
    },process.env.JWT_SECRET, {expiresIn:'12h'});
}

const getTokenData = (token) =>{
    
    let data = null;
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            console.log('Error al obtener el token');
        }else{
            data = decoded;
        }
    });

    return data;
}

module.exports = {
    getToken,
    getTokenData
}