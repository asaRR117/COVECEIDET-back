const { Schema, model } = require("mongoose");

const LibroSchema = Schema ({

    titulo: {
        type: String,
        required: true,
        unique: true
    },
    autor: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    referencia: {
        type: String,
        required: true,
        unique: true
    }

});

module.exports = model ('Libro', LibroSchema);