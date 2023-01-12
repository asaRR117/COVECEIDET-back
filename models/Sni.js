const { Schema, model } = require("mongoose");

const SniSchema = Schema ({

    nivel: {
        type: String,
        require: true
    },
    year: {
        type: String,
        require: true
    }

});

module.exports = model ('Sni', SniSchema);