// api.js

// Función para obtener datos de la API (GET)
export async function getData(endpoint) {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error(`Fallo la petición: ${error}`);
    }
}

// Nuevo usuario (POST)
export async function createUser(endpoint, userData) {
    try {
        const response = await axios.post(endpoint, userData);
        console.log('Usuario creado:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error al crear usuario: ${error}`);
    }
}

// Función para modificar un usuario existente (PUT)
export async function updateUser(endpoint, userId, userData) {
    try {
        const response = await axios.put(`${endpoint}/${userId}`, userData);
        console.log('Usuario modificado:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error al modificar usuario: ${error}`);
    }
}
