const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renewUsuario, agregarAutoria, agregarContacto, agregarDesarrollo, agregarDivulgacion, agregarEstancia, agregarGacademico, agregarIacademica, agregarItecnologica, agregarLibro, agregarOgrado, agregarPatente, agregarPinvestigacion, agregarRevista, agregarSni } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// Crear nuevo usuario
router.post( '/new', [

    check('email', 'El correo electrónico es obligatorio').isEmail(),
    check('name', 'El nombre no puede estar vacío').not().isEmpty(),
    check('apellidos', 'Este campo no puede estar vacío').not().isEmpty(),
    check('rfc', 'Verificar rfc').isLength({ min:13, max:13 }),
    check('password', 'El password debe tenter al menos 6 caracteres').isLength({ min: 8}),
    validarCampos

], crearUsuario);

// Login de usuario
router.post( '/', [
    
        check('email', 'Asiga un correo electrónico valido').isEmail(),
        check('password', 'El password no cumple con los requisitos mínimos de seguridad').isLength({ min: 8}),
        check('rfc', 'Verifica tu RFC').isLength({ min:13, max:13 }),
        validarCampos
    
], loginUsuario);

// Validar y revalidar token
router.get( '/renew', validarJWT, renewUsuario);


// Subir documentos


router.post( '/adscripciones', (req, res) => {
    return res.json({
        ok: true,
        mmsg: 'upload documento'
    
    });
} );

router.post( '/produccion_cientifica', (req, res) => {
    return res.json({
        ok: true,
        mmsg: 'upload documento'
    
    });
} );

router.post( '/autoria', agregarAutoria);

/*
router.post( '/contacto', [
    check('correop', 'Correo personal no valido').isEmail,
    check('correoins', 'Correo institucional no valido').isEmail,
    check('numero', 'Numero de contacto incorreco').isLength({min:10, max:10})
    ], agregarContacto);
    */
router.post( '/contacto', agregarContacto);
/*
router.post( '/contacto', (req, res) => {
    return res.json({
        ok: true,
        mmsg: 'cargar contacto'
    
    });
} );
*/
router.post( '/desarrollo', agregarDesarrollo);

router.post( '/divulgacion_cientifica', agregarDivulgacion);

router.post( '/estancias', agregarEstancia);

router.post( '/grado_academico', agregarGacademico);

router.post( '/informacion_academica', agregarIacademica);

router.post( '/implementacion_tecnologica', agregarItecnologica);

router.post( '/libros', agregarLibro);

router.post( '/obtencion_grado', agregarOgrado);

router.post( '/patentes', agregarPatente);

router.post( '/proyectos_investigacion', agregarPinvestigacion);

router.post( '/revistas', agregarRevista);

router.post( '/sni', agregarSni);



module.exports = router;