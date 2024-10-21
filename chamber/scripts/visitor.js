document.addEventListener('DOMContentLoaded', function() {
    // Element to display the message
    const visitorMessage = document.getElementById('visitor-message');

    // Get the current date
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    
    // Retrieve the last visit date from localStorage
    const lastVisitTime = localStorage.getItem('lastVisitTime');

    // Function to calculate the number of days between visits
    function calculateDaysBetweenVisits(current, last) {
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const daysBetween = Math.floor((current - last) / millisecondsPerDay);
        return daysBetween;
    }

    // If this is the user's first visit
    if (!lastVisitTime) {
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate the difference in days between the current date and the last visit
        const daysSinceLastVisit = calculateDaysBetweenVisits(currentTime, lastVisitTime);

        if (daysSinceLastVisit < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else if (daysSinceLastVisit === 1) {
            visitorMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitorMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    }

    // Store the current visit date in localStorage for future visits
    localStorage.setItem('lastVisitTime', currentTime);
});
