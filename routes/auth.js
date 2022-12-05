const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renewUsuario } = require('../controllers/auth');
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


module.exports = router;