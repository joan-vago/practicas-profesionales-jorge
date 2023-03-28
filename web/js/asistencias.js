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
        let item_salida = `salida_${expR_(element)}`
        //Se agrega el punto de trabajo a ua variable
        const $punto_de_trabajo = document.getElementById(`${item}`)
        const $punto_de_trabajo_s = document.getElementById(`${item_salida}`)
     
        let tr_id = 0
        json_asistencias.formato.forEach(it =>{
          
          let id_entrada = `entrada_${expR_(it.punto)}`
          let id_salida = `salida_${expR_(it.punto)}`
          
          if(id_entrada == $punto_de_trabajo.id){
              //se agrega a la tabla de entrada
              const $fila_entrada = document.createElement("tr")
              $fila_entrada.setAttribute('class',`${item}`)
              $fila_entrada.setAttribute('id',`${item}_${tr_id++}`)
              
              $fila_entrada.innerHTML +=`
              <td><span class="${$fila_entrada.id}">${it.numero_empleado}</span></td>
              <td><span class="${$fila_entrada.id}">${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}</span></td>
              <td><input type="time" class="form-control ${$fila_entrada.id}" value="${it.dia_entrada}" onblur="guardar()" onchange="this.setAttribute('disabled','')"></td>
              <td><input type="text" class="form-control ${$fila_entrada.id}" value="${it.punto}" ></td>
              `
                  
              const $numero_filas = document.querySelectorAll(`.${item}`)
              if($numero_filas.length ==1){
                $punto_de_trabajo.insertAdjacentElement('afterend', $fila_entrada)
              }else{
                let $ultima_fila = $numero_filas[$numero_filas.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila_entrada)
              }
          }

          if(id_salida == $punto_de_trabajo_s.id && it.dia_entrada != null){
              //se agrega a la tabla de entrada
              const $fila_salida = document.createElement("tr")
              $fila_salida.setAttribute('class',`${item_salida}`)
              $fila_salida.setAttribute('id',`${item_salida}_${tr_id++}`)
                  
              $fila_salida.innerHTML +=`
              <td><span class="${$fila_salida.id}">${it.numero_empleado}</span></td>
              <td><span class="${$fila_salida.id}">${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}</span></td>
              <td><input type="time" class="form-control ${$fila_salida.id}" value="${it.dia_salida}" onblur="guardar()" onchange="this.setAttribute('disabled','')"></td>
              `
                  
              const $numero_filas = document.querySelectorAll(`.${item_salida}`)
              if($numero_filas.length ==1){
                $punto_de_trabajo_s.insertAdjacentElement('afterend', $fila_salida)
              }else{
                let $ultima_fila = $numero_filas[$numero_filas.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila_salida)
              }
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

  function guardar() {
    event.preventDefault();
    // this.setAttribute('readonly','')
    let nodo_td = event.srcElement.parentNode
    let nodo_tr = nodo_td.parentNode
    let nodo_body = nodo_tr.parentNode

    let horario = nodo_tr.id.split('_')[0]
    console.log(horario)
    let datos = document.querySelectorAll( `.${nodo_tr.id}`)
    let data = {}
    if(horario == 'entrada'){
      data.horario = horario
      data.numero_empleado = datos[0].textContent
      data.dia = datos[2].value
      data.punto = datos[3].value
    }
    if(horario == 'salida'){
      data.horario = horario
      data.numero_empleado = datos[0].textContent
      data.dia = datos[2].value
    }
    let dataJSON = JSON.stringify(data)

    fetch(`${urlAsistencias}`,{
      method: 'put',
      body: dataJSON
    })
    .then(x => x.json())
    .then(res => {
      console.log(res.mensaje)
    })
    
  }





