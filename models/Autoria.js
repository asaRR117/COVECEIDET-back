const { Schema, model } = require("mongoose");

const AutoriaSchema = Schema( {
    titulo: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        required: true,
    },
    editorial: {
        type: String,
        required: true,
    }

} );

module.exports = model ('Autoria', AutoriaSchema);