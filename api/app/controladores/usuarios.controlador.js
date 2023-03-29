const conexion = require("../../config/database")
const bcryptjs = require('bcryptjs');
const session = require('express-session')
let ssn = require('../../app')
// const jwt = require('jsonwebtoken')

const getItems = (req, res) =>{ 
  // const sessionId2 = req.cookies.connect.sid;
  ssn = req.session

    conexion.conexion.query('SELECT * FROM usuarios ORDER BY tipo',(error,results)=>{
        if(error){
          throw error;
        }else{
          // console.log(sessionId2)
          let usuarios = results;
          res.send(JSON.stringify(usuarios)) 
        }
      })    

  }  

const getItem =  (req, res) =>{

}

const createItem = async (req, res) =>{
  const nombre = req.body.nombre;
  const numEmpleado = req.body.numEmpleado;
  const password = req.body.password;
  const permiso = req.body.permiso;
  let passwordhash = await bcryptjs.hash(password, 10);
  conexion.conexion.query('INSERT INTO usuarios SET ?',{nombre:nombre, numero_empleado:numEmpleado, password:passwordhash, tipo:permiso}, async(error,results)=>{
    if(error){
      console.log(error);
        res.send({
          ruta: 'usuarios'
      })
    }else{
      conexion.conexion.query('SELECT * FROM usuarios',(error,results)=>{
    if(error){
      throw error;
    }else{
      res.send({
        ruta: 'usuarios'
      })
    }
  })    
    }
  })
}

const updateItem = async (req, res) =>{

  const numEmpleadoGet = req.body.numEmpleadoGet;
  const nombre = req.body.nombre;
  const numEmpleado = req.body.numEmpleado;
  const password = req.body.password;
  const permiso = req.body.permiso;
  let passwordhash = await bcryptjs.hash(password, 10);

  conexion.conexion.query('UPDATE usuarios SET ? WHERE numero_empleado = ?',[{nombre:nombre, numero_empleado:numEmpleado,  password:passwordhash, tipo:permiso},numEmpleadoGet], async(error,results)=>{
    if(error){
      console.log(error);
    }
  })

}

const deleteItem = (req, res) =>{
  const numEmpleado = req.params.id
  console.log(numEmpleado)
  conexion.conexion.query('DELETE FROM usuarios WHERE numero_empleado = ?',[numEmpleado],(error,results)=>{
    if (error) {
      console.log(error);
    }else{
      console.log("exito")
    }
    })
}

const auth = async (req,res)=>{
  const usuario = req.body.nombre_usuario;
  const password = req.body.password;
  let passwordHash = await bcryptjs.hash(password, 10);
  if(usuario && password){
    conexion.conexion.query('SELECT * FROM usuarios where numero_empleado = ?',     [usuario], async (error, results)=>{
      if(results.length == 0 || !(await bcryptjs.compare(password, results[0].password))){
        console.log("incorrecto")
        let autenticacion = "Usuario y / o contraseña incorrectas"
        let autenticacionJSON = {autenticacion:autenticacion}
        res.send(JSON.stringify(autenticacionJSON))
      }else{
        ssn = req.session
        console.log("contraeña correcta y usuario")
        ssn.login = true
        ssn.nombre = results[0].nombre
        ssn.tipo = results[0].tipo
        ssn.usuario = results[0].numero_empleado
        let nombre = ssn.nombre
        let tipo = ssn.tipo
        let sessionID = req.session.sessionID

          let autenticacion = "Acceso correcto"
          let autenticacionJSON = {session:sessionID,nombre:nombre,tipo: tipo,autenticacion:autenticacion}
          res.setHeader('Set-Cookie', ['type=ninja', 
  'language=javascript']);
          res.send(JSON.stringify(autenticacionJSON))
      
      }
    })
  }else{
     console.log("contraeña vacia")
        let autenticacion = "usuario o contraseña vacios"
        let autenticacionJSON = {autenticacion:autenticacion}
        res.send(JSON.stringify(autenticacionJSON))
  }
}

module.exports = {getItems, getItem, createItem, updateItem, deleteItem, auth}