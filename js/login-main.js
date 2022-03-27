$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });
/* definimos nuestro array en donde guardaremos nuestros datos */
 let usuariosList=[]


 /* Comenzamos validando la contraseña */
 function validarPassword(password, passwordConfirm) {
     if(password == passwordConfirm){
         return true;
     }
 }
 /* Validamos la longitud de la contraseña y la convertimos en minusculas */
 function validarPasswordlongitud(password){
   password= password.toLowerCase(); 
   if (password.length<=7) {
    return false;
}
 }

 function existeUserName(username){
    return Boolean(usuariosList.find(function(item){
        return item[0] == username;
     }));
  }
/* Validamos el nombre de usuario */
  function validarUserName(username){
    username = username.toLowerCase();
   if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return true;
   }
    if(username.length == 0) 
        return true;
    if(username.length < 6) 
        return true;
    if(!isNaN(username[0])) 
        return true;
    return false;

 }
 /* Con la function validarEmail verificamos de que exista y que tenga los caracteres correcto */
 function validarEmail(email) {
    if (usuariosList.find(function(item){
       return item[2] == email;
    }) !== undefined) return false;
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email)){
       return true;
    } else {
        return false;
    }

 }
  let mostaralerta = document.getElementById("alert");
/* Hacemos nuestra funcion getHtmlAlert y showAlert para mostrar nuestra alerta */
 function getHtmlAlert(tipo, mensaje){
    return ` <div class="alert alert-${tipo}" role="alert">
                ${mensaje}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                </button>
             </div>`
 }
 
 function showAlert(tipo, mensaje, divElement){
    divElement.innerHTML= getHtmlAlert(tipo, mensaje);
 }

/* Realizamos nuestra funcion registrar usuario */
 document.getElementById("btncrearusuario").addEventListener('click', function registrarUsuario(e){
    e.preventDefault();
    let username = document.getElementById("nuevousuario").value;
    let password =document.getElementById("nuevacontraseña").value;
    let passwordConfirm = document.getElementById("confirmacontra").value;
    let email = document.getElementById("correoelectronico").value;
    let passencript = window.btoa(passwordConfirm);
   
    if (existeUserName(username)) {
       showAlert("warning", "El nombre de usuario ya se encuentra registrado", mostaralerta);
    } 
     if (validarUserName(username)) {
       showAlert("warning", "El nombre de usuario no llega a cumplir con los requisitos", mostaralerta);
    } 
     if (!validarPassword(password, passwordConfirm)) {
       showAlert("warning", "Las contraseñas ingresadas no coinciden", mostaralerta);
    } 
     if (validarPasswordlongitud(password)) {
       showAlert("warning", "La contraseña no llega cumplir con los requisitos", mostaralerta);
    } 
     if (Boolean(!validarEmail(email))) {
       showAlert("warning", "El email no cumple los requisitos o ya está registrado", mostaralerta);
    } 
    else {     
       usuariosList.push([username, passencript, email, Date.now(), '']) && showAlert("primary", "Los datos se registraron correctamente", mostaralerta);

    }
 });

 /* Validamos el usuario */
 function validarUsuario(userlog, passlog){
    return usuariosList.find(function(item){
    return item[0] === userlog && item[1] === passlog
    })
 }
 
 
 /* Validamos iniciar sesion */
 let intento= 1;
 document.getElementById("btniniciarsesion").addEventListener("click", function loginUsuario(event){
    event.preventDefault();
    let userlog = document.getElementById("usuario").value;
    let passlog = document.getElementById("contraseña").value;
    let date = Date.now();
    let passdesencrit = window.btoa(passlog);
    
 
    usuariosList.find(function(item){
       if (userlog === item[0]){
          item[4] = date;
       }
    })
    
    if(validarUsuario(userlog, passdesencrit)){
        showAlert("success", "Bienvenido " + userlog , mostaralerta);
        intento = 1;
        setTimeout("location.href='citas.html'", 1000);
     } else {
        showAlert("warning", "Numero de intentos: " + intento, document.getElementById("alertIntentos"));
        showAlert("warning", "<b>El usuario y contraseña ingresados son incorrectos</b>", mostaralerta);
  
        if (intento >= 3) {
           showAlert("danger", "<b>Usted a superado el numero de intentos </b>", document.getElementById("alertIntentos"));
           document.getElementById('btniniciarsesion').disabled = 'true';
           document.getElementById('usuario').disabled = 'true';
           document.getElementById('contraseña').disabled = 'true';
        }
        
        intento++;
     }
  
  });
  