// https://mappa.js.org/docs/examples-three-js.html



const key = 'pk.eyJ1IjoicmljYXJkb2xhbmduZXIiLCJhIjoiY2pxano2enh2MG1qazN4bm5lajIzeDl3eiJ9.wK0MtuxLgJxDcGUksKMeKg';

// Options for map
const options = {
    lat: 0,
    lng: 0,
    zoom: 4,
    style: 'mapbox://styles/mapbox/traffic-night-v2',
    pitch: 50,
};

// Create an instance of MapboxGL
const mappa = new Mappa('MapboxGL', key);
let myMap;

let canvas = document.getElementById("map_canvas");
let container = document.getElementById("map");



container.width=window.innerWidth*0.6;
container.height=window.innerHeight*0.8;
canvas.width=container.width
canvas.height=container.height;


myMap = mappa.tileMap(options);
myMap.overlay(canvas);