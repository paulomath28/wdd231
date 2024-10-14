// Atualiza as datas no footer
const currentYear = document.getElementById("currentyear");
const lastModification = document.getElementById("lastModified");
const today = new Date();

currentYear.innerHTML = today.getFullYear();
lastModification.innerHTML = "Last Update: " + document.lastModified;

// Função para abrir/fechar o menu de navegação em telas pequenas
document.addEventListener('DOMContentLoaded', () => {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', function() {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
});

// Alternar entre menu ativo/inativo
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
}

// Alternar entre visualização de lista e grade para os cards de negócios
const toggleViewButton = document.querySelector('#toggle-view'); 
const businessCards = document.querySelector('.business-cards');

toggleViewButton.addEventListener('click', () => {
    if (businessCards) {
        businessCards.classList.toggle('grid-view');
        businessCards.classList.toggle('list-view');
    }
});

// Função para buscar os membros do arquivo JSON e exibi-los
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        displayMembers(members);  // Exibe os membros
        displaySpotlightMembers(members);  // Exibe os membros em destaque
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

// Retorna o nível de associação do membro
function getMembershipLevel(level) {
    switch(level) {
        case 1: return "Member";
        case 2: return "Silver";
        case 3: return "Gold";
        default: return "Unknown Level";
    }
}

// Exibe os cartões de todos os membros na seção de negócios
function displayMembers(members) {
    const container = document.querySelector('.business-cards');
    if (!container) return; // Verifica se o contêiner existe
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

// Seleciona membros aleatórios para o destaque (Spotlight)
function getRandomSpotlightMembers(members) {
    const eligibleMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);
    const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());
    return shuffledMembers.slice(0, Math.floor(Math.random() * 2) + 2); // Seleciona 2 ou 3 membros aleatoriamente
}

// Exibe os membros em destaque na seção Spotlight
function displaySpotlightMembers(members) {
    const spotlightContainer = document.querySelector('.spotlight-members'); // Selecione o contêiner correto
    if (!spotlightContainer) return; // Verifica se o contêiner existe
    spotlightContainer.innerHTML = ''; // Limpa o conteúdo atual

    const spotlightMembers = getRandomSpotlightMembers(members);
    spotlightMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('spotlight-member'); // Classe para estilo
        memberCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo">
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership Level: ${getMembershipLevel(member.membership_level)}</p>
        `;
        spotlightContainer.appendChild(memberCard);
    });
}

// Carrega os membros ao carregar a página
window.addEventListener('load', () => {
    fetchMembers(); 
});
