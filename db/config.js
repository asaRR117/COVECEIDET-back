const mongoose = require('mongoose');

const dbConnection = async() =>{

    try {
        
        await mongoose.connect( process.env.DB_CON, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Base de datos conectada');

    } catch (error) {
        console.log(error);
        throw new Error('No hay conexion con la base de datos'); 
    }
}

module.exports = {
    dbConnection
}