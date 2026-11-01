// Importando el modelo de Paciente
const Paciente = require('../models/Paciente');

// Funcion para traer pacientes
exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Funcion para crear pacientes
exports.addPaciente = async (req, res) => {
    // Extraemos todos los campos que envía el cliente
    const { nombre, telefono, correo, direccion } = req.body;
    
    const paciente = new Paciente({ 
        nombre, 
        telefono, 
        correo, 
        direccion 
    });

    try {
        await paciente.save();
        res.status(201).json(paciente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    } 
};

// Funcion para actualizar Pacientes
exports.updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, correo, direccion } = req.body;

    try {
        // Actualizamos todos los campos enviados
        const paciente = await Paciente.findByIdAndUpdate(
            id, 
            { nombre, telefono, correo, direccion }, 
            { new: true, runValidators: true }
        );

        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        } else {
            res.status(200).json(paciente);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    } 
};

// Funcion para eliminar Pacientes
exports.deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const pacienteEliminado = await Paciente.findByIdAndDelete(id);
        if (!pacienteEliminado) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.status(200).json({ message: 'Paciente eliminado' }); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    } 
};