
const currentYear = document.getElementById("currentyear");
const lastModification = document.getElementById("lastModified");
const today = new Date();

currentYear.innerHTML = today.getFullYear();
lastModification.innerHTML = "Last Update: " + document.lastModified;


document.addEventListener('DOMContentLoaded', () => {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', function() {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
});


function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
}


const toggleViewButton = document.querySelector('#toggle-view'); 
const businessCards = document.querySelector('.business-cards');

toggleViewButton.addEventListener('click', () => {
    if (businessCards) {
        businessCards.classList.toggle('grid-view');
        businessCards.classList.toggle('list-view');
    }
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
        case 1: return "Member";
        case 2: return "Silver";
        case 3: return "Gold";
        default: return "Unknown Level";
    }
}


function displayMembers(members) {
    const container = document.querySelector('.business-cards');
    if (!container) return; 
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


function getRandomSpotlightMembers(members) {
    const eligibleMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);
    const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());
    return shuffledMembers.slice(0, Math.floor(Math.random() * 2) + 2); 
}


function displaySpotlightMembers(members) {
    const spotlightContainer = document.querySelector('.spotlight-members'); 
    if (!spotlightContainer) return; 
    spotlightContainer.innerHTML = ''; 

    const spotlightMembers = getRandomSpotlightMembers(members);
    spotlightMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('spotlight-member'); 
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


window.addEventListener('load', () => {
    fetchMembers(); 
});
