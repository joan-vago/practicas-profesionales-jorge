const urlRol = "http://localhost:3000/rol";
const urlAsistencias = "http://localhost:3000/asistencias";

let set_entrada = new Set;
let set_salida = new Set;
let dia_salida
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

    json_asistencias.formato_entrada.forEach(item =>{  
      set_entrada.add(item.punto)//se va agregando los puntos de trabajo existentes a una variable de tipo set
    })

    json_asistencias.formato_salida.forEach(item =>{
      set_salida.add(item.punto)//se va agregando los puntos de trabajo existentes a una variable de tipo set
    })

    dia_salida = json_asistencias.dia_salida
    //se agregan los nombre de los puntos de trabajo a la tabla de entrada
    set_entrada.forEach(item =>{
        //se elimina los espacios en blanco y cambiarlos por un guion bajo
        let id_entrada = `entrada_${expR_(item)}`
        t_body_entrada.innerHTML += `
          <tr id="${id_entrada}" class="${id_entrada}">
          <td colspan="3" class="border-0">
            ${item}
          </td>
          <td colspan="8" class="border-0"></td>
          </tr>
            `
    })

    //se agrega los nombres de los puntos de trabajo a la tabla salida
    set_salida.forEach(item =>{
      let id_salida = `salida_${expR_(item)}`
      t_body_salida.innerHTML += `
        <tr id="${id_salida}" class="${id_salida}">
          <td colspan="3" class="border-0">
            ${item}
          </td>
          <td colspan="8" class="border-0"></td>
        </tr>
        `
    })

    //se agregan los datos a la tabla de entrada acorde a los puntos de trabajo de cada colaborador
    set_entrada.forEach(element =>{
        //se elimina los espacios en blanco y cambiarlos por un guion bajo
        let item = `entrada_${expR_(element)}`
        //Se agrega el punto de trabajo a ua variable
        const $punto_de_trabajo = document.getElementById(`${item}`)

        let tr_id = 0
        json_asistencias.formato_entrada.forEach(it =>{
          
          let id_entrada = `entrada_${expR_(it.punto)}`

          if(id_entrada == $punto_de_trabajo.id){
              //se agrega a la tabla de entrada
              const $fila_entrada = document.createElement("tr")
              $fila_entrada.setAttribute('class',`${item}`)
              $fila_entrada.setAttribute('id',`${item}_${tr_id++}`)
              let str_body 
              if(it.horario){
                str_body = `
              <td><span class="${$fila_entrada.id}">${it.numero_empleado}</span></td>
              <td><span class="${$fila_entrada.id}">${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}</span></td>
              <td><input type="time" class="form-control ${$fila_entrada.id}" value="${it.horario}" disabled readonly onblur="guardar()" onchange="this.setAttribute('disabled','')"></td>
              <td><input type="text" class="form-control ${$fila_entrada.id}" value="${it.punto}" ></td>
              `
              }else{
                str_body = `
              <td><span class="${$fila_entrada.id}">${it.numero_empleado}</span></td>
              <td><span class="${$fila_entrada.id}">${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}</span></td>
              <td><input type="time" class="form-control ${$fila_entrada.id}" value="" onblur="guardar()" onchange="this.setAttribute('disabled','')"></td>
              <td><input type="text" class="form-control ${$fila_entrada.id}" value="${it.punto}" ></td>
              `
              }
              $fila_entrada.innerHTML +=str_body
                  
              const $numero_filas = document.querySelectorAll(`.${item}`)
              if($numero_filas.length ==1){
                $punto_de_trabajo.insertAdjacentElement('afterend', $fila_entrada)
              }else{
                let $ultima_fila = $numero_filas[$numero_filas.length-1]
                $ultima_fila.insertAdjacentElement('afterend',$fila_entrada)
              }
          }

        })
    })
    //se agregan los datos a la tabla de salida acorde a los puntos de trabajo de cada colaborador
    set_salida.forEach(element =>{
      let item_salida = `salida_${expR_(element)}`
      const $punto_de_trabajo_s = document.getElementById(`${item_salida}`)
        let tr_id = 0
        json_asistencias.formato_salida.forEach(it =>{
          
          let id_salida = `salida_${expR_(it.punto)}`
          
          if(id_salida == $punto_de_trabajo_s.id){
              //se agrega a la tabla de entrada
              const $fila_salida = document.createElement("tr")
              $fila_salida.setAttribute('class',`${item_salida}`)
              $fila_salida.setAttribute('id',`${item_salida}_${tr_id++}`)
              let str_body 
              if(it.horario){
                str_body =`
              <td><span class="${$fila_salida.id}">${it.numero_empleado}</span></td>
              <td><span class="${$fila_salida.id}">${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}</span></td>
              <td><input type="time" class="form-control ${$fila_salida.id}" value="${it.horario}" disabled readonly onblur="guardar()" onchange="this.setAttribute('disabled','')"></td>
              `
              }else{
                str_body =`
              <td><span class="${$fila_salida.id}">${it.numero_empleado}</span></td>
              <td><span class="${$fila_salida.id}">${it.nombres +" "+ it.apellido_paterno + " "+ it.apellido_materno}</span></td>
              <td><input type="time" class="form-control ${$fila_salida.id}" value="" onblur="guardar()" onchange="this.setAttribute('disabled','')"></td>
              `
              }
              $fila_salida.innerHTML +=str_body
                  
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
      data.hora = datos[2].value
      data.punto = datos[3].value
    }
    if(horario == 'salida'){
      data.horario = horario
      data.dia = dia_salida
      data.numero_empleado = datos[0].textContent
      data.hora = datos[2].value
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





