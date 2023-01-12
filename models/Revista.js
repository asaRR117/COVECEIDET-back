const { Schema, model } = require("mongoose");

const RevistaSchema = Schema ({

    articulo: {
        type: String,
        require: true,
        unique: true
    },
    autor: {
        type: String,
        require: true
    },
    fpublicacion: {
        type: String,
        require: true
    },
    faceptacion: {
        type: String,
        require: true
    },
    revista: {
        type: String,
        require: true
    }

});

module.exports =  model ('Revista', RevistaSchema);