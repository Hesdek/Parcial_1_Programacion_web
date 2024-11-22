const locations = {
    medellin: { 
        lat: 6.2442, 
        lng: -75.5812, 
        title: "Medellín, Colombia",
        zoom: 10
    },
    feria: { 
        lat: 6.2858383, 
        lng: -75.5675617, 
        title: "Av. Del Río",
        zoom: 15
    },
    plaza: { 
        lat: 6.2408444, 
        lng: -75.5774182, 
        title: "Plaza mayor",
        zoom: 14
    }
};


// Función para inicializar un mapa específico
function initMap(mapId, locationKey) {
    const location = locations[locationKey];
    const map = new google.maps.Map(document.getElementById(mapId), {
        zoom: location.zoom,  // Usamos el zoom específico de cada ciudad
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

// Función para cargar el script de Google Maps dinámicamente
async function loadGoogleMapsAPI() {
    try {
      // Obtener la API Key desde el servidor
      const response = await fetch('/api-key');
      const data = await response.json();
  
      if (data.apiKey) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script); 
      } else {
        console.error('API Key not found in server response');
      }
    } catch (error) {
      console.error('Error loading Google Maps API:', error);
    }
  }

  
  // Llamar a la función para cargar el script
loadGoogleMapsAPI();