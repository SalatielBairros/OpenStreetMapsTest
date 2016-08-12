var mapInstance;
var mapStarted = false;

var GPS_PRINT_YELLOW;

function LoadIcons() {
    GPS_PRINT_YELLOW = L.icon({
        iconUrl: 'img/gps_print_yelow.png',
        iconRetinaUrl: 'img/gps_print_yelow.png',
        iconSize: [27, 46],
        iconAnchor: [15, 46],
        popupAnchor: [-3, -76],
    });
}

function StartMap(centerLatitude, centerLongitude, zoom) {
    zoom = zoom || 15;

    if (!mapStarted) {
        mapInstance = L.map('map', {
            center: [centerLatitude, centerLongitude],
            zoom: zoom
        });

        L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
            unloadInvisibleTiles: true
        }).addTo(mapInstance);

        mapStarted = true;
        LoadIcons();
    }
    else {
        mapInstance.setView([centerLatitude, centerLongitude]);
    }
}

function CreateMarker(latitude, longitude, tooltip, content, customIcon) {
    customIcon = customIcon || "";
    
    var marker = L.marker([latitude, longitude],
        {
            // icon: customIcon,
            draggable: true,
            title: tooltip
        }).addTo(mapInstance)
        .bindPopup(content);

    if(customIcon !== ""){
        marker.setIcon(customIcon);
    }
}

$(function () {

    StartMap(-30.060240, -51.171221);
    CreateMarker(-30.061698, -51.170781, "Primeiro marcador", "<h1>Primeiro ponto</h1><p>Teste de texto<p><a href='http://google.com.br'>GOOGLE LINK</a>");
    CreateMarker(-30.061865, -51.167466, "Segundo marcador", "<h1>Segundo ponto</h1><p>Teste de texto<p><a href='http://google.com.br'>GOOGLE LINK</a>");
    CreateMarker(-30.060240, -51.171221, "Terceiro marcador", "<h1>Terceiro ponto</h1><p>Teste de texto<p><a href='http://google.com.br'>GOOGLE LINK</a>", GPS_PRINT_YELLOW);

    var a = 10.00;
    // circle
    var circle = L.circle([-30.058890, -51.192479], 200, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mapInstance);

    // polygon
    var polygon = L.polygon([
        [-30.007002, -51.147222],
        [-30.010440, -51.146149],
        [-30.008108, -51.140602]
    ]).addTo(mapInstance);

    var rectangle = L.rectangle([
        [-30.038695, -51.203880],
        [-30.037255, -51.200382]
    ], { color: "#ff7800" }).addTo(mapInstance);

    // popups    
    circle.bindPopup('Círcle popup');
    polygon.bindPopup('Polygon !');

    // popups as layers
    var popup = L.popup()
        .setLatLng([-30.030907, -51.151992])
        // .setContent('Popul without object.')
        // .openOn(mapInstance);

    //dealing with events
    var clickPopup = L.popup();

    function showPopup(e) {
        clickPopup
            .setLatLng(e.latlng)
            .setContent('you clicked the map at ' + e.latlng)
            .openOn(mapInstance);
    }

    mapInstance.on('click', showPopup);

    //polylines
    var route = L.polyline([
        [-30.060240, -51.171221],
        [-30.061698, -51.170781],
        [-30.061865, -51.167466]],
        {
            color: 'green'
        }).addTo(mapInstance);
});

