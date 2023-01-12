const { Schema, model } = require("mongoose");

const DesarrolloSchema = Schema ({
    area: {
        type: String,
        required: true
    },
    campo: {
        type: String,
        required: true
    },
    disciplina: {
        type: String,
        required: true
    },
    ques1: {
        type: String,
        required: true
    },
    ques2: {
        type: String,
        required: true
    },
    ques3: {
        type: String,
        required: true
    },
    ques4: {
        type: String,
        required: true
    }

});

module.exports = model ('Desarrollo', DesarrolloSchema);