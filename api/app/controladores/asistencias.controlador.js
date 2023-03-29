const conexion = require("../../config/database")
const moment = require('moment-timezone');

const getItems = (req, res) =>{
  let estado
  let formato_entrada
  let formato_salida


// let ayer = `${fechaActual('ayer')}`
let dia_entrada = `${fechaActual('dia')}_entrada` 
let t_asistencias = `asistencias_${fechaActual('anio')}_w${fechaActual('semana')}`

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
      conexion.conexion.query(`SELECT f1.numero_empleado, f1.punto, f1.puesto, el.nombres, el.apellido_paterno, el.apellido_materno, f1.${fechaActual('dia')} as dia, a.${dia_entrada} as horario FROM ${f_activo}  AS f1 INNER JOIN elementos AS el ON f1.numero_empleado = el.numero_empleado INNER JOIN ${t_asistencias} AS a ON f1.numero_empleado = a.numero_empleado `,(error1,result1)=>{
        if(error1){
          console.log(error1)
          res.send({
            mensaje: 'ocurrio errror en cosultar lista de asistencias de entrada'
          })
        }else{
          formato_entrada = datosEntrada(result1)
          const hora = moment().tz('America/Hermosillo').format('HH');
          let dia
          let salida
          if(hora >= 5 && hora < 12){
            salida = `${fechaActual('ayer')}_salida`
            dia = fechaActual('ayer')
          }else{
            salida = `${fechaActual('dia')}_salida`
            dia = fechaActual('dia')
          }
          console.log(hora)
          console.log(salida)
          console.log(dia)
          conexion.conexion.query(`SELECT f1.numero_empleado, f1.punto, f1.puesto, el.nombres, el.apellido_paterno, el.apellido_materno,f1.${dia} as dia, a.${salida} as horario FROM ${f_activo}  AS f1 INNER JOIN elementos AS el ON f1.numero_empleado = el.numero_empleado INNER JOIN ${t_asistencias} AS a ON f1.numero_empleado = a.numero_empleado `,(error2,result2)=>{
            if(error2){
              console.log(error2)
              res.send({
                mensaje: 'ocurrio un error al obtener lista de salida'
              })
            }else{
              formato_salida = datosSalida(result2,dia)
              let data = {
                estado: estado,
                formato_entrada: formato_entrada,
                formato_salida: formato_salida,
                dia_salida: dia
              }
              res.send(JSON.stringify(data))
            }
          })
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
  let numero_empleado = req.body.numero_empleado
  let hora = req.body.hora
  let punto = req.body.punto
  let horario = req.body.horario
  let dia_salida = req.body.dia
  let t_asistencias = `asistencias_${fechaActual('anio')}_w${fechaActual('semana')}`
  let dia = fechaActual('dia')
  let datos = {}
  if(horario == 'entrada'){
    datos[`${dia}_entrada`] = hora
    datos.punto = punto
  }
  if(horario == 'salida'){
    datos[`${dia_salida}_salida`] = hora
  }
  let sentencia = `UPDATE ${t_asistencias} SET ? WHERE numero_empleado = '${numero_empleado}'`
  conexion.conexion.query(sentencia,datos,(error,result)=>{
    if(error){
      console.log(error)
      res.send({
        mensaje: 'error'
      })
    }else{
      res.send({
        mensaje: 'exito'
      })
    }
  })

}

const deleteItem = (req, res) =>{
  
}

const createItem = async (req, res) =>{

}

//funcion para obtener dia, semana o año actual
function fechaActual(value) {
    // Crear una instancia de la fecha de hoy
  const hoy = new Date();

  // Crear un array con los nombres de los días de la semana
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];

  // Obtener el día de la semana de la fecha de hoy (0-6)
  const diaSemanaNum = hoy.getDay();

  // Obtener el nombre del día de la semana correspondiente al número obtenido anteriormente
  const diaSemana = diasSemana[diaSemanaNum];
  
  //Obtener el nombre del dia de ayer
  const ayer = diasSemana[diaSemanaNum -1]

  // Obtener el número de la semana correspondiente a la fecha actual
  const numSemana = hoy.getWeek();

  // Obtener el año correspondiente a la fecha actual
  const anio = hoy.getFullYear();

  if(value == 'dia'){
    return diaSemana
  }
  if(value == 'semana'){
    return numSemana
  }
  if(value== 'anio'){
    return anio
  }
  if(value == 'ayer'){
    return ayer
  }
}

//funcion para obtener solo los datos de las asistencias del horario correspondiente
function datosEntrada(result) {
  let formato = []
  let entrada
  let horario
  // Obtener la hora actual en el huso horario de Culiacán Rosales, Sinaloa, México
  const horacompleta = moment().tz('America/Hermosillo').format('HH:mm:ss');
  const hora = moment().tz('America/Hermosillo').format('HH');


  result.forEach(item =>{
    //separar el horario para obtener la hora de entrada asignada
    if(item.dia != null && item.dia != 'Incapacidad' && item.dia != 'Permiso' && item.dia != 'Descanso' && item.dia != 'Vacaciones'){
      horario = item.dia.split('-')[0]
    }
    //agregar la hora a la variable entrada
    if(horario != undefined && horario.length == 1){
      entrada = `0${horario}`
    }
    if(horario != undefined && horario.length == 2){
      entrada = `${horario}`
    }
    //verificar si la hora es por la mañana o la tarde
    if (hora >= 6 && hora < 12 && entrada >= 6 && entrada < 12 && item.dia != null && item.dia != 'Incapacidad' && item.dia != 'Permiso' && item.dia != 'Descanso' && item.dia != 'Vacaciones') {
      formato.push(item)
    } 
    if(hora >= 12 && hora  < 21 && entrada >= 12 && entrada < 21 && item.dia != null && item.dia != 'Incapacidad' && item.dia != 'Permiso' && item.dia != 'Descanso' && item.dia != 'Vacaciones'){
      formato.push(item)
    }
  })
return formato
}
//funcion para obtener solo los datos de las asistencias del horario correspondiente
function datosSalida(result, dia) {
  let formato = []
  let salida
  let horario
  let ayer = fechaActual('ayer')
  let hoy = fechaActual('dia')
  console.log(ayer)
  console.log(dia)
  // Obtener la hora actual en el huso horario de Culiacán Rosales, Sinaloa, México
  const horacompleta = moment().tz('America/Hermosillo').format('HH:mm:ss');
  const hora = moment().tz('America/Hermosillo').format('HH');


  result.forEach(item =>{
    //separar el horario para obtener la hora de entrada asignada
    if(item.dia != null && item.dia != 'Incapacidad' && item.dia != 'Permiso' && item.dia != 'Descanso' && item.dia != 'Vacaciones'){
      horario = item.dia.split('-')[1]
    }
    //agregar la hora a la variable entrada
    if(horario != undefined && horario.length == 1){
      salida = `0${horario}`
    }
    if(horario != undefined && horario.length == 2){
      salida = `${horario}`
    }
    if(dia == hoy){
          //verificar si la hora es por la mañana o la tarde
        if (salida >= 12 && salida < 21 && item.dia != null && item.dia != 'Incapacidad' && item.dia != 'Permiso' && item.dia != 'Descanso' && item.dia != 'Vacaciones') {
          formato.push(item)
        }
    }
    if(dia == ayer){
        if(salida >= 6 && salida < 12 && item.dia != null && item.dia != 'Incapacidad' && item.dia != 'Permiso' && item.dia != 'Descanso' && item.dia != 'Vacaciones'){
          formato.push(item)
        }
    }

  })
return formato
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