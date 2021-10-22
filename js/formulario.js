const formulario = document.querySelector('#formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{10}$/ // solamente 10 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    email: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch( e.target.name ) {
        case "usuario" :
            validarCampo(expresiones.usuario, e.target, 'usuario');
        break;
        case "nombre" :
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "password" :
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
        break;
        case "password2" :
            validarPassword2();
        break;
        case "email" :
            validarCampo(expresiones.correo, e.target, 'email');
        break;
        case "telefono" :
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if( expresion.test(input.value) ) {
        document.querySelector(`#grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.querySelector(`#grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');

        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('animate__fadeIn');
        setTimeout( () => {
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('animate__fadeOut');
        }, 4500 );
        setTimeout( () => {
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('animate__fadeOut');
        }, 5000 )
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.querySelector('#password');
    const inputPassword2 = document.querySelector('#password2');

    if( inputPassword1.value !== inputPassword2.value || inputPassword1.value === '' ) {
        document.querySelector(`#grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password'] = false;
    } else {
        document.querySelector(`#grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password'] = true;
    }
}

inputs.forEach( (input) => {
    input.addEventListener('keyup', validarFormulario );
    input.addEventListener('blur', validarFormulario );
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const terminos = document.querySelector('#terminos');
    if( campos.usuario && campos.nombre && campos.password && campos.email && campos.telefono && terminos.checked ) {
        console.log('validados');
        
        document.querySelector('#sk-chase').classList.add('sk-chase-activo');
        setTimeout( () => {
            document.querySelector('#sk-chase').classList.remove('sk-chase-activo');
            formulario.reset();
            document.querySelector('#formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            document.querySelectorAll('.formulario__grupo-correcto').forEach( (icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            } );
            setTimeout( () => {
                document.querySelector('#formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000 );
        }, 5000 );
    }else {
        document.querySelector('#formulario__mensaje').classList.add('formulario__mensaje-activo');
        document.querySelector('#formulario__mensaje').classList.add('animate__fadeIn');
        // Agregará la clase fadeOut para cuando terminé el mensaje
        setTimeout( () => {
            document.querySelector('#formulario__mensaje').classList.add('animate__fadeOut');
        }, 3500 )
        // Quita el mensaje de error despues de 4s
        setTimeout( () => {
            document.querySelector('#formulario__mensaje').classList.remove('formulario__mensaje-activo');
            document.querySelector('#formulario__mensaje').classList.remove('animate__fadeOut');
        }, 4000 )
    }
} );