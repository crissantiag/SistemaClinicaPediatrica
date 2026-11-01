const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        required: true
    },
    telefono: {
        type: String
    },
    correo: {
        type: String
    },
    direccion: {
        type: String
    }
});

module.exports = mongoose.model('Paciente', pacienteSchema);