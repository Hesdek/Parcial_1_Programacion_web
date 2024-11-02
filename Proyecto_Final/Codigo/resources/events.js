function initMap() {
    const medellin = { lat: 6.2442, lng: -75.5812 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: medellin,
    });

    // Agregar un marcador en Medellín
    const marker = new google.maps.Marker({
        position: medellin,
        map: map,
        title: "Medellín, Colombia",
    });
}

