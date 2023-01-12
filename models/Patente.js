const { Schema, model } = require("mongoose");

const PatenteSchema = Schema ({

    tipo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    registro: {
        type: String,
        required: true,
        unique: true
    },
    fecha: {
        type: String,
        required: true
    },
    referencia: {
        type: String,
        required: true
    }

});

module.exports = model ('Patente', PatenteSchema);