const { Schema, model } = require("mongoose");

const ItecnologicaSchema = Schema ({

    tipo: {
        type:String,
        required: true
    },
    producto: {
        type:String,
        required: true
    },
    registro: {
        type:String,
        required: true,
        unique: true
    },
    fregistro: {
        type:String,
        required: true
    }
});

module.exports = model ('Itecnologica', ItecnologicaSchema);