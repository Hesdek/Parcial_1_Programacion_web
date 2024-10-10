// ui.js

// Función para renderizar los datos en el DOM
export function renderUsers(users) {
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
export function fillForm(userId) {
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
