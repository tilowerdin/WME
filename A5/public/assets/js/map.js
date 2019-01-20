// Code wurde nach Hilfe in Aufgabe 5 und Beispiel von Mappa (https://mappa.js.org/docs/examples-three-js.html) designed



// Lock-Variable um Laden der CSV abzuwarten
var dataLoaded = false;


var balken;
var balken_sammlung = [];

// Farbe und Shading Model der Balken
var material_red = new THREE.MeshLambertMaterial({color: 0xff0000, side: 2, shading: THREE.FlatShading});
var material_orange = new THREE.MeshLambertMaterial({color: 0xfcae07, side: 2, shading: THREE.FlatShading});
var material_green = new THREE.MeshLambertMaterial({color: 0x28fc07, side: 2, shading: THREE.FlatShading});


// Lade GPS Koordinaaten, Handys pro Einwohnerzahl und Geburtsrate der Laender aus CSV
d3.csv("./world_data.csv", function (d) {
    return {
        lat: d.gps_lat,
        lng: d.gps_long,
        brith_rate: d.birth_rate_per_1000,
        cell_phones: d.cell_phones_per_100 * 10
    };
}, function (data) {
    balken = data;

    // Erstelle fuer jedes Land einen Balken wessen Hoehe der Geburtsrate entspricht
    for (let i = 0; i < data.length; i++) {
        var geometry = new THREE.BoxGeometry(7.5, data[i].brith_rate , 7.5);
        var mesh = new THREE.Mesh(geometry,material_red);

        balken_sammlung.push(mesh);
    }


    dataLoaded = true;
});


// Szenen Optionne
const WIDTH = window.innerWidth * 0.6;
const HEIGHT = window.innerHeight * 0.8;
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Szene, Kamera, HTML-Canvas und WebGL-Renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var canvas = document.getElementById("map_canvas");
var renderer = new THREE.WebGLRenderer({alpha: true, canvas: canvas});

// Setze Kamera ueber Karte
camera.position.z = 300;

// Ordne Kamera der Szene zu
scene.add(camera);

// Setzen Szenenmasse
renderer.setSize(WIDTH, HEIGHT);

// Weisses Licht zwischen Karte und Kamera
var light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(0, 0, 100);
scene.add(light);

// API Key foer Mapbox
var key = 'pk.eyJ1IjoicmljYXJkb2xhbmduZXIiLCJhIjoiY2pxano2enh2MG1qazN4bm5lajIzeDl3eiJ9.wK0MtuxLgJxDcGUksKMeKg';


// Starteinstellungen fuer die Mapbox (Wo auf der Karte etc.)
var options = {
    lat: 51.050407,
    lng: 13.7372624,
    zoom: 4,
    pitch: 50
};


// Erstelle Karte und ordne sie dem HTML-Canvas zu
var mappa = new Mappa('MapboxGL', key);
var myMap = mappa.tileMap(options);
myMap.overlay(canvas);

// Was soll bei Karteninteraktion passieren?
myMap.onChange(update);


// Setze Balken an richtiger Kartenposition und richtiger Perspektive zur Kamera (Code von Mapp.js und Three.js Beispiel https://mappa.js.org/docs/examples-three-js.html)
function update() {
    if (dataLoaded) {
        balken_sammlung.forEach(function (mesh, item) {
            var pos = myMap.latLngToPixel(balken[item].lat, balken[item].lng);
            var vector = new THREE.Vector3();
            vector.set((pos.x / WIDTH) * 2 - 1, -(pos.y / HEIGHT) * 2 + 1, 0.5);
            vector.unproject(camera);
            var dir = vector.sub(camera.position).normalize();
            var distance = -camera.position.z / dir.z;
            var newPos = camera.position.clone().add(dir.multiplyScalar(distance));

            mesh.position.set(newPos.x, newPos.y, newPos.z);
            scene.add(mesh);
        })
    }
}






// Animation (damit die Balken beim Zoomen etc. an ort und stelle bleiben)
var animate = function () {
    requestAnimationFrame(animate);


    /*if (dataLoaded) {
        balken_sammlung.forEach(function (mesh) {
            mesh.rotation.x += 0.00;
            mesh.rotation.y += 0.00;
        })
    }*/
    renderer.render(scene, camera);
};


// Schickt das alles WebGL spezifische an die GPU
animate();



