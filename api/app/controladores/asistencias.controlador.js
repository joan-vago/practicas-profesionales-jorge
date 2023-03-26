const conexion = require("../../config/database")

const getItems = (req, res) =>{
  let estado
  let formato





// Crear una instancia de la fecha de hoy
const hoy = new Date();

// Crear un array con los nombres de los días de la semana
const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Obtener el día de la semana de la fecha de hoy (0-6)
const diaSemanaNum = hoy.getDay();

// Obtener el nombre del día de la semana correspondiente al número obtenido anteriormente
const diaSemana = diasSemana[diaSemanaNum];

// Obtener el número de la semana correspondiente a la fecha actual
const numSemana = hoy.getWeek();

// Obtener el año correspondiente a la fecha actual
const anio = hoy.getFullYear();

let dia_entrada = `${diaSemana}_entrada` 
let dia_salida = `${diaSemana}_salida`
let t_asistencias = `asistencias_${anio}_w${numSemana}`

  conexion.conexion.query('select * from formato_auth where estado = "activo"',(error,result)=>{
    if(error){
      console.log(error)
      res.send({
        mensaje: 'ocurrio errror en cosultar el estado de los formatos'
      })
    }else{
      estado = result
      let f_activo
      estado.forEach(element => {
        f_activo = element.formato
      });
      conexion.conexion.query(`SELECT f1.numero_empleado, f1.punto, f1.puesto, el.nombres, el.apellido_paterno, el.apellido_materno, f1.${diaSemana} as dia, a.${dia_entrada} as dia_entrada, a.${dia_salida} as dia_salida FROM ${f_activo}  AS f1 INNER JOIN elementos AS el ON f1.numero_empleado = el.numero_empleado INNER JOIN ${t_asistencias} AS a ON f1.numero_empleado = a.numero_empleado `,(error1,result1)=>{
        if(error1){
          console.log(error1)
          res.send({
            mensaje: 'ocurrio errror en cosultar el estado de los formatos'
          })
        }else{
          formato = result1
          let data = {
            estado: estado,
            formato: formato
          }
          res.send(JSON.stringify(data))
        }
      })
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

//funcion para obtener el numero de la semana
Date.prototype.getWeek = function() {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const firstWeek = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - firstWeek.getTime()) / 86400000 - 3 + (firstWeek.getDay() + 6) % 7) / 7);
};

module.exports = {getItems, getItem, createItem, updateItem, deleteItem}