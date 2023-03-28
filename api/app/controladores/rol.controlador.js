const conexion = require("../../config/database")

const getItems = (req, res) =>{
  let roles = {}
  //obtener tabla formato_rol_1
   conexion.conexion.query('SELECT f1.numero_empleado, f1.punto, f1.puesto, el.nombres, el.apellido_paterno, el.apellido_materno, f1.lunes, f1.martes, f1.miercoles, f1.jueves, f1.viernes, f1.sabado, f1.domingo FROM formato_1 AS f1 INNER JOIN elementos AS el ON f1.numero_empleado = el.numero_empleado',(error,results1)=>{
      if(error){
                      console.log(error)
        res.send({
          resultado: "no se encontro la tabla 1"
        })
      }else{
        roles.formato_1 = results1;
        //obtener tabla formato_rol_2
        conexion.conexion.query('SELECT f2.numero_empleado, f2.punto, f2.puesto, el.nombres, el.apellido_paterno, el.apellido_materno, f2.lunes, f2.martes, f2.miercoles, f2.jueves, f2.viernes, f2.sabado, f2.domingo FROM formato_2 AS f2 INNER JOIN elementos AS el ON f2.numero_empleado = el.numero_empleado',(error,results2)=>{
            if(error){
              console.log(error)
              res.send({
                resultado: "no se encontro la tabla 2"
              })
            }else{
              roles.formato_2 = results2;
              //obtener tabla formato_rol_3
              conexion.conexion.query('SELECT f3.numero_empleado, f3.punto, f3.puesto, el.nombres, el.apellido_paterno, el.apellido_materno, f3.lunes, f3.martes, f3.miercoles, f3.jueves, f3.viernes, f3.sabado, f3.domingo FROM formato_3 AS f3 INNER JOIN elementos AS el ON f3.numero_empleado = el.numero_empleado',(error,results3)=>{
                  if(error){
                                  console.log(error)
                    res.send({
                      resultado: "no se encontro la tabla 3"
                    })
                  }else{
                    roles.formato_3 = results3;
                    res.send(JSON.stringify(roles))  
                  }
                })
            }
          }) 
      }
    })  



}

const getItem = (req, res) =>{

  conexion.conexion.query('SELECT * FROM formato_auth WHERE estado = "activo"',(error,results)=>{
    if(error){
      console.log(error)
      res.send({
        mensaje: 'ocurrio un error'
      })
    }else{
      res.send(JSON.stringify(results))
    }
  })
   
}

const updateItem = (req, res) =>{
  const formato = req.body.formato
  const punto = req.body.punto
  const numero_empleado = req.body.numero_empleado
  const puesto = req.body.puesto
  let lunes = req.body.lunes
  let martes = req.body.martes
  let miercoles = req.body.miercoles
  let jueves = req.body.jueves
  let viernes = req.body.viernes
  let sabado = req.body.sabado
  let domingo = req.body.domingo
  let estado =
  conexion.conexion.query(`UPDATE  ${formato} SET ? WHERE numero_empleado = ?`,[{punto:punto, puesto:puesto,lunes:lunes, martes:martes, miercoles:miercoles, jueves:jueves, viernes:viernes, sabado:sabado, domingo:domingo},numero_empleado],(error,result)=>{
    if(error){
      console.log(error)
      res.send({
        mensaje: 'ha ocurrido un error'
      })
    }else{
      res.send({
        mensaje: 'datos guardados correctamente'
      })
    }
  })

}

const updateEstados = (req,res) =>{
  let formato = req.body.formato 
  let semana = expR_(req.body.semana) 
  conexion.conexion.query(`UPDATE formato_auth SET estado='pendiente' where estado = "activo"`,(error,result)=>{
    if(error){
      console.log(error)
          res.send({
            mensaje: 'ocurrio un error en primera consulta'
          })
    }else{
      conexion.conexion.query(`UPDATE formato_auth SET estado='activo' where formato = ?`,[formato],(error2,result2)=>{
        if(error2){
          console.log(error2)
          res.send({
            mensaje: 'ocurrio un error en segunda consulta'
          })
        }else{
          conexion.conexion.query(`create table asistencias_${semana} select punto, numero_empleado, puesto from ${formato}`,(error3,result3)=>{
            if(error3){
              console.log(error3)
              res.send({
                mensaje: 'ocurrio un error en tercer consulta'
              }) 
            }else{
              conexion.conexion.query(`ALTER TABLE asistencias_${semana} ADD lunes_entrada varchar(10), ADD lunes_salida varchar(10),ADD martes_entrada varchar(10),ADD martes_salida varchar(10),ADD miercoles_entrada varchar(10),ADD miercoles_salida varchar(10),ADD jueves_entrada varchar(10),ADD jueves_salida varchar(10),ADD viernes_entrada varchar(10),ADD viernes_salida varchar(10),ADD sabado_entrada varchar(10),ADD sabado_salida varchar(10),ADD domingo_entrada varchar(10),ADD domingo_salida varchar(10);`,(error4,result4)=>{
                if(error4){
                  console.log(error4)
                  res.send({
                    mensaje: 'ocurrio un error en la cuarta consulta'
                  })
                }else{
                  res.send({
                    mensaje: 'estado cambiado'
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

const deleteItem = (req, res) =>{
  const numEmpleado = req.params.id
  console.log(numEmpleado)
  conexion.conexion.query('DELETE FROM formato_rol_1 WHERE numero_empleado = ?',[numEmpleado],(error,results)=>{
    if (error) {
      console.log(error);
    }else{
      console.log("exito")
    }
    })
}

const createItem = async (req, res) =>{
  let numero_empleado = req.body.numero_empleado
  let punto_trabajo = req.body.punto_trabajo
  let puesto = req.body.puesto
  let nombre = req.body.nombre
  let lunes = req.body.lunes
  let martes = req.body.martes
  let miercoles = req.body.miercoles
  let jueves = req.body.jueves
  let viernes = req.body.viernes
  let sabado = req.body.sabado
  let domingo = req.body.domingo

  conexion.conexion.query('INSERT INTO formato_rol_1 SET ?',{numero_empleado: numero_empleado, punto:punto_trabajo, puesto:puesto, nombre:nombre, lunes:lunes, martes:martes, miercoles:miercoles, jueves:jueves, viernes:viernes, sabado:sabado, domingo:domingo }, async (error,results)=>{
    if(error){
      console.log(error)
      res.send({
        mensaje: 'ocurrio un error'
      })
    }else{
      res.send({
        mensaje: 'Se ha registrado correctamente'
      })
    }
  })
}

    function expR_(value) {

        let regX = new RegExp('-','g')
      return value.replace(regX, '_')

    }

module.exports = {getItems, getItem, createItem, updateItem, updateEstados, deleteItem}