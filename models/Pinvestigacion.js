const { Schema, model } = require("mongoose");

const PinvestigacionSchema = Schema ({

    referencia: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    particion: {
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
    },
    area: {
        type: String,
        required: true
    },
    iprincipal: {
        type: String,
        required: true
    },
    iasociadas: {
        type: String,
        required: true
    },
    monto: {
        type: String,
        required: true
    },
    pderivados: {
        type: String,
        required: true
    },
    usuarios: {
        type: String,
        required: true
    }
    
});

module.exports = model ('Pinvestigacion', PinvestigacionSchema);