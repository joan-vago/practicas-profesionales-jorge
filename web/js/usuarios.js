let numEmpleadoGet
//se hace un fetch para mostrar los usuarios registrados
const listaUsuarios = fetch("http://localhost:3000/usuarios").then(x =>x.json()).then(res =>{
//se recorre la lista de usuarios registrados
  res.forEach((usuarios)=>{
    //Se agregan los usuarios a una tabla para mostrarlos
    
    body_table_usuarios.innerHTML += `
                    <tr>

                      <td>

                        ${usuarios.nombre}

                      </td>
                      <td>

                        ${usuarios.numero_empleado}

                      </td>
                      <td>

                        ${usuarios.tipo}

                      </td>
                      <td>
                        

                        <button type="button" value="${usuarios.numero_empleado}" onClick="editar(${usuarios.numero_empleado})" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">

                          Editar

                        </button>
                        

                        <button type="button" value="${usuarios.numero_empleado}" onClick="eliminar(${usuarios.numero_empleado})" class="btn btn-danger">

                          Elimiar

                        </button>

                      </td>

                    </tr>
    `

  })
return res
})

//Funcion para eliminar usuarios
function eliminar(numero_empleado) {
    //Se hace el fetch con el metodo delete y se pasa el numero de empleado como parametro en la url
    fetch(`http://localhost:3000/usuarios/${numero_empleado}`,{

      method: "delete",

    })
    //Se recarga la pagina
    location.reload()
}

//Funcion para mostrar los datos en el formulario para editar
function editar(value) {
      
      listaUsuarios.then(res =>{
      //se selecciona el valor de cada uno de los campos.
      let nombre = document.getElementById("editar_nombre")
      let numEmpleado = document.getElementById("editar_numEmpleado")
      let permiso = document.getElementById('editar_permiso')
      let password = document.getElementById("editar_password")
      
 

      res.forEach((usuarios)=>{

        if(value == usuarios.numero_empleado){

          nombre.value = usuarios.nombre 
          numEmpleado.value = usuarios.numero_empleado
          permiso.value = usuarios.tipo
          numEmpleadoGet = usuarios.numero_empleado
        }

      } )

    } )
}

//metodo para registrar usuario
const form_registro = document.getElementById("form_registro")
form_registro.addEventListener("submit", (event)=>{

  event.preventDefault();
if(campos.nombre && campos.numEmpleado && campos.password){
  let nombre = document.getElementById("nombre")
  let numEmpleado = document.getElementById("numEmpleado")
  let permiso = document.getElementById("permiso")
  let password = document.getElementById("password")

  let usuario_nuevo = {nombre: nombre.value, numEmpleado:numEmpleado.value, permiso: permiso.value, password: password.value}
  let usuario_nuevoJSON = JSON.stringify(usuario_nuevo);

  fetch("http://localhost:3000/usuarios",{

    method: "post",
    body: usuario_nuevoJSON

  })

  nombre.value = "";
  numEmpleado.value = "";
  permiso.value="noadm"
  password.value = "";
  location.reload()

}else{
  alert('datos invalidos: ingrese los datos correctamente')
  location.reload()
}
  
})

//metodo para editar usuario
const form_editar = document.getElementById("form_editar")
form_editar.addEventListener("submit", (event)=>{

  event.preventDefault();

  let nombre = document.getElementById("editar_nombre")
  let numEmpleado = document.getElementById("editar_numEmpleado")
  let permiso = document.getElementById("editar_permiso")
  let password = document.getElementById("editar_password")

  let usuario_nuevo = {numEmpleadoGet:numEmpleadoGet, nombre: nombre.value, numEmpleado:numEmpleado.value, permiso: permiso.value, password: password.value}
  let usuario_nuevoJSON = JSON.stringify(usuario_nuevo);

  fetch("http://localhost:3000/usuarios/editar",{

    method: "post",
    body: usuario_nuevoJSON

  })
 location.reload()
}) 

//validacion de formularios
const expresiones = {
	numEmpleado: /^[0-9\_\-]{8}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,12}$/, // 8 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

//objeto para guardr si un camo se valido correctamente
const campos = {
  numEmpleado: false,
  nombre: false,
  password: false,
  editar_numEmpleado: false,
  editar_nombre: false,
  editar_password: false
}

//validacion de formularios de registro y editar
const validacion_formulario = (e)=>{
 //validar nombre formulario registro
  if(e.target.name == 'nombre'){
    validarCampos(expresiones.nombre, e.target, e.target.name)
  }
  //validar nombre formulario editar
  if(e.target.name == 'editar_nombre'){
    validarCampos(expresiones.nombre, e.target, e.target.name)
  }
  //validar numero empleado formulario registro
  if(e.target.name == 'numEmpleado'){
    validarCampos(expresiones.numEmpleado, e.target, e.target.name)
  }
  //validar numero empleado formulario editar
  if(e.target.name == 'editar_numEmpleado'){
    validarCampos(expresiones.numEmpleado, e.target, e.target.name)
  }
  //validar password formulario registro
  if(e.target.name == 'password'){
    validarCampos(expresiones.password, e.target, e.target.name)
  }
  //validar password formulario editar
  if(e.target.name == 'editar_password'){
    validarCampos(expresiones.password, e.target, e.target.name)
  }
}

//funcion para validar los inputs
function validarCampos(expresion, input, campo) {
  
  if(expresion.test(input.value)){
    document.querySelector(`.grupo_${campo} input`).classList.remove('border-danger')
    document.querySelector(`.grupo_${campo} input`).classList.add('border-success')
    campos[campo] = true
   }
   else{
    document.querySelector(`.grupo_${campo} input`).classList.remove('border-success')
    document.querySelector(`.grupo_${campo} input`).classList.add('border-danger')
    document.querySelector(`#${campo}HelpInline`).classList.remove('d-none')
    campos[campo] = false
  }
}

//evento para validar formulario de registro
const inputs_registro = document.querySelectorAll('#form_registro input')
inputs_registro.forEach((input)=>{
  input.addEventListener("keyup",validacion_formulario)
  input.addEventListener("blur",validacion_formulario)
})

//evento para validar formulario editar
const inputs_editar = document.querySelectorAll('#form_editar input')
inputs_editar.forEach((input)=>{
  input.addEventListener("keyup",validacion_formulario)
  input.addEventListener("blur",validacion_formulario)
})

