const events = [
    {
        title: "Feria de las Flores",
        description: "La Feria de las Flores es el evento más representativo de Medellín...",
        image: "feria_flores.jpg"
    },
    {
        title: "Alumbrados de Navidad",
        description: "Los alumbrados navideños en Medellín son conocidos mundialmente...",
        image: "navidad_medellin.jpg"
    },
    {
        title: "Festival Internacional de Poesía",
        description: "Cada julio, el Festival Internacional de Poesía de Medellín reúne...",
        image: "festival_poesia.jpg"
    }
];

const eventContainer = document.querySelector('.event-container');

events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');

    eventCard.innerHTML = `
        <img src="${event.image}" alt="${event.title}" class="event-image">
        <h2>${event.title}</h2>
        <p>${event.description}</p>
    `;

    eventContainer.appendChild(eventCard);
});
