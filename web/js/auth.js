if(!getCookie('tipo') || !getCookie('nombre')){
   window.location.href = 'login.html'
}

const $logout = document.getElementById('logout')
$logout.addEventListener('click',()=>{
  event.preventDefault()
  deleteAllCookies()
  window.location.href = 'login.html'
})

function deleteAllCookies(){
   var cookies = document.cookie.split(";");
   for (var i = 0; i < cookies.length; i++)
     deleteCookie(cookies[i].split("=")[0]);
}
  const nombre = document.getElementById('nombre_del_usuario')
  nombre.textContent = getCookie('nombre')
if(getCookie('tipo') != 'admin'){
  const usuarios = document.getElementById('usuarios')
  const rol = document.getElementById('rol-de-servicio')
  const info = document.getElementById('informacion-de-personal')

  usuarios.classList.add('d-none')
  rol.classList.add('d-none')
  info.classList.add('d-none')
}

function setCookie(name, value, expirydays) {
 var d = new Date();
 d.setTime(d.getTime() + (expirydays*24*60*60*1000));
 var expires = "expires="+ d.toUTCString();
 document.cookie = name + "=" + value + "; " + expires;
}

function deleteCookie(name){
  setCookie(name,"",-1);
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}