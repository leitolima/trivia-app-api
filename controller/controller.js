const categorias = require('../data/categorias').categorias;
const fs = require('fs');
const path = require('path');
const PREGUNTAS_JSON = path.join(__dirname, '..', 'data', 'preguntas.json');

const readFile = () => {
    const json = fs.readFileSync(PREGUNTAS_JSON);
    return JSON.parse(json);
}

exports.getCategorias = (req, res) => {
    res.send(categorias);
}

exports.getUnaPregunta = (req, res) => {
    const { categoria, realizadas } = req.body;
    const pregArr = readFile();
    const newPregArr = pregArr.filter(obj => obj.categoria === categoria && realizadas.indexOf(obj.id) === -1);
    const randomIndex = Math.floor(Math.random() * newPregArr.length);
    var preg = newPregArr[randomIndex];
    preg.respuestas = preg.respuestas.map(r => r.rta);
    res.send(preg);
}

exports.compararPregunta = (req, res) => {
    const { rta, id } = req.body; 
    const pregArr = readFile();
    const pregArr2 = pregArr.filter(obj => obj.id === id);
    const indexCorrecta = pregArr2[0].respuestas.findIndex(r => r.value === true);
    const respuestaCorrecta = pregArr2[0].respuestas[indexCorrecta].rta;
    if(rta == respuestaCorrecta){
        return res.send({type: true});
    } else {
        return res.send({type: false});
    }
}

exports.calcularPuntuacion = async (req, res) => {
    const { correctas, categoria } = req.body;
    //Calculo de puntuacion
    const puntuacion = correctas.length*0.5;
    //Filtrar por categoria
    const pregArr = readFile();
    var preguntas = pregArr.filter(obj => obj.categoria === categoria);
    await preguntas.forEach((preg, i) => {
        const rtaArr = preg.respuestas.filter(r => r.value === true);
        const rtaCorrecta = rtaArr[0];
        preg.respuesta = rtaCorrecta;
    })
    res.send({puntuacion, preguntas});
}