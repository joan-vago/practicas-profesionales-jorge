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
      let fecthestado = await fetch(`${URL}/estado`)
      let json_estado = await fecthestado.json()
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
      })

      //se agregan as filas corespondientes a cada uno de los puntos de trabajo
      set1.forEach(element => {
        //se elimina los espacios en blanco y cambiarlos por un guion bajo
        let item = `formato_1_${expR_(element)}`
        //Se agrega el punto de trabajo a una variable
        const $punto_de_trabajo = document.getElementById(`${item}`)
        
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
                      <td><input type="text" class="form-control form-control-sm ${$fila.id}" id="punto_${$fila.id}" value="${it.punto}" onblur="editar()"></td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.numero_empleado}" required disabled></td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.puesto}" onblur="editar()"> </td>
                      <td class="col-md-3">  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}" required disabled> </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.lunes}" selected>${it.lunes}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.martes}" selected>${it.martes}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                                            <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.miercoles}" selected>${it.miercoles}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.jueves}" selected>${it.jueves}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.viernes}" selected>${it.viernes}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.sabado}" selected>${it.sabado}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.domingo}" selected>${it.domingo}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>

                    `
              const $numero_filas = document.querySelectorAll(`.${item}`)
              if($numero_filas.length ==1){
                $punto_de_trabajo.insertAdjacentElement('afterend', $fila)
              }else{
                let $ultima_fila = $numero_filas[$numero_filas.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila)
              }

          }
          if(it.estado == 'activo'){
            verFormato_1()
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
      })
      //se agregan as filas corespondientes a cada uno de los puntos de trabajo
      set2.forEach(element => {
        //se elimina los espacios en blanco y cambiarlos por un guion bajo
        let item = `formato_2_${expR_(element)}`
        //Se agrega el punto de trabajo a ua variable
        const $punto_de_trabajo = document.getElementById(`${item}`)
        
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
                      <td><input type="text" class="form-control form-control-sm ${$fila.id}" id="punto_${$fila.id}" value="${it.punto}" onblur="editar()"></td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.numero_empleado}" required disabled></td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.puesto}" onblur="editar()"> </td>
                      <td class="col-md-3">  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}" required disabled> </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.lunes}" selected>${it.lunes}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.martes}" selected>${it.martes}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                                            <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.miercoles}" selected>${it.miercoles}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.jueves}" selected>${it.jueves}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.viernes}" selected>${it.viernes}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.sabado}" selected>${it.sabado}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.domingo}" selected>${it.domingo}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>

                    `
              const $numero_filas = document.querySelectorAll(`.${item}`)
              if($numero_filas.length ==1){
                $punto_de_trabajo.insertAdjacentElement('afterend', $fila)
              }else{
                let $ultima_fila = $numero_filas[$numero_filas.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila)
              }

          }
          if(it.estado == 'activo'){
            verFormato_2()
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
                      <td><input type="text" class="form-control form-control-sm ${$fila.id}" id="punto_${$fila.id}" value="${it.punto}" onblur="editar()"></td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.numero_empleado}" required disabled></td>
                      <td>  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.puesto}" onblur="editar()"> </td>
                      <td class="col-md-3">  <input type="text" class="form-control form-control-sm ${$fila.id}" value="${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}" required disabled> </td>

                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.lunes}" selected>${it.lunes}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.martes}" selected>${it.martes}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                                            <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.miercoles}" selected>${it.miercoles}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.jueves}" selected>${it.jueves}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.viernes}" selected>${it.viernes}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.sabado}" selected>${it.sabado}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>
                      <td>
                        <select name="horario" id="horario" class="form-control form-control-sm ${$fila.id}" onblur="editar()">
                          <option value="${it.domingo}" selected>${it.domingo}</option>
                          <option value="7-19">7-19</option>
                          <option value="19-7">19-7</option>
                          <option value="permiso">permiso</option>
                          <option value="Incapacidad">incapacidad</option>
                          <option value="Descanso">descanso</option>
                          <option value="Vacaciones">vacaciones</option>
                        </select>
                      </td>

                    `
              const $numero_filas = document.querySelectorAll(`.${item}`)
              if($numero_filas.length ==1){
                $punto_de_trabajo.insertAdjacentElement('afterend', $fila)
              }else{
                let $ultima_fila = $numero_filas[$numero_filas.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila)
              }

          }
          if(it.estado == 'activo'){
            verFormato_3()
          }
        })

      })



      json_estado.forEach(element => {
        if(element.formato == 'formato_1'){
          verFormato_2()
        }
        if(element.formato == 'formato_2'){
          verFormato_3()
        }
        if(element.formato == 'formato_3'){
          verFormato_1()
        }

      });

    } catch (error) {
      throw error
    }finally{

      const fechaActual = new Date();
      const num_semana = fechaActual.getWeek();
      const anio = fechaActual.getFullYear()
      let semana = `${anio}-W${num_semana +1}`
      // const fechaInicioProximaSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + (7 - fechaActual.getDay()));
      const semanaInput = document.getElementById("semana");
      // // semanaInput.min = fechaInicioProximaSemana.toISOString().slice(0, 10);
      // console.log(fechaInicioProximaSemana.toISOString().slice(0, 10))
      semanaInput.setAttribute('min',`${semana}`)
    }
  
  }

  myFetch()// se ejecuta la funcion myFectch
})()
//Botones para navegar entre los diferentes formatos de rol
const $btn_formato_1 = document.getElementById('btn_formato_1')
const $btn_formato_2 = document.getElementById('btn_formato_2')
const $btn_formato_3 = document.getElementById('btn_formato_3')
const $btn_activar = document.getElementById('btn_activar')

//ver formato 1
const verFormato_1 = ()=>{

    $btn_formato_1.classList.remove('link-info')
    $btn_formato_1.classList.add('link-success')
    $btn_formato_2.classList.remove('link-success')
    $btn_formato_2.classList.add('link-info')
    $btn_formato_3.classList.remove('link-success')
    $btn_formato_3.classList.add('link-info')

    $formato_1.classList.remove('d-none')
    $formato_2.classList.add('d-none')
    $formato_3.classList.add('d-none')

    $btn_activar.value = 'formato_1'
}
$btn_formato_1.addEventListener('click',verFormato_1)

//ver formato 2
const verFormato_2 = ()=>{
    $btn_formato_2.classList.remove('link-info')
    $btn_formato_2.classList.add('link-success')
    $btn_formato_1.classList.remove('link-success')
    $btn_formato_1.classList.add('link-info')
    $btn_formato_3.classList.remove('link-success')
    $btn_formato_3.classList.add('link-info')

    $formato_2.classList.remove('d-none')
    $formato_1.classList.add('d-none')
    $formato_3.classList.add('d-none')

    $btn_activar.value = 'formato_2'
}
$btn_formato_2.addEventListener('click',verFormato_2)

//ver formato 3
const verFormato_3 = ()=>{
    $btn_formato_3.classList.remove('link-info')
    $btn_formato_3.classList.add('link-success')
    $btn_formato_1.classList.remove('link-success')
    $btn_formato_1.classList.add('link-info')
    $btn_formato_2.classList.remove('link-success')
    $btn_formato_2.classList.add('link-info')

    $formato_3.classList.remove('d-none')
    $formato_1.classList.add('d-none')
    $formato_2.classList.add('d-none')

    $btn_activar.value = 'formato_3'
}
$btn_formato_3.addEventListener('click',verFormato_3)

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

  //se guardan los datos nuevos
  function editar() {
    let id_event = event.srcElement.id
    let punto = id_event.split('_')[0]
    let value = event.srcElement.parentNode
    let $fila = value.parentNode
    let $body = $fila.parentNode
    let formato = $body.parentNode
    let elementos = document.querySelectorAll(`.${$fila.id}`)
    let elemento = {}
     if(elementos.length >1){
                elemento = {
                  formato: formato.id,
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
              if(punto == 'punto'){
                location.reload()
              }else{
                console.log(res.mensaje)
              }
            }
          })
  }

//activar rol de servicio
function activar() {
  event.preventDefault();
      let semana = document.getElementById('semana').value
      
      if(semana){
        let formato = {
          semana: semana,
          formato: event.srcElement.value
        }
        let formatoJSON = JSON.stringify(formato)

        fetch(`${URL}`,{
          method: 'put',
          body: formatoJSON
        })
        .then(f => f.json())
        .then(fres =>{
          console.log(fres.mensaje)
        })
      }else{
        alert('ingrese la semana que abarcara el rol de servicio')
      }

}

Date.prototype.getWeek = function() {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const firstWeek = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - firstWeek.getTime()) / 86400000 - 3 + (firstWeek.getDay() + 6) % 7) / 7);
};