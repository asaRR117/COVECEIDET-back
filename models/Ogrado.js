const { Schema, model } = require("mongoose");

const OgradoSchema = Schema ({

    nombre: {
        type: String,
        required: true
    },
    institucion: {
        type: String,
        required: true
    },
    grado: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        required: true
    }

});

module.exports = model ('Ogrado', OgradoSchema);