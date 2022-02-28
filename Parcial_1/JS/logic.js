var intentos;  // INT

var palabras; // LISTA DE STRING's
var puntajes = [0]; // LISTA DE INT's
var jugadors = ["Player"]; // LISTA DE STRING's

var palabra_misterio_backend; // STRING
var palabra_misterio_frontend; // STRING

var jugador_actual; // INT

var inicio;
var fin;
// BEGGINING OF EXECUTION
function main() {
    $("#hero").show();
    $("#login").hide();
    init();
    palabra_misterio_backend = String(palabra_misterio_backend);
    palabra_misterio_frontend = String(palabra_misterio_frontend);
    $("#unknown_word").attr("value", palabra_misterio_frontend);
    catch_click();
    catch_nickname();
    catch_hint();
    play_again();
}
// INICIALIZAR LAS VARIABLES GLOBALES EN SUS VALORES POR DEFECTO
function init() {
    intentos = 6;
    inicio = new Date();
    let pos_aleatoria = random_int_int(0, palabras.length-1);
    palabra_misterio_backend = palabras[pos_aleatoria];

    palabra_misterio_frontend = "";
    for (let i = 0; i < palabra_misterio_backend.length; i++) {
        palabra_misterio_frontend += "X";
    }
    $("#unknown_word").attr("value", palabra_misterio_frontend);
    make_img_transition();
}
// INICIALIZAR UNA LISTA DE PALABRAS CON ALGUNAS PALABRAS INICIALES
function init_words() {
    let words_list = [];
    add_word(words_list, "ESTEBAN");
    add_word(words_list, "HERNANDEZ");
    add_word(words_list, "RAMIREZ");
    add_word(words_list, "DESARROLLO");
    add_word(words_list, "WEB");
    return words_list;
}
// INICIALIZAR POR DEFAULT UNA LISTA DE PUNTAJES PARA TODOS LOS JUGADORES
function init_scores(num_players) {
    let scores_list = [];
    let default_score = 0;
    for (let i = 0; i < num_players; i++) {
        scores_list.push(default_score);
    }
    return scores_list;
}
// AGREGAR UNA PALABRA AL FINAL DE LA LISTA DE PALABRAS
function add_word(words_list, word) {
    let new_words_list = words_list;
    new_words_list.push(word);
    return new_words_list;
}
// ELIMINAR LA PALABRA EN LA POSICION DE UNA LISTA DE PALABRAS
function del_word(words_list, indx) {
    let new_words_list = words_list;
    new_words_list.splice(indx, 1);
    return new_words_list;
}
// GENERAR UN ENTERO ALEATORIO EN EL INTERVALO
function random_int_int(min, max) {
    return Math.round(Math.random() * (max - min) + min); 
}
// HACER TRANSICION DE IMAGEN DEL AHORCADO
function make_img_transition() {
    let num_dibujos = 7;
    $("#dibujo_ahorcado").attr("src", "../OTROS/dibujo_" + (num_dibujos - intentos) + ".PNG");
}
// CHEQUEAR SI EL JUGADOR HA COMPLETADO TODA LA PALABRA
function check_victory() {
    let flag = false;
    for (let i = 0; i < palabra_misterio_frontend.length; i++) {
        if (palabra_misterio_frontend[i] == "X") {
            flag = true;
        }
    }
    if (!flag) {
        $("#hero").hide();
        alert("¡FELICITACIONES! HAS COMPLETADO LA PALABRA");
        //init();
        play_victory();
        $("#login").show();
        add_time(false);
    }
}
// CHEQUEAR SI SE HAN ALCANZADO EL MAXIMO DE ERRORES PERMITIDOS
function check_gameover() {
    if (intentos == 0) {
        alert("GAME OVER!");
        //init();
        play_gameover();
        $("#hero").hide();
        $("#login").show();
        add_time(true);
    }
}
// REPRODUCIR SONIDO DE FONDO CUANDO EL JUGADOR ACIERTA
function play_rigth() {
    var audio = new Audio("../OTROS/correct-ding.mp3");
    audio.play();
}
// REPRODUCIR SONIDO DE FONDO CUANDO EL JUGADOR ACIERTA
function play_victory() {
    var audio = new Audio("../OTROS/mission-passed.mp3");
    audio.play();
}
// REPRODUCIR SONIDO DE FONDO CUANDO EL JUGADOR COMETE UN ERROR
function play_error() {
    var audio = new Audio("../OTROS/chicharra-error-incorrecto-.mp3");
    audio.play();
}
// REPRODUCIR SONIDO DE FONDO CUANDO AL JUEGO A TERMINADO POR GAMEOVER
function play_gameover() {
    var audio = new Audio("../OTROS/incorrecto-bocina-.mp3");
    audio.play();
}
// REMPLAZAR CHARACTER EN LA POSICION DE UN STRING
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
// HACER ESTO CUANDO SE PRESIONA EN BOTON
function catch_click() {
    $(".key_button").click(function() {
        let flag = false;
        for (let i = 0; i < palabra_misterio_backend.length; i++) {
            if (palabra_misterio_backend[i] == this.value) {
                palabra_misterio_frontend = palabra_misterio_frontend.replaceAt(i, this.value);
                flag = true;
            }
        }
        $(this).hide();
        $("#unknown_word").attr("value", palabra_misterio_frontend);
        if (!flag) {
            make_img_transition();
            intentos--;
            play_error();
        } else {
            play_rigth();
        }
        check_victory();
        check_gameover();
    });
}
// HACER ESTO CUANDO EL USUARIO INGRESA SU NICKNAME
function catch_nickname() {
    $("#submit_nickname").click(function () {
        let val = document.getElementById('bar_nickname').value;
        //alert(puntajes);
        add_player(val);
        //add_time();
        show_players();
    });
}
// AYUDA QUE IMPRIME UNA DE LAS LETRAS DE LA PALABRA DE MANERA ALEATORIA
function catch_hint() {
    $("#button_ayuda").click(function () {
        let pos_aleatoria = random_int_int(0, palabra_misterio_backend.length-1);
        for (let i = 0; i < palabra_misterio_backend.length; i++) {
            if (i == pos_aleatoria) {
                palabra_misterio_frontend = palabra_misterio_frontend.replaceAt(i, palabra_misterio_backend[i]);
            }
        }
        $("#unknown_word").attr("value", palabra_misterio_frontend);
    });
}
// IMPRIMIR LA LISTA MAS ACTUALIZADA EN PANTALLA
function show_players() {
    var completelist= document.getElementById("thelist");
    completelist.innerHTML += "<li>" + jugadors[jugadors.length-1] + " : " + puntajes[puntajes.length-1] + " milseg </li>";        

    var completetable = document.getElementById("theTable");
    completetable.innerHTML += "<tr> <td>" + jugadors[jugadors.length-1] + "</td> <td>" + puntajes[puntajes.length-1] + "</td> </tr>";
}
// AGREGAR EL USUARIO A LA LISTA DE PUNTAJES
function add_player(name) {
    jugadors.push(name);
}
// AGREGAR EL TIEMPO DEL USUARIO A LA LISTA DE PUNTAJES
function add_time(flag) {
    if (flag) {
        puntajes.push(0);
    } else {
        fin = new Date();
        puntajes.push(99999999 - (fin.getTime() - inicio.getTime()));
    }
}
// VOLVER A JUGAR CUANDO EL JUGADOR PRESIONA EL BOTON
function play_again() {
    $("#play_again").click(function () {
        $("#login").hide();
        $("#hero").show();
        $(".key_button").show();
        init();
    });
}

$(document).ready(function () {
    palabras = init_words();
    main();
});

// QUINTO CHECKPOINT!