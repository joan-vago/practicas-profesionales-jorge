const urlRol = "http://localhost:3000/rol";
const urlAsistencias = "http://localhost:3000/asistencias";

let set = new Set;

// Crear una instancia de la fecha de hoy
const hoy = new Date();

// Crear un array con los nombres de los días de la semana
const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Obtener el día de la semana de la fecha de hoy (0-6)
const diaSemanaNum = hoy.getDay();

// Obtener el nombre del día de la semana correspondiente al número obtenido anteriormente
const diaSemana = diasSemana[diaSemanaNum];


(()=>{

  async function  myfetch() {

    let fetch_asistencias = await fetch(urlAsistencias)
    let json_asistencias = await fetch_asistencias.json()

    json_asistencias.formato.forEach(item =>{
      console.log(item)
        if(item.punto != null){
          set.add(item.punto)//se va agregando los puntos de trabajo existentes a una variable de tipo set
        }
    })

    set.forEach(item =>{
        //se elimina los espacios en blanco y cambiarlos por un guion bajo
        let id_entrada = `entrada_${expR_(item)}`
        let id_salida = `salida_${expR_(item)}`
      if(item.dia != 'incapacidad' || item.dia != 'permiso' || item.dia != 'descanso' || item.dia != 'vacaciones'){
        t_body_entrada.innerHTML += `
              <tr id="${id_entrada}" class="${id_entrada}">
                <td colspan="3" class="border-0">
                  ${item}
                </td>

                <td colspan="8" class="border-0"></td>
              </tr>
          
        `
        t_body_salida.innerHTML += `
              <tr id="${id_salida}" class="${id_salida}">
                <td colspan="3" class="border-0">
                  ${item}
                </td>

                <td colspan="8" class="border-0"></td>
              </tr>
          
        `
      }
    })

    set.forEach(element =>{
        //se elimina los espacios en blanco y cambiarlos por un guion bajo
        let item = `entrada_${expR_(element)}`
        //Se agrega el punto de trabajo a ua variable
        const $punto_de_trabajo = document.getElementById(`${item}`)
        console
        // //tabla mostrar
        // const $punto_de_trabajo_mostrar = document.getElementById(`${item}mostrar`)
        let tr_id = 0
        json_asistencias.formato.forEach(it =>{
          
          let id_entrada = `entrada_${expR_(it.punto)}`
          
          if(id_entrada== $punto_de_trabajo.id){
              //se agrega a la tabla para editar los datos
              const $fila_entrada = document.createElement("tr")
              $fila_entrada.setAttribute('class',`${item}`)
              $fila_entrada.setAttribute('id',`${item}_${tr_id++}`)
                  
              $fila_entrada.innerHTML +=`
              <td><span class="${$fila_entrada.id}">${it.numero_empleado}</span></td>
              <td><span class="${$fila_entrada.id}">${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}</span></td>
              `
                  
              const $numero_filas = document.querySelectorAll(`.${item}`)
              if($numero_filas.length ==1){
                $punto_de_trabajo.insertAdjacentElement('afterend', $fila_entrada)
              }else{
                let $ultima_fila = $numero_filas[$numero_filas.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila_entrada)
              }


              //se agrega a la tabla para mostrar datos
              const $fila_mostrar = document.createElement("tr")
              $fila_mostrar.setAttribute('class',`${item}`)
                  
              $fila_mostrar.innerHTML +=
                    `
                      <td> ${it.numero_empleado}</td>
                      <td>  ${it.puesto}</td>
                      <td class="col-md-3">  ${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno} </td>
                      <td>  ${it.lunes}</td>
                      <td>  ${it.martes}</td>
                      <td>  ${it.miercoles}  </td>
                      <td>  ${it.jueves}</td>
                      <td>  ${it.viernes} </td>
                      <td>  ${it.sabado}</td>
                      <td>  ${it.domingo} </td>

                    `


          }
          if(it.estado == 'activo'){
            verFormato_3()
          }
        })
    })

  }
  myfetch()
})()

    //funcion para cambiar el espacio en blanco por un guion bajo "_"
    function expR_(value) {

        let regX = new RegExp(' ','g')
      return value.replace(regX, '_')

    }
    //funcion para cambiar el guian bajo por un espacio en blanco
    function espacioR(value) {

      let regX = new RegExp('_','g')
      return value.replace(regX, ' ')

    }





// const $guardar_salida = document.getElementById('guardar_salida')
// $guardar_salida.addEventListener('click',()=>{
//   event.preventDefault()
//   let $hora_s = document.getElementById('hora_s').value
//   let $hora_s1 = document.getElementById('hora_s1').value
//   console.log($hora_s)
//   console.log($hora_s1)
// })
// const hora_s = document.getElementById('hora_s')
// const hora_s1 = document.getElementById('hora_s1')

