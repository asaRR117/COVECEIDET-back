const { Schema, model } = require("mongoose");

const ContactoSchema = Schema ({
    correop: {
        type: String,
        required: true,
    },
    correoins: {
        type: String,
        required: true,
    },
    numero: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = model ('Contacto', ContactoSchema);