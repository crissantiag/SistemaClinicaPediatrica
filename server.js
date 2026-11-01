const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Servidor http
const app = express();

// Configuraciones al servidor http
app.use(bodyParser.json());
app.use(cors());

// Conexión a la base de datos (sin opciones obsoletas)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Conexión a MongoDB exitosa"))
    .catch(err => console.error("Error al conectar a MongoDB: ", err));

// Rutas de la API
// Rutas para autenticación
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Rutas para pacientes
const pacienteRoutes = require('./routes/paciente');
app.use('/api/pacientes', pacienteRoutes);

// Configurar puerto para el backend
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});