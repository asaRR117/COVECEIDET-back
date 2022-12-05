const { Schema, model } = require('mongoose');


const LoginSchema = Schema( {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    rfc: {
        type: String,
        required: true,
        unique: true
    }

});

module.exports = model('Login', LoginSchema);