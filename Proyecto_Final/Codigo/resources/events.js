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

function toggleInfo() {
    const extraInfo = document.getElementById("extraInfo");
    if (extraInfo.style.display === "none") {
        extraInfo.style.display = "block";
        initMap(); // Inicializa el mapa al hacer clic en "CONOCE MÁS"
    } else {
        extraInfo.style.display = "none";
    }
}