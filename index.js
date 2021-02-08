var level = 1;
var buttonColors = [];
var iniciado = false;
var encual = 0;

function valores_iniciales(){
  level = 1;
  buttonColors = [];
  iniciado = false;3
  encual = 0;
}

//Se inicia el juego
$(document).keypress(function(){
  $("#level-title").text("Nivel " + level);
  if (iniciado===false){
    begin_game();
  }
});

function begin_game(){
  iniciado = true;
  animarBoton(nextSequence())
}

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  return seleccionDeColor(randomNumber);
}

function seleccionDeColor(a){
  if (a === 0){
    buttonColors.push("green");
    return "green"
  }else if (a === 1){
    buttonColors.push("red");
    return "red"
  }else if (a === 2){
    buttonColors.push("yellow");
    return "yellow"
  }else if (a === 3){
    buttonColors.push("blue");
    return "blue"
  }
}



function animarBoton(boton){
  $("#"+boton).fadeOut(100).fadeIn(100);
  var sonido = new Audio("sounds/" + boton + ".mp3");
  sonido.play();
}


/*
$("#red").click(function(){
  animarBoton("red");
});*/

$(".btn").click(function(event){
  flash(event.target.id);
  checkear_boton(event.target.id);
});

function flash(x){
  var id_boton = "#" + x;
  $(id_boton).addClass("pressed");
  setTimeout(function () {$(id_boton).removeClass("pressed");}, 200);
  var sonido = new Audio("sounds/" + x + ".mp3");
  sonido.play();
}

function checkear_boton(boton_presionado){
  if (boton_presionado === buttonColors[encual]) {
    encual++
    if (encual===buttonColors.length){
      setTimeout(function () {animarBoton(nextSequence());}, 600);
      encual =0;
      level ++
      $("#level-title").text("Nivel " + level);
    }
  }else {
    if (iniciado===true){
    var error = new Audio("sounds/wrong.mp3");
    error.play();
    $("#level-title").text("Game Over");
    $("body").addClass("game-over");
    setTimeout(function () {$("body").removeClass("game-over");}, 300);
    $("body").addClass("game-over");
    $("#level-title").text("mi amor <3 presione una tecla para empezar");
    valores_iniciales();
  }
}
}
