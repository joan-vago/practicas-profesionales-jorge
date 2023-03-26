const URL = "http://localhost:3000/elementos"

const listaUsuarios = fetch(URL).then(x =>x.json()).then(res =>{
//se recorre la lista de usuarios registrados

  res.forEach((elemento)=>{
    //Se agregan los usuarios a una tabla para mostrarlos
    if(elemento.estado == 'activo'){
          
          body_table_elementos.innerHTML += `
                    <tr>

                      <td>

                        ${elemento.nombres}
                        ${elemento.apellido_paterno}
                        ${elemento.apellido_materno}

                      </td>
                      <td>

                        ${elemento.numero_empleado}

                      </td>
                      <td>

                        ${elemento.telefono}

                      </td>
                      <td>

                        ${elemento.correo}

                      </td>
                      <td>
                        

                        <button type="button" value="${elemento.numero_empleado}" id="${elemento.numero_empleado}" onclick="verInfo()" class="btn btn-info" >

                          Ver Informacion

                        </button>

                      </td>

                    </tr>
    `
    }


  })
return res
})
//declaro constantes de botones para la navegacio por la pagina
//boton para ver la lista del personal
const $lista_del_personal = document.getElementById('lista_del_personal')
//boton para ver el formulario para registrar un nuevo elemento
const $agregar_elemento = document.querySelector('#agregar_elemento')
//se selecciona la tabla con la informacion de todo el personal
const $table = document.querySelector('.table')
//se selecciona el formulario de registro
const $form_registrar =document.getElementById('card_registrar')
//se selecciona el header del card en el formulario editar
const $card_header_editar = document.getElementById('card-header-editar')
//se selecciona el contenedor principal
const $col_container = document.getElementById('col_container')
//se selecciona el contenedor con la informacion detallada de cada elemento
const $col_info = document.getElementById('col_info')


//ver lista del personal
const listaDelPersonal = () =>{
  $form_registrar.classList.add('d-none')
  $table.classList.remove('d-none')
  $lista_del_personal.classList.remove('link-info')
  $lista_del_personal.classList.add('link-success')
  $agregar_elemento.classList.add('link-info')
  $agregar_elemento.classList.remove('link-success')
}

$lista_del_personal.addEventListener('click',listaDelPersonal)


//abrir formulario para agregar nuevo elemento
const agregarElemento = ()=>{
  $table.classList.add('d-none')
  $form_registrar.classList.remove('d-none')
  $agregar_elemento.classList.remove('link-info')
  $agregar_elemento.classList.add('link-success')
  $lista_del_personal.classList.add('link-info')
  $lista_del_personal.classList.remove('link-success')
}

$agregar_elemento.addEventListener('click',agregarElemento)

//formulario para agregar nuevo elemento
$form_registrar.addEventListener('submit',()=>{
  event.preventDefault();
  let $numero_empleado = document.getElementById('numero_empleado').value
  let $nombres = document.getElementById('nombres').value
  let $apellido_paterno = document.getElementById('apellido_paterno').value
  let $apellido_materno = document.getElementById('apellido_materno').value
  let $telefono = document.getElementById('telefono').value
  let $telefono_adicional = document.getElementById('telefono_adicional').value
  let $correo = document.getElementById('correo').value
  let $fecha_ingreso = document.getElementById('fecha_ingreso').value
  let $domicilio = document.getElementById('domicilio').value

  let datos = {numero_empleado: $numero_empleado ,nombres: $nombres, apellido_paterno: $apellido_paterno, apellido_materno: $apellido_materno, telefono: $telefono, telefono_adicional: $telefono_adicional, correo: $correo, fecha_ingreso: $fecha_ingreso, domicilio: $domicilio}

  let datosJSON = JSON.stringify(datos)

  fetch("http://localhost:3000/elementos",{
    method: 'post',
    body: datosJSON
  })
  .then(x => x.json())
  .then(res => {
    alert(res.mensaje)
    location.reload()
  })
})

//ver la informacion completa de cada elemento
function verInfo() {
  event.preventDefault();
  let numero_empleado = event.srcElement.id
  fetch(`${URL}/${numero_empleado}`)
  .then(x => x.json())
  .then(res =>{
  res.forEach(elemento =>{
    let $numero_empleado = document.getElementById('numero_empleado_editar')
    let $nombres = document.getElementById('nombres_editar')
    let $apellido_paterno = document.getElementById('apellido_paterno_editar')
    let $apellido_materno = document.getElementById('apellido_materno_editar')
    let $telefono = document.getElementById('telefono_editar')
    let $telefono_adicional = document.getElementById('telefono_adicional_editar')
    let $correo = document.getElementById('correo_editar')
    let $fecha_ingreso = document.getElementById('fecha_ingreso_editar')
    let $domicilio = document.getElementById('domicilio_editar')
    $numero_empleado.value = elemento.numero_empleado
    $nombres.value = elemento.nombres
    $apellido_paterno.value = elemento.apellido_paterno
    $apellido_materno.value =  elemento.apellido_materno
    $telefono.value = elemento.telefono
    $telefono_adicional.value = elemento.telefono_adicional
    $correo.value = elemento.correo
    $fecha_ingreso.value = elemento.fecha_ingreso
    $domicilio.value = elemento.domicilio
    $table.classList.add('d-none')
    $col_info.classList.remove('d-none')
    $col_container.classList.add('d-none')
    $card_header_editar.textContent = `Informacion personal de ${elemento.nombres} ${elemento.apellido_paterno} ${elemento.apellido_materno}`
    if(elemento.estado == 'activo'){
      const $btn_b = document.getElementById('btn_b')
      $btn_b.innerHTML= `
          <button class="btn btn-danger baja" id="${elemento.numero_empleado}">Dar de baja</button>
      `
    }
    if(elemento.estado =='baja'){
      const $btn_b = document.getElementById('btn_b')
      $btn_b.innerHTML= `
          <button class="btn btn-danger baja" id="${elemento.numero_empleado}">Dar de alta</button>
      `
    }
    const $btn_baja = document.querySelector('.baja')

    $btn_baja.addEventListener('click',()=>{
      fetch(`${URL}/${$btn_baja.id}`,{
        method: 'delete',
      })
      .then(x => x.json())
      .then(res => {
        alert(res.mensaje)
        if(!res.error){
          location.reload()
        }
      })
    })
  })

  })

}

