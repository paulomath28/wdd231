function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
}

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function getMembershipLevel(level) {
    switch(level) {
        case 1: return "Membro";
        case 2: return "Prata";
        case 3: return "Ouro";
        default: return "Nível Desconhecido";
    }
}


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
            <p>Member Level: ${member.membership_level}</p>
            <img src="images/${member.image}" alt="${member.name}">
        `;
        container.appendChild(memberCard);
    });
}

const toggleViewButton = document.querySelector('#toggle-view'); 
const businessCards = document.querySelector('.business-cards');

if (toggleViewButton) {
    toggleViewButton.addEventListener('click', () => {
        businessCards.classList.toggle('list-view');
    });
} else {
    console.warn("Button with ID 'toggle-view' not found.");
}

function displayLastModification() {
    const lastModified = document.lastModified; 
    const lastModElement = document.getElementById('last-modification');
    if (lastModElement) {
        lastModElement.textContent = `Last Modification: ${lastModified}`;
        console.log("Modification date updated to:", lastModified);
    } else {
        console.error("Element with id 'last-modification' not found.");
    }
}


window.addEventListener('load', displayLastModification);

fetchMembers();
