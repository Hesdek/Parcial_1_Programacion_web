// Función para obtener datos de la API (GET)
async function getData(endpoint) {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error(`Fallo la petición: ${error}`);
    }
}

// Función para crear un nuevo usuario (POST)
async function createUser(endpoint, userData) {
    try {
        const response = await axios.post(endpoint, userData);
        console.log('Usuario creado:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error al crear usuario: ${error}`);
    }
}

// Función para modificar un usuario existente (PUT)
async function updateUser(endpoint, userId, userData) {
    try {
        const response = await axios.put(`${endpoint}/${userId}`, userData);
        console.log('Usuario modificado:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error al modificar usuario: ${error}`);
    }
}

// Función para renderizar los datos en el DOM
function renderUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Limpiar el contenido anterior

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.innerHTML = `
            <img src="${user.photo}" alt="${user.firstName} ${user.lastName}">
            <h3>${user.firstName} ${user.lastName}</h3>
            <p>${user.jobTitle}</p>
            <p>${user.phone}</p>
            <p>${user.email}</p>
            <button onclick="fillForm(${user.id})">Editar</button>
        `;
        userList.appendChild(userDiv);
    });
}

// Llenar el formulario para editar un usuario
function fillForm(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === userId);
    
    if (user) {
        document.getElementById('user-id').value = user.id;
        document.getElementById('first-name').value = user.firstName;
        document.getElementById('last-name').value = user.lastName;
        document.getElementById('phone').value = user.phone;
        document.getElementById('email').value = user.email;
        document.getElementById('job-title').value = user.jobTitle;
    }
}

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
    document.getElementById('user-form').reset(); // Resetear el formulario
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
