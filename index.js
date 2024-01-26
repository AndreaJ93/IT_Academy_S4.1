"use strict";
const chisteRandom = document.getElementById("chiste");
const tiempoActual = document.getElementById("tiempo");
let backgroundID = document.getElementById("backgroundX");
let miniBackground = document.getElementById("miniBackground");
let imagenTiempo = document.getElementById("imagenTiempo");
const reportAcudits = [];
let randomJoke = true;
let background = 1;
let counter = 1;
function obtenerChiste() {
    fetch('https://icanhazdadjoke.com/', {
        headers: {
            "Accept": "application/json",
        },
    })
        .then(res => res.json())
        .then(data => visualizarChiste(data));
}
function visualizarChiste(chiste) {
    if (chisteRandom) {
        chisteRandom.innerHTML = "";
    }
    const h3 = document.createElement("h3");
    h3.textContent = chiste.joke;
    chisteRandom === null || chisteRandom === void 0 ? void 0 : chisteRandom.appendChild(h3);
}
let puntuacion = "-";
function puntuacionChiste(id) {
    puntuacion = id;
}
function siguienteChiste() {
    //Metodo para alternar chistes:
    if (randomJoke === true) {
        obtenerChiste();
        randomJoke = false;
    }
    else if (randomJoke === false) {
        obtenerChiste2();
        randomJoke = true;
    }
    //Creación del Array de puntuaciones:
    let newDate = new Date().toISOString();
    let onlyDate = newDate.split("T");
    let isoDate = onlyDate[0];
    reportAcudits.push({ joke: chisteRandom === null || chisteRandom === void 0 ? void 0 : chisteRandom.textContent, score: puntuacion, date: isoDate });
    puntuacion = "-";
    console.log(reportAcudits);
    //Cambio de fondo al pasar al siguiente chiste:
    if (backgroundID === null || miniBackground === null) {
        backgroundID = document.getElementById("backgroundX");
        miniBackground = document.getElementById("iconBackground");
    }
    else {
        if (background === 0) {
            backgroundID.className = "background0";
            miniBackground.className = "position1";
            background = 1;
        }
        else if (background === 1) {
            backgroundID.className = "background1";
            miniBackground.className = "position2";
            background = 2;
        }
        else if (background === 2) {
            backgroundID.className = "background2";
            miniBackground.className = "position3";
            background = 3;
        }
        else if (background === 3) {
            backgroundID.className = "background3";
            miniBackground.className = "position2";
            background = 0;
        }
    }
}
function obtenerTiempo() {
    fetch('https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/08019')
        .then(res => res.json())
        .then(data => visualizarTiempo(data));
}
function visualizarTiempo(data) {
    if (tiempoActual) {
        tiempoActual.innerHTML = "";
    }
    const h5 = document.createElement("h5");
    stateSkyImage(data.stateSky.description);
    h5.textContent = ` ${data.stateSky.description} | ${data.temperatura_actual} ºC`;
    //Visualizar por intervalos distintos datos:
    setInterval(function () {
        if (counter === 1) {
            h5.textContent = `  Max: ${data.temperaturas.max} ºC | Min: ${data.temperaturas.min} ºC`;
            counter = 2;
        }
        else if (counter === 2) {
            stateSkyImage(data.stateSky.description);
            h5.textContent = ` ${data.stateSky.description} | ${data.temperatura_actual} ºC`;
            counter = 1;
        }
    }, 5000);
    tiempoActual === null || tiempoActual === void 0 ? void 0 : tiempoActual.appendChild(h5);
}
function obtenerChiste2() {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(res => res.json())
        .then(data => visualizarChiste2(data));
}
function visualizarChiste2(chiste) {
    if (chisteRandom) {
        chisteRandom.innerHTML = "";
    }
    const h3 = document.createElement("h3");
    h3.textContent = chiste.value;
    chisteRandom === null || chisteRandom === void 0 ? void 0 : chisteRandom.appendChild(h3);
}
function stateSkyImage(stateSky) {
    //Imagen según estado del tiempo:
    if (imagenTiempo === null) {
        imagenTiempo = document.getElementById("imagenTiempo");
    }
    else {
        if (stateSky === "Despejado" || stateSky === "Soleado") {
            imagenTiempo.setAttribute("src", "./tiempo/icons8-sol-48.png");
        }
        else if (stateSky === "Poco nuboso" || stateSky === "Bruma" || stateSky === "Nubes altas" || stateSky === "Niebla" || stateSky === "Muy nuboso" || stateSky === "Cubierto") {
            imagenTiempo.setAttribute("src", "./tiempo/icons8-nubes-48.png");
        }
        else if (stateSky === "Lluvioso" || stateSky === "Lluvia" || stateSky === "Llovizna" || stateSky === "Precipitaciones" || stateSky === "Tormenta") {
            imagenTiempo.setAttribute("src", "./tiempo/icons8-lluvia-48.png");
        }
        else if (stateSky === "Nieve") {
            imagenTiempo.setAttribute("src", "./tiempo/icons8-nieve-48.png");
        }
        else {
            imagenTiempo.setAttribute("alt", "stateSky");
        }
    }
}
obtenerChiste();
obtenerTiempo();
obtenerChiste2();
