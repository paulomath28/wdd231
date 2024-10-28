
    // Modal functionality
    const modalLinks = document.querySelectorAll('.card a'); // Select all modal trigger links
    const modals = document.querySelectorAll('.modal'); // Select all modals
    const closeModalButtons = document.querySelectorAll('.close-modal'); // Select all close buttons

    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const targetModal = document.querySelector(link.getAttribute('href'));
            if (targetModal) {
                targetModal.style.display = 'block'; // Display the modal
            }
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none'; // Hide the modal
            }
        });
    });

    // Close modal if the user clicks outside of it
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none'; // Hide the modal
            }
        });
    });


window.addEventListener('DOMContentLoaded', (event) => {
    const timestampField = document.getElementById('timestamp');
    const now = new Date();
    timestampField.value = now.toISOString(); 
});


// Set the timestamp value
document.getElementById('timestamp').value = new Date().toISOString();

// Modal functionality
document.querySelectorAll('.modal').forEach(modal => {
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
});

document.querySelectorAll('.card a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.querySelector(link.getAttribute('href'));
        modal.style.display = 'block';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Set the timestamp to the current date and time
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }