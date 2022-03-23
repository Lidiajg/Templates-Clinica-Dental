var expr = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
var expr1 = /^[a-zA-Z]*$/;

$(document).ready(function () {
    $("#boton").click(function (){

        var DNI = $("#text").val();
        var Contraseña = $("#password").val();

        if(DNI == "" || !expr.test(DNI)){
            $("#mensaje1").fadeIn("slow");
            return false;
        }
        else{
            $("#mensaje1").fadeOut();

            if(Contraseña != !expr.test(Contraseña)){
                $("#mensaje2").fadeIn("slow");
                return false;
            }
        }   
        
 
    }
});


