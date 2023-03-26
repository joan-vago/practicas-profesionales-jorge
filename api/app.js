require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const conexion = require('./config/database');
const PORT = process.env.PORT
const session = require('express-session');
const bcryptjs = require('bcryptjs');
const path = require('path')
const rolRuta = require('./app/rutas/rol.ruta')
const usuariosRuta = require('./app/rutas/usuarios.ruta')
const elementosRuta = require('./app/rutas/elementos.ruta')
const asistenciasRuta = require('./app/rutas/asistencias.ruta')


app.use(cors());
app.use(express.json());


app.use(express.urlencoded({extended:true}));
app.use(express.json({
  type: "*/*"
}));

//rutas de usuario
app.use(usuariosRuta)

//rutas de rol de servicio
app.use(rolRuta)

//rutas de elementos
app.use(elementosRuta)

//ruta para asistencias
app.use(asistenciasRuta)








app.listen(PORT, (req,res)=>{
  console.log(`http://localhost:${PORT}`)
})