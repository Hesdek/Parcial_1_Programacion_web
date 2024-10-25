let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById('dates');
let month = document.getElementById('month');
let year = document.getElementById('year');

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

const writeMonth = () => {
    for(let i = startDay(); i > 0; i--) {
        dates.innerHTML += `<div class="calendar__date calendar__last-days">
            ${getTotalDays(monthNumber) - (i - 1)}
        </div>`;
    }

    for(let i = 1; i <= getTotalDays(monthNumber); i++) {
        if(i === currentDay) {
            dates.innerHTML += `<div class="calendar__date calendar__today">${i}</div>`;
        } else {
            dates.innerHTML += `<div class="calendar__date">${i}</div>`;
        }
    }
}

const getTotalDays = (month) => {
    if(month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;
    } else {
        return 28;
    }
}

const startDay = () => {
    let start = new Date(currentYear, monthNumber, 1);
    return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
}

writeMonth();
