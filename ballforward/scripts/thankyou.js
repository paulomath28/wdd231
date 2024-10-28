document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);

    
    document.getElementById('firstName').textContent = urlParams.get('firstName');
    document.getElementById('lastName').textContent = urlParams.get('lastName');
    document.getElementById('email').textContent = urlParams.get('email');
    document.getElementById('phoneNumber').textContent = urlParams.get('phone');
    document.getElementById('submissionDate').textContent = urlParams.get('timestamp');

    
    document.getElementById('currentyear').textContent = new Date().getFullYear();
});