document.addEventListener('DOMContentLoaded', () => {
    // Obtenha os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);

    // Preencha os campos com os dados enviados
    document.getElementById('firstName').textContent = urlParams.get('firstName');
    document.getElementById('lastName').textContent = urlParams.get('lastName');
    document.getElementById('email').textContent = urlParams.get('email');
    document.getElementById('phoneNumber').textContent = urlParams.get('phone');
    document.getElementById('organizationName').textContent = urlParams.get('organization');
    document.getElementById('submissionDate').textContent = urlParams.get('timestamp');

    // Atualize o ano atual no rodapé
    document.getElementById('currentyear').textContent = new Date().getFullYear();
});
