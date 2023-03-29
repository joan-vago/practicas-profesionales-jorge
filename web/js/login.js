//Se crea variable para acceder al elemento formulario de inicio de sesion
const form_inicio_sesion = document.getElementById("form-inicio-sesion")
//Se agrega un evento submit al formulario para enviar los datos al servidor y validarlos
form_inicio_sesion.addEventListener("submit", (event)=>{
  event.preventDefault();
  if(campos.usuario && campos.password){

    //se obtiene los valores de los input 'usuario' y 'password'
    let nombre_usuario = document.getElementById("usuario").value
    let password = document.getElementById("password").value
    //Lo valres de los input se guardan en propiedades de un objeto
    let usuario = {nombre_usuario: nombre_usuario, password: password}
    //Se converte el objeto con los datos a formato JSON
    let usuarioJSON = JSON.stringify(usuario);
    //Se envia el JSON mediante un fetch con el metodo post
    fetch("http://localhost:3000/usuarios/auth",{
      method: "post",
      body: usuarioJSON
    })
    //Se resive la respuesta del servidor
    .then(x =>x.json()).then(res =>{
     
      //si la autenticacion es correcta se redirecciona a la pagina principal
      if(res.autenticacion === "Acceso correcto"){
  
        setCookie('nombre',res.nombre,31)
        setCookie('tipo',res.tipo,31)
        setTimeout(()=>{
          if(res.tipo == 'noadm'){
            location.href = "asistencias.html"
          }
          else{
             location.href = "informacion-de-personal.html"
          }
        
        }, 500); 
        
      }    


    })
  }else{
    console.log('no se envio el formulario')
  }
})
//validacion de formularios
const expresiones = {
	numEmpleado: /^[0-9\_\-]{8}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{8,12}$/, // 8 a 12 digitos.
}
//objeto para guardar si un camo se valido correctamente
const campos = {
  usuario: false,
  password: false
}
//validacion de formulario de inicio de sesion
const validacion_formulario = (e)=>{
  //validar numero empleado
  if(e.target.name == 'usuario'){
    validarCampos(expresiones.numEmpleado, e.target, e.target.name)
  }
  //validar password
  if(e.target.name == 'password'){
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
    // document.querySelector(`#${campo}HelpInline`).classList.remove('d-none')
    campos[campo] = false
  }
}
//evento para validar formulario de inicio de sesion
const inputs_registro = document.querySelectorAll('#form-inicio-sesion input')
inputs_registro.forEach((input)=>{
  input.addEventListener("keyup",validacion_formulario)
  input.addEventListener("blur",validacion_formulario)
})

function setCookie(name, value, expirydays) {
 var d = new Date();
 d.setTime(d.getTime() + (expirydays*24*60*60*1000));
 var expires = "expires="+ d.toUTCString();
 document.cookie = name + "=" + value + "; " + expires;
}

function deleteAllCookies(){
   var cookies = document.cookie.split(";");
   for (var i = 0; i < cookies.length; i++)
     deleteCookie(cookies[i].split("=")[0]);
}
function deleteCookie(name){
  setCookie(name,"",-1);
}