const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    const payload = { uid, name };

    return new Promise( (resolve, reject) => {

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '1h'
        }, (err, token) => {
    
            if ( err ) {
                // Mal
                console.log(err);
                reject(err);
                
            } else {
                // Todo OK
                resolve(token);
    
            }
        } )

    });   

}

module.exports = {
    generarJWT
}