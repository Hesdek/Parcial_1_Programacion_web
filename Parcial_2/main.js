// main.js

import { getData, createUser, updateUser } from './resources/modules/api.js';
import { renderUsers, fillForm } from './resources/modules/ui.js';

// Guardar un nuevo usuario o modificar uno existente
async function saveUser() {
    const endpoint = 'http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/users';
    const userId = document.getElementById('user-id').value;
    const userData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        jobTitle: document.getElementById('job-title').value,
    };

    if (userId) {
        // Modificar el usuario
        await updateUser(endpoint, userId, userData);
    } else {
        // Crear un nuevo usuario
        await createUser(endpoint, userData);
    }

    loadUsers(); // Recargar la lista de usuarios después de guardar
    document.getElementById('element-form').reset(); // Resetear el formulario
}

// Llamada a la API y renderizado en el DOM
async function loadUsers() {
    const endpoint = 'http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/users';
    const users = await getData(endpoint);
    localStorage.setItem('users', JSON.stringify(users)); // Almacenar los usuarios localmente
    renderUsers(users);
}

// Ejecutar la función para cargar los usuarios al cargar la página
window.onload = loadUsers;

// Manejar el evento de envío del formulario
document.getElementById('element-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveUser();
});
