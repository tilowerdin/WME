// Load the CSV with d3-request
var dataLoaded = false;
var meteorites;
var meshes = [];
var material_red = new THREE.MeshLambertMaterial({color: 0xff0000, side: 2, shading: THREE.FlatShading});
var material_orange = new THREE.MeshLambertMaterial({color: 0xfcae07, side: 2, shading: THREE.FlatShading});
var material_green = new THREE.MeshLambertMaterial({color: 0x28fc07, side: 2, shading: THREE.FlatShading});

d3.csv("world_data.csv", function (d) {
    return {
        lat: d.gps_lat,
        lng: d.gps_long,
        brith_rate: d.birth_rate_per_1000,
        cell_phones: d.cell_phones_per_100 * 10
    };
}, function (data) {
    meteorites = data;

    for (let i = 0; i < data.length; i++) {
        var geometry = new THREE.BoxGeometry(3.5, data[i].brith_rate , 3.5);
        meshes.push(new THREE.Mesh(geometry, material_red));
    }


    dataLoaded = true;
});


// Scene Configurations
const WIDTH = window.innerWidth * 0.6;
const HEIGHT = window.innerHeight * 0.8;
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Scene, camera, canvas, renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var canvas = document.getElementById("map_canvas");
var renderer = new THREE.WebGLRenderer({alpha: true, canvas: canvas});

camera.position.z = 300;
scene.add(camera);
renderer.setSize(WIDTH, HEIGHT);

// Light
var light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(0, 0, 100);
scene.add(light);

// API Key for Mapboxgl. Get one here:
// https://www.mapbox.com/studio/account/tokens/
var key = 'pk.eyJ1IjoicmljYXJkb2xhbmduZXIiLCJhIjoiY2pxano2enh2MG1qazN4bm5lajIzeDl3eiJ9.wK0MtuxLgJxDcGUksKMeKg';

var options = {
    lat: 51.050407,
    lng: 13.7372624,
    zoom: 4,
    pitch: 50
    //style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
}

var mappa = new Mappa('MapboxGL', key);
var myMap = mappa.tileMap(options);
myMap.overlay(canvas);
myMap.onChange(update);

function update() {
    if (dataLoaded) {
        meshes.forEach(function (mesh, item) {
            var pos = myMap.latLngToPixel(meteorites[item].lat, meteorites[item].lng);
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

// Animate loop
var animate = function () {
    requestAnimationFrame(animate);
    if (dataLoaded) {
        meshes.forEach(function (mesh) {
            mesh.rotation.x += 0.00;
            mesh.rotation.y += 0.00;
        })
    }
    renderer.render(scene, camera);
};

animate();
