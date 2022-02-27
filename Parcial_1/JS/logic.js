var intentos = 5;  // INT
var jugadors = 10; // INT

var palabras; // LISTA DE STRING's
var puntajes; // LISTA DE INT's

var palabra_misterio_backend; // STRING
var palabra_misterio_frontend; // STRING

function main() {
    init();
    palabra_misterio_backend = String(palabra_misterio_backend);
    palabra_misterio_frontend = String(palabra_misterio_frontend);
    $("#unknown_word").attr("value", palabra_misterio_frontend);
    catch_click();
}

function init() {
    palabras = init_words();
    puntajes = init_scores(jugadors);

    let pos_aleatoria = random_int_int(0, palabras.length);
    palabra_misterio_backend = palabras[pos_aleatoria];

    palabra_misterio_frontend = "";
    for (let i = 0; i < palabra_misterio_backend.length; i++) {
        palabra_misterio_frontend += "X";
    }
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
// CHEQUEAR SI SE HAN ALCANZADO EL MAXIMO DE ERRORES PERMITIDOS
function check_gameover() {
    if (intentos == 0) {
        alert("GAME OVER!");
    } else {
        alert("intentos restantes: " + intentos);
    }
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
        $("#unknown_word").attr("value", palabra_misterio_frontend);
        if (!flag) {
            intentos--;   
        }
        check_gameover();
    });
}

$(document).ready(function () {
    main();
});

// PRIMER CHECKPOINT!