// Array de Cursos
const courses = [
    { code: 'CSE 110', title: 'Introduction to Programming', credits: 3, completed: true },
    { code: 'CSE 210', title: 'Advanced Programming', credits: 4, completed: false },
    { code: 'WDD 130', title: 'Web Development Basics', credits: 3, completed: true },
    { code: 'WDD 131', title: 'Advanced Web Development', credits: 3, completed: false },
    { code: 'WDD 231', title: 'JavaScript Development', credits: 3, completed: false },
    { code: 'CSE 111', title: 'Object-Oriented Programming', credits: 4, completed: true }
];

// Fills in the current year in the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Fill in the document modification date
document.getElementById('lastModified').textContent = `Last Updated: ${document.lastModified}`;

// Function to display courses
function displayCourses(filter = 'all') {
    const coursesContainer = document.getElementById('courses');
    coursesContainer.innerHTML = ''; // Clear previous courses

    courses
        .filter(course => filter === 'all' || course.code.startsWith(filter.toUpperCase()))
        .forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('course');
            if (course.completed) {
                courseDiv.classList.add('completed');
            }

            courseDiv.innerHTML = `
                <h3>${course.code}</h3>
                <p>${course.title}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
            `;

            coursesContainer.appendChild(courseDiv);
        });
}

function calculateTotalCredits() {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('totalCredits').textContent = `Total Credits: ${totalCredits}`;
}

calculateTotalCredits();


// Filter buttons
document.getElementById('all').addEventListener('click', () => displayCourses('all'));
document.getElementById('cse').addEventListener('click', () => displayCourses('CSE'));
document.getElementById('wdd').addEventListener('click', () => displayCourses('WDD'));

// Display all courses on page load
displayCourses();

// Hamburger menu toggle
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navMenu = document.getElementById('navMenu');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

