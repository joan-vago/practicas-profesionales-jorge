//se declaran variables para ir guardando los distintos tipos de puntos de trabajo existentes
let set1 = new Set
let set2 = new Set
let set3 = new Set

//Tablas de rol de servicio para editar
const $formato_1 = document.getElementById('formato_1')
const $formato_2 = document.getElementById('formato_2')
const $formato_3 = document.getElementById('formato_3')

const URL = "http://localhost:3000/rol";//url al que se llama con el metodo fetch

(()=>{
  
  //funcion para traer los datos de la base de datos y mostrarlos en una tabla
  async function myFetch() {   

    try {
     //se mandan a llamar los datos al servidor
      let fetchGet = await fetch(`${URL}`)
      let json = await fetchGet.json()
      console.log(json.formato_3)
      //se agregan elementos a la tabla formato 1
      //Se agregan los datos de los puntos de trabajo a una variable de tipo Set
      json.formato_1.forEach(element => {
        if(element.punto != null){
          set1.add(element.punto)//se va agregando los puntos de trabajo existentes a una variable de tipo set
        }
        
      });
      //se agregan los campos para cada uno de los puntos existentes
      set1.forEach(punto =>{
        //se elimina los espacios en blanco y cambiarlos por un guion bajo
        let id = `formato_1_${expR_(punto)}`
        //se ingresa a la tabla las filas correspondientes a cada punto de trabajo
        body_rol_1.innerHTML += 
          `
              <tr id="${id}" class="${id}">
                <td colspan="3" class="border-0">
                  ${punto}
                </td>

                <td colspan="8" class="border-0"></td>
              </tr>
          `
        body_rol_mostrar.innerHTML += 
          `
              <tr id="${id}mostrar" class="${id}mostrar">
                <td colspan="2" class="border-0">
                  ${punto}
                </td>

                <td colspan="7" class="border-0"></td>
              </tr>
          `
      })
      //se agregan as filas corespondientes a cada uno de los puntos de trabajo
      set1.forEach(element => {
        //se elimina los espacios en blanco y cambiarlos por un guion bajo
        let item = `formato_1_${expR_(element)}`
        //Se agrega el punto de trabajo a una variable
        const $punto_de_trabajo = document.getElementById(`${item}`)
        //tabla mostrar
        const $punto_de_trabajo_mostrar = document.getElementById(`${item}mostrar`)
        
        let tr_id = 0
        json.formato_1.forEach(it =>{
          
          let id = `formato_1_${expR_(it.punto)}`
          
          if(id== $punto_de_trabajo.id){
              //se agrega a la tabla para editar los datos
              const $fila = document.createElement("tr")
              $fila.setAttribute('class',`${item}`)
              $fila.setAttribute('id',`${item}_${tr_id++}`)
                  
              $fila.innerHTML +=
                    `
                      <td><input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.punto}"></td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.numero_empleado}" required disabled></td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.puesto}"> </td>
                      <td class="col-md-3">  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}" required disabled> </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.lunes}" required>  </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.martes}" required> </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.miercoles}" required>  </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.jueves}" required> </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.viernes}" required>  </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.sabado}" required> </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.domingo}" required>  </td>
                      <td><button type="button" value="${$formato_1.id}" onClick="editar()" class="btn btn-success">Guardar </button></td>
                    `
              const $numero_filas = document.querySelectorAll(`.${item}`)
              if($numero_filas.length ==1){
                $punto_de_trabajo.insertAdjacentElement('afterend', $fila)
              }else{
                let $ultima_fila = $numero_filas[$numero_filas.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila)
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
              const $numero_filas_mostrar = document.querySelectorAll(`.${item}mostrar`)
              if($numero_filas_mostrar.length ==1){
                $punto_de_trabajo_mostrar.insertAdjacentElement('afterend', $fila_mostrar)
              }else{
                let $ultima_fila = $numero_filas_mostrar[$numero_filas_mostrar.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila_mostrar)
              }

          }
        })

      })

      //se agregan elementos de la tabla formato 2
      //Se agregan los datos de los puntos de trabajo a una variable de tipo Set
      json.formato_2.forEach(element => {
        if(element.punto != null){
          set2.add(element.punto)//se va agregando los puntos de trabajo existentes a una variable de tipo set
        }
        
      });
      //se agregan los campos para cada uno de los puntos existentes
      set2.forEach(punto =>{
        //se elimina los espacios en blanco y cambiarlos por un guion bajo
        let id = `formato_2_${expR_(punto)}`
        //se ingresa a la tabla las filas correspondientes a cada punto de trabajo
        body_rol_2.innerHTML += 
          `
              <tr id="${id}" class="${id}">
                <td colspan="3" class="border-0">
                  ${punto}
                </td>

                <td colspan="8" class="border-0"></td>
              </tr>
          `
        body_rol_mostrar.innerHTML += 
          `
              <tr id="${id}mostrar" class="${id}mostrar">
                <td colspan="2" class="border-0">
                  ${punto}
                </td>

                <td colspan="7" class="border-0"></td>
              </tr>
          `
      })
      //se agregan as filas corespondientes a cada uno de los puntos de trabajo
      set2.forEach(element => {
        //se elimina los espacios en blanco y cambiarlos por un guion bajo
        let item = `formato_2_${expR_(element)}`
        //Se agrega el punto de trabajo a ua variable
        const $punto_de_trabajo = document.getElementById(`${item}`)
        //tabla mostrar
        const $punto_de_trabajo_mostrar = document.getElementById(`${item}mostrar`)
        
        let tr_id = 0
        json.formato_2.forEach(it =>{
          
          let id = `formato_2_${expR_(it.punto)}`
          
          if(id== $punto_de_trabajo.id){
              //se agrega a la tabla para editar los datos
              const $fila = document.createElement("tr")
              $fila.setAttribute('class',`${item}`)
              $fila.setAttribute('id',`${item}_${tr_id++}`)
                  
              $fila.innerHTML +=
                    `
                      <td><input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.punto}"></td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.numero_empleado}" required disabled></td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.puesto}"> </td>
                      <td class="col-md-3">  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}" required disabled> </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.lunes}" required>  </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.martes}" required> </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.miercoles}" required>  </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.jueves}" required> </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.viernes}" required>  </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.sabado}" required> </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.domingo}" required>  </td>
                      <td><button type="button" value="${formato_2.id}" onClick="editar()" class="btn btn-success">Guardar </button></td>
                    `
              const $numero_filas = document.querySelectorAll(`.${item}`)
              if($numero_filas.length ==1){
                $punto_de_trabajo.insertAdjacentElement('afterend', $fila)
              }else{
                let $ultima_fila = $numero_filas[$numero_filas.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila)
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
              const $numero_filas_mostrar = document.querySelectorAll(`.${item}mostrar`)
              if($numero_filas_mostrar.length ==1){
                $punto_de_trabajo_mostrar.insertAdjacentElement('afterend', $fila_mostrar)
              }else{
                let $ultima_fila = $numero_filas_mostrar[$numero_filas_mostrar.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila_mostrar)
              }

          }
        })

      })

      //se agregan elementos de la tabla formato 3
      //Se agregan los datos de los puntos de trabajo a una variable de tipo Set
      json.formato_3.forEach(element => {
        if(element.punto != null){
          set3.add(element.punto)//se va agregando los puntos de trabajo existentes a una variable de tipo set
        }
        
      });
      //se agregan los campos para cada uno de los puntos existentes
      set3.forEach(punto =>{
        //se elimina los espacios en blanco y cambiarlos por un guion bajo
        let id = `formato_3_${expR_(punto)}`
        //se ingresa a la tabla las filas correspondientes a cada punto de trabajo
        body_rol_3.innerHTML += 
          `
              <tr id="${id}" class="${id}">
                <td colspan="3" class="border-0">
                  ${punto}
                </td>

                <td colspan="8" class="border-0"></td>
              </tr>
          `
        body_rol_mostrar.innerHTML += 
          `
              <tr id="${id}mostrar" class="${id}mostrar">
                <td colspan="2" class="border-0">
                  ${punto}
                </td>

                <td colspan="7" class="border-0"></td>
              </tr>
          `
      })
      //se agregan as filas corespondientes a cada uno de los puntos de trabajo
      set3.forEach(element => {
        //se elimina los espacios en blanco y cambiarlos por un guion bajo
        let item = `formato_3_${expR_(element)}`
        //Se agrega el punto de trabajo a ua variable
        const $punto_de_trabajo = document.getElementById(`${item}`)
        //tabla mostrar
        const $punto_de_trabajo_mostrar = document.getElementById(`${item}mostrar`)
        
        let tr_id = 0
        json.formato_3.forEach(it =>{
          
          let id = `formato_3_${expR_(it.punto)}`
          
          if(id== $punto_de_trabajo.id){
              //se agrega a la tabla para editar los datos
              const $fila = document.createElement("tr")
              $fila.setAttribute('class',`${item}`)
              $fila.setAttribute('id',`${item}_${tr_id++}`)
                  
              $fila.innerHTML +=
                    `
                      <td><input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.punto}"></td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.numero_empleado}" required disabled></td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.puesto}"> </td>
                      <td class="col-md-3">  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}" required disabled> </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.lunes}" required>  </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.martes}" required> </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.miercoles}" required>  </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.jueves}" required> </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.viernes}" required>  </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.sabado}" required> </td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" list="datalistOptions" value="${it.domingo}" required>  </td>
                      <td><button type="button" value="${$formato_3.id}" onClick="editar()" class="btn btn-success">Guardar </button></td>
                    `
              const $numero_filas = document.querySelectorAll(`.${item}`)
              if($numero_filas.length ==1){
                $punto_de_trabajo.insertAdjacentElement('afterend', $fila)
              }else{
                let $ultima_fila = $numero_filas[$numero_filas.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila)
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
              const $numero_filas_mostrar = document.querySelectorAll(`.${item}mostrar`)
              if($numero_filas_mostrar.length ==1){
                $punto_de_trabajo_mostrar.insertAdjacentElement('afterend', $fila_mostrar)
              }else{
                let $ultima_fila = $numero_filas_mostrar[$numero_filas_mostrar.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila_mostrar)
              }

          }
        })

      })


    } catch (error) {
      throw error
    }finally{
      

    }
  
  }

  myFetch()// se ejecuta la funcion myFectch
})()

  //se guardan los datos nuevos
  function editar() {
    let value = event.srcElement.parentNode
    let $fila = value.parentNode.id
    let formato = event.srcElement.value
    console.log(formato)
    let elementos = document.querySelectorAll(`.${$fila}`)
    let elemento = {}
     if(elementos.length >1){
                elemento = {
                  formato: formato,
                  punto: elementos[0].value,
                  numero_empleado: elementos[1].value,
                  puesto: elementos[2].value,
                  nombre: elementos[3].value,
                  lunes: elementos[4].value,
                  martes: elementos[5].value,
                  miercoles: elementos[6].value,
                  jueves: elementos[7].value,
                  viernes: elementos[8].value,
                  sabado: elementos[9].value,
                  domingo: elementos[10].value
                }
              }
          let elementoJSON = JSON.stringify(elemento)
          fetch(`${URL}/${elemento.numero_empleado}`,{
            method:"put",
            body: elementoJSON
          }).then(x=> x.json())
          .then(res => {
            console.log(res.mensaje)
            if(res.mensaje == "datos guardados correctamente"){
              location.reload()
            }
          })
  }

//funcon para activar la edicion de la tabla del rol de servicio
const activarEdicion = ()=>{
  event.preventDefault()
  let $tabla_editar = document.getElementById('tabla_editar')
  let $tabla_mostrar= document.getElementById('tabla_mostrar')

  $tabla_mostrar.classList.add('d-none')
  $tabla_editar.classList.remove('d-none')
}

const $activar_edicion = document.getElementById('activar_edicion')
$activar_edicion.addEventListener('click',activarEdicion)

//funcon para activar la edicion de la tabla del rol de servicio
const terminarEdicion = ()=>{
  event.preventDefault()
  let $tabla_editar = document.getElementById('tabla_editar')
  let $tabla_mostrar= document.getElementById('tabla_mostrar')

  $tabla_mostrar.classList.remove('d-none')
  $tabla_editar.classList.add('d-none')
}
const $terminar_edicion = document.getElementById('terminar_edicion')
$terminar_edicion.addEventListener('click',terminarEdicion)

//Botones para navegar entre los diferentes formatos de rol
const $btn_formato_1 = document.getElementById('btn_formato_1')
const $btn_formato_2 = document.getElementById('btn_formato_2')
const $btn_formato_3 = document.getElementById('btn_formato_3')


//ver formato 1
$btn_formato_1.addEventListener('click',()=>{

    $btn_formato_1.classList.remove('link-info')
    $btn_formato_1.classList.add('link-success')
    $btn_formato_2.classList.remove('link-success')
    $btn_formato_2.classList.add('link-info')
    $btn_formato_3.classList.remove('link-success')
    $btn_formato_3.classList.add('link-info')

    $formato_1.classList.remove('d-none')
    $formato_2.classList.add('d-none')
    $formato_3.classList.add('d-none')
})

//ver formato 2
$btn_formato_2.addEventListener('click',()=>{

    $btn_formato_2.classList.remove('link-info')
    $btn_formato_2.classList.add('link-success')
    $btn_formato_1.classList.remove('link-success')
    $btn_formato_1.classList.add('link-info')
    $btn_formato_3.classList.remove('link-success')
    $btn_formato_3.classList.add('link-info')

    $formato_2.classList.remove('d-none')
    $formato_1.classList.add('d-none')
    $formato_3.classList.add('d-none')
})

//ver formato 3
$btn_formato_3.addEventListener('click',()=>{

    $btn_formato_3.classList.remove('link-info')
    $btn_formato_3.classList.add('link-success')
    $btn_formato_1.classList.remove('link-success')
    $btn_formato_1.classList.add('link-info')
    $btn_formato_2.classList.remove('link-success')
    $btn_formato_2.classList.add('link-info')

    $formato_3.classList.remove('d-none')
    $formato_1.classList.add('d-none')
    $formato_2.classList.add('d-none')
})

//obtener la fecha de cada dia de la semana
function getDatesOfWeek(weekNumber, year) {
  // Determina la fecha del primer día del año
  var januaryFirst = new Date(year, 0, 1);
  // Calcula el número de días que deben sumarse para llegar al inicio de la semana
  var daysOffset = (januaryFirst.getDay() + 6) % 7;
  // Calcula la fecha del primer día de la semana especificada
  var startDate = new Date(year, 0, (weekNumber * 7) - (januaryFirst.getDay() + 6) % 7 + 1);
  // Crea un array para almacenar las fechas de la semana
  var datesOfWeek = [];
  // Agrega las fechas de la semana al array
  for (var i = 0; i < 7; i++) {
    var currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var fechaFormateada = currentDate.toLocaleDateString('es-ES', options);
    datesOfWeek.push(fechaFormateada);
  }
  return datesOfWeek;
}

var weekNumber = 12;
var year = 2023;
var datesOfWeek = getDatesOfWeek(weekNumber, year);
console.log(datesOfWeek);










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






























































































































//     let set = new Set//se declara variable para ir guardando los distintos tipos e trabajo existentes
//     const URL = "http://localhost:3000/rol";//url al que se llama con el metodo fetch
// (()=>{
  
//   //funcion para traer los datos de la base de datos y mostrarlos en una tabla
//   async function myFetch() {   

//     try {
//      //se mandan a llamar los datos al servidor
//       let fetchGet = await fetch(`${URL}`)
//       let json = await fetchGet.json()

//       //Se agregan los datos de los puntos de trabajo a una variable de tipo Set
//       json.forEach(element => {
//         if(element.punto != null){
//           set.add(element.punto)//se va agregando los puntos de trabajo existentes a una variable de tipo set
//         }
        
//       });

//       //se agregan los campos para cada uno de los puntos existentes
//       set.forEach(punto =>{
//         //se elimina los espacios en blanco y cambiarlos por un guion bajo
//         let id = expR_(punto)
//         //se ingresa a la tabla las filas correspondientes a cada punto de trabajo
//         body_rol.innerHTML += 
//           `
//               <tr id="${id}" class="${id}">
//                 <td colspan="3" class="border-0">
//                   ${punto}
//                 </td>
//                 <td colspan="1" class="border-0">
//                 <button id="btn${id}" class="btn btn-success" >+</button> 
//                 <button class="btn btn-danger" id="btnEliminarPunto${id}"value="punto">Eliminar punto</button>
//                 </td>
//                 <td colspan="7" class="border-0"></td>
//               </tr>
//           `
//       })
      

//       //se agregan as filas corespondientes a cada uno de los puntos de trabajo
//       set.forEach(element => {
//         //se elimina los espacios en blanco y cambiarlos por un guion bajo
//         let item = expR_(element)
//         //Se agrega el punto de trabajo a ua variable
//         const $punto_de_trabajo = document.getElementById(`${item}`)
        
//         let tr_id = 0
//         json.forEach(it =>{
          
//           let id = expR_(it.punto)
//           console.log($punto_de_trabajo.id)
//           if(id== $punto_de_trabajo.id){
//               const $fila = document.createElement("tr")
//               $fila.setAttribute('class',`${item}`)
//               $fila.setAttribute('id',`${item}_${tr_id++}`)
                  
//               $fila.innerHTML +=
//                     `
//                       <td>${it.punto}</td>
//                       <td>  ${it.numero_empleado} </td>
//                       <td>  ${it.puesto}</td>
//                       <td class="col-md-3">  ${it.nombre}</td>
//                       <td>  ${it.lunes}  </td>
//                       <td>  ${it.martes} </td>
//                       <td>  ${it.miercoles} </td>
//                       <td>  ${it.jueves} </td>
//                       <td>  ${it.viernes}  </td>
//                       <td>  ${it.sabado} </td>
//                       <td>  ${it.domingo}  </td>
//                       <td>  
//                         <button type="button" onClick="mostrarFormularioEditar(${it.numero_empleado})" class="btn btn-success">Editar </button>
//                         <button class="btn btn-danger" onClick="eliminar(${it.numero_empleado})">Eliminar</button>
//                       </td>
//                     `
//               const $numero_filas = document.querySelectorAll(`.${item}`)
//               if($numero_filas.length ==1){
//                 $punto_de_trabajo.insertAdjacentElement('afterend', $fila)
//               }else{
//                 let $ultima_fila = $numero_filas[$numero_filas.length-1]
//                 $ultima_fila.insertAdjacentElement('afterend',$fila)
//               }
//           }
//         })
//       })

//       actualizarBTNPuntos()
//       return json
//     } catch (error) {
//       throw error
//     }finally{
      
//       //Se agrega un addEventListener para agregar puntos de trabajo nuevos
//       const $btnAgregar = document.getElementById(`agregar-punto`)
//       $btnAgregar.addEventListener('click',agregarPuntos)

//       eventoEliminarPunto()
//     }
  
//   }

//   myFetch()// se ejecuta la funcion myFetch
// })()

// function guardarNuevo() {
//   let $table_rol = document.getElementById('table_rol')

//   let $form_nuevo_elemento = document.createElement('form')
//   $form_nuevo_elemento.setAttribute('class','form_nuevo_elemento')
//   $form_nuevo_elemento.setAttribute('id','form_nuevo_elemento')
//   $form_nuevo_elemento.innerHTML = 
//   `
//             <table id="table_nuevo" class="table table-sm table-bordered table-responsive text-center mt-3 ">

//               <thead>

//                 <tr class="text-white" style="background-color: #3c3c3c;">
//                   <th># Empleado</th>
//                   <th>Punto de trabajo</th>
//                   <th>Puesto</th>
//                   <th>Nombre</th>
//                   <th>Lunes</th>
//                   <th>Martes</th>
//                   <th>Miercoles</th>
//                   <th>Jueves</th>
//                   <th>Viernes</th>
//                   <th>Sabado</th>
//                   <th>Domingo</th>
//                 </tr>

//               </thead>
//               <tbody>
//                 <td> <input type="text" class="form-control form-control-sm" name="numero_empleado" id="numero_empleado"
//                     value=""></td>
//                 <td> <input type="text" class="form-control form-control-sm" name="punto_trabajo" id="punto_trabajo"
//                     value=""> </td>
//                 <td> <input type="text" class="form-control form-control-sm" name="puesto" id="puesto" value=""> </td>
//                 <td class="col-md-3"> <input type="text" class="form-control form-control-sm" name="nombre" id="nombre"
//                     value="">
//                 </td>
//                 <td> <input type="text" class="form-control form-control-sm" list="datalistOptions" name="lunes"
//                     id="lunes" value=""> </td>
//                 <td> <input type="text" class="form-control form-control-sm" list="datalistOptions" name="martes"
//                     id="martes" value=""> </td>
//                 <td> <input type="text" class="form-control form-control-sm" list="datalistOptions" name="miercoles"
//                     id="miercoles" value=""> </td>
//                 <td> <input type="text" class="form-control form-control-sm" list="datalistOptions" name="jueves"
//                     id="jueves" value=""> </td>
//                 <td> <input type="text" class="form-control form-control-sm" list="datalistOptions" name="viernes"
//                     id="viernes" value=""> </td>
//                 <td> <input type="text" class="form-control form-control-sm" list="datalistOptions" name="sabado"
//                     id="sabado" value=""> </td>
//                 <td> <input type="text" class="form-control form-control-sm" list="datalistOptions" name="domingo"
//                     id="domingo" value=""> </td>
//               </tbody>
//             </table>

//             <div class="modal-footer border-0">
//               <button type="button" class="btn btn-secondary cancelar" data-bs-dismiss="modal">Cancelar</button>
//               <input type="submit" class="btn btn-success" value="Guardar cambios">
//             </div>
//   `
// console.log('hola bug')
//   $table_rol.insertAdjacentElement('afterbegin',$form_nuevo_elemento)
// }

// //evento para guardar nuevo elemento
// const $form_nuevo_elemento = document.getElementById('form_nuevo_elemento')
// $form_nuevo_elemento.addEventListener('submit',()=>{
//   let numero_empleado = document.getElementById('numero_empleado').value
//   let punto_trabajo = document.getElementById('punto_trabajo').value
//   let puesto = document.getElementById('puesto').value
//   let nombre = document.getElementById('nombre').value
//   let lunes = document.getElementById('lunes').value
//   let martes = document.getElementById('martes').value
//   let miercoles = document.getElementById('miercoles').value
//   let jueves = document.getElementById('jueves').value
//   let viernes = document.getElementById('viernes').value
//   let sabado = document.getElementById('sabado').value
//   let domingo = document.getElementById('domingo').value

//   let elemento_nuevo = {numero_empleado: numero_empleado, punto_trabajo:punto_trabajo, puesto:puesto, nombre:nombre, lunes:lunes, martes:martes, miercoles:miercoles, jueves:jueves, viernes:viernes, sabado:sabado, domingo:domingo }

//   let elemento_json = JSON.stringify(elemento_nuevo)
//   fetch(URL,{
//     method: 'post',
//     body: elemento_json
//   })
//   .then(x => x.json())
//   .then(res =>{
//     alert(res.mensaje)
//     location.reload()
//   })
// })

// //funciones para editar elemento
// //funcion para mostrar formulario de editar elemento
// function mostrarFormularioEditar(numero_empleado) {
//       let nodoPadre = event.srcElement.parentNode
//       let tr_padre = nodoPadre.parentNode
//   fetch(`${URL}/${numero_empleado}`)
//   .then(x => x.json())
//   .then((res) =>{


//     res.forEach(item=>{
//       const $fila_editar = document.createElement('tr')
//       $fila_editar.innerHTML = `
//                             <td>  ${it.numero_empleado} </td>
//                       <td>  ${it.puesto}</td>
//                       <td class="col-md-3">  ${it.nombre}</td>
//                       <td>  ${it.lunes}  </td>
//                       <td>  ${it.martes} </td>
//                       <td>  ${it.miercoles} </td>
//                       <td>  ${it.jueves} </td>
//                       <td>  ${it.viernes}  </td>
//                       <td>  ${it.sabado} </td>
//                       <td>  ${it.domingo}  </td>
//                       <td>  
//                         <button type="button" onClick="mostrarFormularioEditar(${it.numero_empleado})" class="btn btn-success">Editar </button>
//                         <button class="btn btn-danger" onClick="eliminar(${it.numero_empleado})">Eliminar</button>
//                       </td>

//       ` 
//       console.log(item.nombre)
//     })
//   })

//       console.log(tr_padre)
// }

// //funcion eliminar elemento
// function eliminar(numero_empleado) {
//   fetch(`${URL}/${numero_empleado}`,{
//     method: 'delete'
//   })
// }































//     //funciones para administrar los puntos de trabajo
//     //funcion para el evento agregar puntos de trabajo nuevos
//     const agregarPuntos = (e)=>{

//         e.preventDefault()
        
//         let nuevo = prompt("Ingresa el nombre del punto")
//         let punto_nuevo = expR_(nuevo)
//         //seleccionar el ultimo elemento  con la clase de cada punto
//         const $filas = document.querySelectorAll("tbody tr")
//         const $ultima_fila = $filas[$filas.length-1]
//         //se crea un elemento tr para agregar una nueva fila
//         const $fila_nueva = document.createElement("tr")
//         //se le agrega la clase del punto correspondiente a la fila
//         $fila_nueva.setAttribute('class',`${punto_nuevo}`)
//         //se le agrega el id del punto correspondiente
//         $fila_nueva.setAttribute('id',`${punto_nuevo}`)
//         //se agregan los campos a la fila
//         $fila_nueva.innerHTML = 
//             `
//                 <td colspan="2" class="border-0">
//                   <input type="text" value="${nuevo}" class="form-control">
//                 </td>
//                 <td colspan="1" class="border-0">
//                 <button id="btn${punto_nuevo}" class="btn btn-success" >+</button> 
//                 <button class="btn btn-danger" id="btnEliminarPunto${punto_nuevo}"value="punto">Eliminar punto</button>
//                 </td>
//                 <td colspan="7" class="border-0"></td>
                    
//             `
//         //se agrega a fila despues del ultimo elemento con la calse del punto
//         if($ultima_fila){
//           $ultima_fila.insertAdjacentElement('afterend', $fila_nueva)
//         }

//         if(!$ultima_fila){
//           let $body = document.querySelector("tbody")
//           $body.insertAdjacentElement('beforeend', $fila_nueva)
//         }
        
//         //se agrega el nuevo punto a la variable set
//         set.add(nuevo)
//         eventoEliminarPunto()
//         actualizarBTNPuntos(set)
//     }

//   //funcion para actualizar los addEventListener de los botones para agregar filas nuevas a cada punto
// function actualizarBTNPuntos() {

//         set.forEach(element => {
        
//           let item1 = expR_(element)
//           const $btnAgregar = document.getElementById(`btn${item1}`)
//           $btnAgregar.removeEventListener("click",agregarFila)
//           $btnAgregar.addEventListener('click',agregarFila)

//         })
// }

//   //Funcion para eliminar un punto de trabajo con sus respectivos campos
// const eliminarPunto = (e) =>{
//       //se selecciona el elemento que se eliminara
//       const btnEliminar =e.srcElement.parentNode
//       const btnEliminarPadre = btnEliminar.parentNode
//       const $class_punto = document.querySelectorAll(`.${btnEliminarPadre.id}`)
//       let clase_filas = espacioR(btnEliminarPadre.id)
//       set.delete(clase_filas)
//       for(let i=0;i<$class_punto.length;i++){
//         document.getElementById("body_rol").removeChild($class_punto[i])
//       }
// }

//     //agregar evento a boton eliminar punto
// function eventoEliminarPunto() {
//         set.forEach(item =>{
//         let punto = expR_(item)
  
//         const $btnEliminarPunto = document.getElementById(`btnEliminarPunto${punto}`)
//         $btnEliminarPunto.addEventListener('click',eliminarPunto)
//       })
// }

//   //Funciones para administrar las filas de la table correspondiente a cada punto de trabajo
//   //funcion para agregar una fila nueva al punto de trabajo correspondiente
// // const agregarFila = (e)=>{

// //           e.preventDefault()

// //           //se selecciona el nodo padre tr del nodo que activo el evento
// //           let nodo = e.srcElement.parentNode
// //           let nodoPadre = nodo.parentNode

// //           //seleccionar los elementos con la clase del punto de trabajo correspondiente
// //           const $filas = document.querySelectorAll(`.${nodoPadre.id}`)
// //           //seleccionar el ultimo elemento  con la clase de cada punto
// //           const $ultima_fila = $filas[$filas.length-1]
// //           const $btn_eliminar = document.querySelector(`#eliminar-fila${nodoPadre.id}`)
// //           if($btn_eliminar){
// //           $ultima_fila.removeChild($btn_eliminar)
// //           }

// //           let descripcion_id
// //           let nuevo_numero_id
// //           if($filas.length == 1){
// //             descripcion_id = `${nodoPadre.id}_`
// //             nuevo_numero_id = 0
// //           }else{

// //             //se separa el id en un arreglo para obtener el numero del id y su descripcion por separado
// //             let arreglo_id = $ultima_fila.id.split("_")
          
// //             descripcion_id = `${$ultima_fila.id}_`
// //             let numero_id
// //             if(arreglo_id.length >1 ){
// //               descripcion_id = ""
// //               numero_id = arreglo_id[arreglo_id.length-1]
// //               for (let index = 0; index < arreglo_id.length-1; index++) {
// //               descripcion_id += `${arreglo_id[index]}_`
// //               }
// //             }
            
// //               //se incrementa en 1 el id si ya se cuenta con uno registrado
// //               nuevo_numero_id = Number(numero_id)
// //               nuevo_numero_id++
// //           }
         
          
// //           //se crea un elemento tr para agregar una nueva fila
// //           const $form = document.createElement("tr")
// //           //se le agrega la clase del punto correspondiente a la fila
// //           $form.setAttribute('class',`${nodoPadre.id}`)
// //           //se le agrega el id
// //           $form.setAttribute('id',`${descripcion_id}${nuevo_numero_id}`)
// //           //se agregan los campos a la fila
// //           $form.innerHTML = 
// //               `        
// //                       <td>  <input type="text" class="form-control form-control-sm" value="">
// //                       </td>
// //                       <td>  <input type="text" class="form-control form-control-sm" value=""> </td>
// //                       <td class="col-md-3">  <input type="text" class="form-control form-control-sm" value=""> </td>
// //                       <td>  <input type="text" class="form-control form-control-sm" list="datalistOptions" value="">  </td>
// //                       <td>  <input type="text" class="form-control form-control-sm" list="datalistOptions" value=""> </td>
// //                       <td>  <input type="text" class="form-control form-control-sm" list="datalistOptions" value="">  </td>
// //                       <td>  <input type="text" class="form-control form-control-sm" list="datalistOptions" value=""> </td>
// //                       <td>  <input type="text" class="form-control form-control-sm" list="datalistOptions" value="">  </td>
// //                       <td>  <input type="text" class="form-control form-control-sm" list="datalistOptions" value=""> </td>
// //                       <td>  <input type="text" class="form-control form-control-sm" list="datalistOptions" value="">  </td>
// //                       <td>  <button class="btn btn-success" onClick="guardarNuevo()">Guardar</button></td>

// //               `
// //           //se agrega la fila despues del ultimo elemento con la calse del punto de trabajo que corresponde
// //           $ultima_fila.insertAdjacentElement('afterend', $form)
// //           actualizarPosiciones()
// //         // btnEliminar(nodoPadre.id)
// //         // eventoEliminarFila()
// // }
//     // //funcion para agregar el boton para eliminar fila
//     // function btnEliminar(punto) {
             
//     //   const $filas = document.querySelectorAll(`.${punto}`)
//     //   const $ultima_fila = $filas[$filas.length-1]

//     //   const $td_numEmp = $ultima_fila.firstChild


//     //   //se crea un elemento td para agregar el boton de eliminar
//     //   const $campo = document.createElement("td")
//     //   //se agrega el id a  eliminar fila
//     //   $campo.setAttribute('id',`eliminar-fila${punto}`)
//     //   $campo.innerHTML =
//     //    `
//     //   <button class="btn btn-danger" id="btneliminar${punto}" value="${punto}">Eliminar</button>
//     //   `
//     //   $ultima_fila.insertAdjacentElement('beforeend', $campo)

//     // }


//     //funciones auxiliares
//     //funcion para cambiar el espacio en blanco por un guion bajo "_"
//     function expR_(value) {

//         let regX = new RegExp(' ','g')
//       return value.replace(regX, '_')

//     }

//     //funcion para cambiar el guian bajo por un espacio en blanco
//     function espacioR(value) {

//       let regX = new RegExp('_','g')
//       return value.replace(regX, ' ')

//     }

//     //funcion para actualizar las posiciones de los elementos de la tabla
//     function actualizarPosiciones() {
  
//       $filas = document.querySelectorAll('.posicion')
     
//       for(let i = 0; i <$filas.length; i++){
//         $filas[i].value = i+1
//       }

//     }

// // //agregar evento a boton eliminar fila
// // function eventoEliminarFila() {
// //   set.forEach(item =>{
// //     let punto = expR_(item)
// //     const $btnEliminarFila = document.getElementById(`btneliminar${punto}`)
// //     $btnEliminarFila.addEventListener('click',eliminarFila)
// //   })
// // }

//     //funcion para eliminar fila
//     const eliminarFila = (e) =>{
//           // se selecciona el elemento que se eliminara
//           const $eliminar =e.srcElement.parentNode
//           const btnEliminarPadre = $eliminar.parentNode
//           document.getElementById("body_rol").removeChild(btnEliminarPadre)
//           btnEliminar(e.srcElement.value)
//           eventoEliminarFila()
//     }


