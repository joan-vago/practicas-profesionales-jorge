const conexion = require("../../config/database")

const getItems = (req, res) =>{
  conexion.conexion.query('SELECT * FROM elementos',(error,result)=>{
    if(error){
      console.log(error)
      res.send({
        mensaje: 'ha ocurrido un error'
      })
    }else{
      let elementos = result;
      res.send(JSON.stringify(elementos)) 
    }
  })
}

const getItem = (req, res) =>{
   let numero_empleado = req.params.id
   conexion.conexion.query("SELECT numero_empleado,nombres,apellido_paterno,apellido_materno,telefono,telefono_adicional,correo,domicilio, date_format(fecha_ingreso, '%Y-%m-%d') AS fecha_ingreso,fecha_baja,estado FROM elementos WHERE numero_empleado = ?",[numero_empleado],(error,result)=>{
    if(error){
      console.log(error)
      res.send({
        mensaje: 'Ocurrio un error'
      })
    }else{
      let elemento = result
      res.send(JSON.stringify(elemento))
    }
   })
}

const updateItem = (req, res) =>{

}

const deleteItem = (req, res) =>{
  let numero_empleado = req.params.id
  let baja = 'baja'
  let fecha = new Date()
  conexion.conexion.query('UPDATE elementos SET ? WHERE numero_empleado = ?',[{estado:baja,fecha_baja:fecha},numero_empleado],(error,result)=>{
    if(error){
      console.log(error)
      res.send({
        error: true,
        mensaje: 'Ocurrio un error. no se ha podido dar de baja'
      })
    }else{
      conexion.conexion.query('DELETE FROM formato_1 WHERE numero_empleado = ?',[numero_empleado],(error1,result1)=>{
        if(error1){
          console.log(error1)
          res.send({
            error: true,
            mensaje: 'Ocurrio un error. no se ha podido dar de baja'
          })          
        }else{
          conexion.conexion.query('DELETE FROM formato_2 WHERE numero_empleado = ?',[numero_empleado],(error2,result2)=>{
            if(error2){
              console.log(error2)
              res.send({
                error: true,
                mensaje: 'Ocurrio un error. no se ha podido dar de baja'
              })
            }else{
              conexion.conexion.query('DELETE FROM formato_3 WHERE numero_empleado = ?',[numero_empleado],(error3,result3)=>{
                if(error3){
                  console.log(error3)
                }else{
                  res.send({
                    error: false,
                    mensaje: 'elemento dado de baja'
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}

const createItem = async (req, res) =>{
  let $numero_empleado = req.body.numero_empleado
  let $nombres =req.body.nombres
  let $apellido_paterno = req.body.apellido_paterno
  let $apellido_materno = req.body.apellido_materno
  let $telefono =req.body.telefono
  let $telefono_adicional =req.body.telefono_adicional
  let $correo = req.body.correo
  let $fecha_ingreso = req.body.fecha_ingreso
  let $domicilio = req.body.domicilio
  let estado = 'activo'

  conexion.conexion.query('INSERT INTO elementos SET ?',{numero_empleado: $numero_empleado ,nombres: $nombres, apellido_paterno: $apellido_paterno, apellido_materno: $apellido_materno, telefono: $telefono, telefono_adicional: $telefono_adicional, correo: $correo, fecha_ingreso: $fecha_ingreso, domicilio: $domicilio,estado: estado},(error,result)=>{
    if(error){
      console.log(error)
      res.send({
        mensaje: 'Ha ocurrido un error no se pudo agregar el elemento'
      })
    }else{
      conexion.conexion.query('INSERT INTO formato_1 SET ?',{numero_empleado: $numero_empleado, punto: 'Auxiliar'},(error,result)=>{
        if(error){
          console.log(`formato 1 ${error}`)
        }
      })
      conexion.conexion.query('INSERT INTO formato_2 SET ?',{numero_empleado: $numero_empleado, punto: 'Auxiliar'},(error,result)=>{
                if(error){
          console.log(`formato 2 ${error}`)
        }
      })
      conexion.conexion.query('INSERT INTO formato_3 SET ?',{numero_empleado: $numero_empleado, punto: 'Auxiliar'},(error,result)=>{
                if(error){
          console.log(`formato 3 ${error}`)
        }
      })
      res.send({
        mensaje: 'Los datos se han guardado correctamente'
      })
    }
  })
}

module.exports = {getItems, getItem, createItem, updateItem, deleteItem}