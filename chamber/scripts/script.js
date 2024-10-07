
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});


function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
}

const toggleViewButton = document.querySelector('#toggle-view'); 
const businessCards = document.querySelector('.business-cards');

toggleViewButton.addEventListener('click', () => {
    businessCards.classList.toggle('grid-view');
    businessCards.classList.toggle('list-view');
});


async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        displayMembers(members); 
        displaySpotlightMembers(members); 
    } catch (error) {
        console.error("Error loading members:", error);
    }
}


function getMembershipLevel(level) {
    switch(level) {
        case 1: return "Membro";
        case 2: return "Prata";
        case 3: return "Ouro";
        default: return "Unknown Level";
    }
}

// Função para buscar dados climáticos
async function fetchWeatherData() {
    const apiKey = 'dc0af233151c6eac43d3f32c0f160699';
    const city = 'Rio de Janeiro';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const weatherData = await response.json();
        
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        
        document.querySelector('.weather').innerHTML = `
            <h2>Current Weather</h2>
            <p>${temp}°C, ${description}</p>
        `;
        
        // Busca previsão de 3 dias
        fetchWeatherForecast();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Função para exibir a previsão do tempo de 3 dias
async function fetchWeatherForecast() {
    const apiKey = 'dc0af233151c6eac43d3f32c0f160699';
    const city = 'Rio de Janeiro';
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(forecastApiUrl);
        const forecastData = await response.json();

        const forecast = forecastData.list.slice(0, 3).map(item => {
            const date = new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
            const temp = item.main.temp;
            return `<p>${date}: ${temp}°C</p>`;
        }).join('');

        document.querySelector('.forecast').innerHTML = `
            <h2>Weather Forecast</h2>
            ${forecast}
        `;
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
    }
}

// Função para exibir todos os membros
function displayMembers(members) {
    const container = document.querySelector('.business-cards');
    container.innerHTML = ''; 
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('business-card');
        memberCard.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Member Level: ${getMembershipLevel(member.membership_level)}</p>
            <img src="images/${member.image}" alt="${member.name}">
        `;
        container.appendChild(memberCard);
    });
}

// Função para obter membros aleatoriamente para o Spotlight
function getRandomSpotlightMembers(members) {
    const eligibleMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);
    const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());
    return shuffledMembers.slice(0, Math.floor(Math.random() * 2) + 2); // Seleciona 2 ou 3 membros aleatoriamente
}

// Função para exibir os membros no Spotlight
function displaySpotlightMembers(members) {
    const spotlightContainer = document.querySelector('.spotlight-members');
    spotlightContainer.innerHTML = '';

    const spotlightMembers = getRandomSpotlightMembers(members);
    spotlightMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('spotlight-member');
        memberCard.innerHTML = `
            <h3>${member.name}</h3>
            <p><img src="images/${member.image}" alt="${member.name} logo" style="width:100px;height:auto;"></p>
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership Level: ${getMembershipLevel(member.membership_level)}</p>
        `;
        spotlightContainer.appendChild(memberCard);
    });
}

// Exibe a data de modificação da página
function displayLastModification() {
    const lastModified = document.lastModified;
    const lastModElement = document.getElementById('last-modification');
    if (lastModElement) {
        lastModElement.textContent = `Last Modification: ${lastModified}`;
    } else {
        console.error("Element with id 'last-modification' not found.");
    }
}

// Chamar funções ao carregar a página
window.addEventListener('load', () => {
    fetchWeatherData();
    fetchMembers(); // Carrega membros e spotlight
    displayLastModification();
});


// Array de eventos
const events = [
    {
        title: "Networking Breakfast",
        date: "2024-10-15",
        time: "09:00 AM",
        location: "Chamber Office",
        description: "Join us for a networking breakfast and meet fellow chamber members."
    }
    
];

// Função para exibir eventos
function displayEvents() {
    const eventList = document.querySelector('.event-list');
    eventList.innerHTML = ''; // Limpa a lista antes de adicionar novos eventos

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
        `;
        eventList.appendChild(eventCard);
    });
}

// Chama a função para exibir os eventos quando a página carrega
window.addEventListener('load', displayEvents);
