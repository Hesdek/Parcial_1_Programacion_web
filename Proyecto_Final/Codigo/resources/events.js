const locations = {
    medellin: { lat: 6.2442, lng: -75.5812, title: "Medellín, Colombia" },
    bogota: { lat: 4.7110, lng: -74.0721, title: "Bogotá, Colombia" },
    barranquilla: { lat: 10.9685, lng: -74.7813, title: "Barranquilla, Colombia" }
};

// Función para inicializar un mapa específico
function initMap(mapId, locationKey) {
    const location = locations[locationKey];
    const map = new google.maps.Map(document.getElementById(mapId), {
        zoom: 12,
        center: location,
    });

    new google.maps.Marker({
        position: location,
        map: map,
        title: location.title,
    });
}

// Función para mostrar y cargar un mapa
function toggleInfo(mapId, locationKey) {
    const mapContainer = document.getElementById(mapId);
    if (mapContainer.style.display === "none") {
        mapContainer.style.display = "block";
        initMap(mapId, locationKey);
    } else {
        mapContainer.style.display = "none";
    }
}
