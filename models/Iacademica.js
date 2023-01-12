const { Schema, model } = require("mongoose");

const IacademicaSchema = Schema ({

    nivel: {
        type: String,
        reuired: true
    },
    titulo: {
        type: String,
        reuired: true,
        unique: true
    },
    institucion: {
        type: String,
        reuired: true
    },
    year: {
        type: String,
        reuired: true
    }
});

module.exports = model ('Iacademica', IacademicaSchema);