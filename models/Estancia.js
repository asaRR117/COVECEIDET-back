const { Schema, model } = require("mongoose");

const EstanciaSchema = Schema ({

    institucion: {
        type: String,
        required: true
    },
    proyecto: {
        type: String,
        required: true
    },
    finicio: {
        type: String,
        required: true
    },
    ftermino: {
        type: String,
        required: true
    }

});

module.exports = model ('Estancia', EstanciaSchema);