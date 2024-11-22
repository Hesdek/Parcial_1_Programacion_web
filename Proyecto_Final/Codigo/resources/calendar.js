let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById('dates');
let month = document.getElementById('month');
let year = document.getElementById('year');

let prevMonthDOM = document.getElementById('prev-month');
let nextMonthDOM = document.getElementById('next-month');

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener('click', () => lastMonth());
nextMonthDOM.addEventListener('click', () => nextMonth());

const writeMonth = (month) => {
    for(let i = startDay(); i > 0; i--) {
        dates.innerHTML += `<div class="calendar__date calendar__item calendar__last-days">
            ${getTotalDays(monthNumber - 1) - (i - 1)}
        </div>`;
    }

    for(let i = 1; i <= getTotalDays(month); i++) {
        if(i === currentDay) {
            dates.innerHTML += `<div class="calendar__date calendar__item calendar__today">${i}</div>`;
        } else {
            dates.innerHTML += `<div class="calendar__date calendar__item">${i}</div>`;
        }
    }
}

const getTotalDays = (month) => {
    if(month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return 31;
    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;
    } else {
        return 28;
    }
}

const startDay = () => {
    let start = new Date(currentYear, monthNumber, 1);
    return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
}

const lastMonth = () => {
    if(monthNumber !== 0) {
        monthNumber--;
    } else {
        monthNumber = 11;
        currentYear--;
    }

    setNewDate();
}

const nextMonth = () => {
    if(monthNumber !== 11) {
        monthNumber++;
    } else {
        monthNumber = 0;
        currentYear++;
    }

    setNewDate();
}

const setNewDate = () => {
    currentDate.setFullYear(currentYear, monthNumber, currentDay);
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = '';
    writeMonth(monthNumber);
}

writeMonth(monthNumber);

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        year: params.get('year'),
        month: params.get('month'), // Mes basado en índice 0 (enero = 0)
        highlightStart: params.get('highlightStart'),
        highlightEnd: params.get('highlightEnd')
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const monthElement = document.getElementById('month');
    const yearElement = document.getElementById('year');
    const datesElement = document.getElementById('dates');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const params = getQueryParams();

    let currentDate = new Date();

    const specialDates = [
        { start: new Date(2024, 6, 23), end: new Date(2024, 6, 25), class: 'highlight-red' }, // 23-25 julio
        { start: new Date(2024, 7, 3), end: new Date(2024, 7, 12), class: 'highlight-blue' }, // 3-12 agosto
        { start: new Date(2024, 8, 15), end: new Date(2024, 8, 22), class: 'highlight-green' } // 15-22 septiembre
    ];

    function renderCalendar() {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        monthElement.textContent = currentDate.toLocaleString('es-ES', { month: 'long' });
        yearElement.textContent = currentYear;

        datesElement.innerHTML = '';

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const date = document.createElement('div');
            date.textContent = lastDateOfPrevMonth - i;
            date.classList.add('calendar__date', 'calendar__last-days');
            datesElement.appendChild(date);
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            const date = document.createElement('div');
            const currentDate = new Date(currentYear, currentMonth, i);

            date.textContent = i;
            date.classList.add('calendar__date');

            if (isToday(currentDate)) {
                date.classList.add('calendar__today');
            }

            const specialClass = getSpecialDateClass(currentDate);
            if (specialClass) {
                date.classList.add(specialClass);
            }

            datesElement.appendChild(date);
        }
    }

    function isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    function getSpecialDateClass(date) {
        for (const range of specialDates) {
            if (date >= range.start && date <= range.end) {
                return range.class;
            }
        }
        return null;
    }

    if (params.year && params.month) {
        currentDate = new Date(params.year, params.month); 
    }

    if (params.highlightStart && params.highlightEnd) {
        const highlightStartDate = new Date(params.highlightStart);
        const highlightEndDate = new Date(params.highlightEnd);

        specialDates.push({
            start: highlightStartDate,
            end: highlightEndDate,
            class: 'highlight-yellow'
        });
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});


