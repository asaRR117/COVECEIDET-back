const { Schema, model, models } = require("mongoose");

const DivulgacionSchema = Schema ({

    nombre: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    revista: {
        type: String,
        required: true
    },
    faceptacion: {
        type: String,
        required: true
    },
    fpublicacion: {
        type: String,
        required: true
    }
});

module.exports = model ('Divulgacion', DivulgacionSchema);