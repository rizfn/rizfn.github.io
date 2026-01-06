var map = L.map('map').setView([35.602, 139.68], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var jikkokuIcon = L.icon({
    iconUrl: '../img/jikkoku/jikkoku.png',
    shadowUrl: '../img/jikkoku/jikkoku_shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [38, 95], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [22, 94],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([35.602, 139.68], {icon: jikkokuIcon}).addTo(map).bindPopup("Jikkoku Marker.");
