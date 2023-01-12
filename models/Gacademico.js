const { Schema, model } = require("mongoose");

const GacademicoSchema = Schema ({

    nivel:{
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true,
        unique: true
    },
    institucion: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

module.exports = model ('Gacademico', GacademicoSchema);