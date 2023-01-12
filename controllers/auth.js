const { response } = require('express');
const Login = require('../models/Login');
const Autoria = require('../models/Autoria');
const Contacto = require('../models/Contacto');
const Desarrollo = require('../models/Desarrollo');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { db } = require('../models/Login');
const Divulgacion = require('../models/Divulgacion');
const Estancia = require('../models/Estancia');
const Gacademico = require('../models/Gacademico');
const Iacademica = require('../models/Iacademica');
const Itecnologica = require('../models/Itecnologica');
const Libro = require('../models/Libro');
const Ogrado = require('../models/Ogrado');
const Patente = require('../models/Patente');
const Pinvestigacion = require('../models/Pinvestigacion');
const Revista = require('../models/Revista');
const Sni = require('../models/Sni');


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
        const dbUser = new Login( req.body );
        
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
            email,
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
            email,
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

        const { uid } = req;

        const dbUser  = await Login.findById( uid );
        console.log(dbUser);
        const token = await generarJWT(uid, dbUser.name);

    return res.json({
        ok: true,
        uid,
        //name,
        email: dbUser.email,
        name: dbUser.name,
        token
    });
}

const agregarAutoria = async(req, res) => {

    try {
        
        const elementoAutoria = new Autoria (req.body);

        await elementoAutoria.save();
        
        return res.json({
            ok: true,
            msg: 'Autoria agregada correctamente'
        });

    } catch (error) {
         console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comunicate con el administrador'
        });
    }
   
}

const agregarContacto = async(req, res) => {
   // const { correop, correoins, numero } = req.body
   console.log(req.body);
    try {
        
        const elementoContacto = new Contacto (req.body);

        await elementoContacto.save();
        
        return res.json({
            ok: true,
            msg: 'Contacto agregado correctamente'
        });

    } catch (error) {
         console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comunicate con el administrador'
        });
    }
   
}

const agregarDesarrollo = async(req, res) => {
    // const { correop, correoins, numero } = req.body
    //console.log(req.body);
     try {
         
         const elementoDesarrollo = new Desarrollo (req.body);
 
         await elementoDesarrollo.save();
         
         return res.json({
             ok: true,
             msg: 'Desarrollo agregado correctamente'
         });
 
     } catch (error) {
          console.log(error);
         return res.status(500).json({
             ok: false,
             msg: 'Comunicate con el administrador'
         });
     }
    
 }

 const agregarDivulgacion = async(req, res) => {
    // const { correop, correoins, numero } = req.body
    //console.log(req.body);
     try {
         
         const elementoDivulgacion = new Divulgacion (req.body);
 
         await elementoDivulgacion.save();
         
         return res.json({
             ok: true,
             msg: 'Divulgacion agregada correctamente'
         });
 
     } catch (error) {
          console.log(error);
         return res.status(500).json({
             ok: false,
             msg: 'Comunicate con el administrador'
         });
     }
    
 }

 const agregarPinvestigacion = async(req, res) => {
    // const { correop, correoins, numero } = req.body
    //console.log(req.body);
     try {
         
         const elementoPinvestigacion = new Pinvestigacion (req.body);
 
         await elementoPinvestigacion.save();
         
         return res.json({
             ok: true,
             msg: 'Proyecto de investigacion agregado correctamente'
         });
 
     } catch (error) {
          console.log(error);
         return res.status(500).json({
             ok: false,
             msg: 'Comunicate con el administrador'
         });
     }
    
 }

 const agregarEstancia = async(req, res) => {
    // const { correop, correoins, numero } = req.body
    //console.log(req.body);
     try {
         
         const elementoEstancia = new Estancia (req.body);
 
         await elementoEstancia.save();
         
         return res.json({
             ok: true,
             msg: 'Estancia agregada correctamente'
         });
 
     } catch (error) {
          console.log(error);
         return res.status(500).json({
             ok: false,
             msg: 'Comunicate con el administrador'
         });
     }
    
 }

 const agregarGacademico = async(req, res) => {
    // const { correop, correoins, numero } = req.body
    //console.log(req.body);
     try {
         
         const elementoGacademico = new Gacademico (req.body);
 
         await elementoGacademico.save();
         
         return res.json({
             ok: true,
             msg: 'Grado academico agregado correctamente'
         });
 
     } catch (error) {
          console.log(error);
         return res.status(500).json({
             ok: false,
             msg: 'Comunicate con el administrador'
         });
     }
    
 }

 const agregarIacademica = async(req, res) => {
    // const { correop, correoins, numero } = req.body
    //console.log(req.body);
     try {
         
         const elementoIacademica = new Iacademica (req.body);
 
         await elementoIacademica.save();
         
         return res.json({
             ok: true,
             msg: 'Informacion academica agregada correctamente'
         });
 
     } catch (error) {
          console.log(error);
         return res.status(500).json({
             ok: false,
             msg: 'Comunicate con el administrador'
         });
     }
    
 }

 const agregarItecnologica = async(req, res) => {
    // const { correop, correoins, numero } = req.body
    //console.log(req.body);
     try {
         
         const elementoItecnologica = new Itecnologica (req.body);
 
         await elementoItecnologica.save();
         
         return res.json({
             ok: true,
             msg: 'Implementacion tecnologica agregada correctamente'
         });
 
     } catch (error) {
          console.log(error);
         return res.status(500).json({
             ok: false,
             msg: 'Comunicate con el administrador'
         });
     }
    
 }

 const agregarLibro = async(req, res) => {
    // const { correop, correoins, numero } = req.body
    //console.log(req.body);
     try {
         
         const elementoLibro = new Libro (req.body);
 
         await elementoLibro.save();
         
         return res.json({
             ok: true,
             msg: 'Libro agregado correctamente'
         });
 
     } catch (error) {
          console.log(error);
         return res.status(500).json({
             ok: false,
             msg: 'Comunicate con el administrador'
         });
     }
    
 }

 const agregarOgrado = async(req, res) => {
    // const { correop, correoins, numero } = req.body
    //console.log(req.body);
     try {
         
         const elementoOgrado = new Ogrado (req.body);
 
         await elementoOgrado.save();
         
         return res.json({
             ok: true,
             msg: 'Obtencion de grado agregado correctamente'
         });
 
     } catch (error) {
          console.log(error);
         return res.status(500).json({
             ok: false,
             msg: 'Comunicate con el administrador'
         });
     }
    
 }

 const agregarPatente = async(req, res) => {
    // const { correop, correoins, numero } = req.body
    //console.log(req.body);
     try {
         
         const elementoPatente = new Patente (req.body);
 
         await elementoPatente.save();
         
         return res.json({
             ok: true,
             msg: 'Patente agregada correctamente'
         });
 
     } catch (error) {
          console.log(error);
         return res.status(500).json({
             ok: false,
             msg: 'Comunicate con el administrador'
         });
     }
    
 }


 const agregarRevista = async(req, res) => {
    // const { correop, correoins, numero } = req.body
    //console.log(req.body);
     try {
         
         const elementoRevista = new Revista (req.body);
 
         await elementoRevista.save();
         
         return res.json({
             ok: true,
             msg: 'Revista agregada correctamente'
         });
 
     } catch (error) {
          console.log(error);
         return res.status(500).json({
             ok: false,
             msg: 'Comunicate con el administrador'
         });
     }
    
 }

 const agregarSni = async(req, res) => {
    // const { correop, correoins, numero } = req.body
    //console.log(req.body);
     try {
         
         const elementoSni = new Sni (req.body);
 
         await elementoSni.save();
         
         return res.json({
             ok: true,
             msg: 'SNI agregado correctamente'
         });
 
     } catch (error) {
          console.log(error);
         return res.status(500).json({
             ok: false,
             msg: 'Comunicate con el administrador'
         });
     }
    
 }

module.exports = {
    crearUsuario,
    loginUsuario,
    renewUsuario,
    agregarAutoria,
    agregarContacto,
    agregarDesarrollo,
    agregarDivulgacion,
    agregarEstancia,
    agregarGacademico,
    agregarIacademica,
    agregarItecnologica,
    agregarLibro,
    agregarOgrado,
    agregarPatente,
    agregarPinvestigacion,
    agregarRevista,
    agregarSni
}
