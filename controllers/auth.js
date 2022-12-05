const { response } = require('express');
const Login = require('../models/Login');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { db } = require('../models/Login');

const crearUsuario = async(req, res = response) => {

    const { email, name, password, rfc, apellidos } = req.body;
    
    //console.log( req.body );
    try {

        // Verificar email
        const usuario = await Login.findOne( { email });
        const rfcusuario = await Login.findOne( { rfc });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario '+ email +' ya existe' 
            });
        }

        // Verificar rfc
        if ( rfcusuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El rfc '+ rfc +' ya existe' 
            });
        }

        // Crear usuario con el modelo
        const dbUser = new Login( req.body);
        
        // Encriptar password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt ) ;

        // Generar token
        const token = await generarJWT( dbUser.id, name ); 

        // Crear usuario en DB
        await dbUser.save();

        // Respuesta
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            apellidos,
            rfc,
            token
        });

    } catch (error) {
        
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Comunicate con el administrador por favor'
        });     
    }
    
}



const loginUsuario = async(req, res = response) => {

    const { email, password, rfc } = req.body;

    try {

        const dbUser = await Login.findOne({ email });

        if ( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario/ password es incorrecto, verifica tus credenciales'
            });
        }

        // Confirmar si el paswword es correcto
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if (!validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario/ password es incorrecto, verifica tus credenciales'
            });
        }

        // Validar RFC
        const validRFC = await Login.findOne({ rfc });

        if ( !validRFC ) {
            return res.status(400).json({
                ok: false,
                msg: 'El RFC proporcionado, no es  correcto; favor de validar su informacion'
            });
        }
        
        // Generar token
        const token = await generarJWT( dbUser.id, dbUser.name );

        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            apellidos: dbUser.apellidos,
            rfc: dbUser.rfc,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comunicate con el administrador'
        });
    }
    
}

const renewUsuario = async(req, res = response) => {

        const { uid, name } = req;

        const token = await generarJWT(uid, name);

    return res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewUsuario
}
