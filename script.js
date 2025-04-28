// Function to create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    
    // Create 225 confetti pieces
    for (let i = 0; i < 225; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        
        // Randomize size, position, and color
        const size = Math.random() * (18 - 5) + 5;
        confettiPiece.style.width = `${size}px`;
        confettiPiece.style.height = `${size}px`;
        
        // Set random color
        const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.backgroundColor = randomColor;
        
        // Set random x position
        confettiPiece.style.left = `${Math.random() * window.innerWidth}px`;
        
        // Set random animation delay for staggered fall
        confettiPiece.style.animationDelay = `${Math.random() * 3}s`;
        
        // Add confetti piece to container
        confettiContainer.appendChild(confettiPiece);
    }
}

// Function to read and parse CSV file and display birthdays
function loadBirthdays() {
    // Replace with the actual path to your CSV file in the repository
    const filePath = 'birthdays.csv'; 

    Papa.parse(filePath, {
        download: true,
        header: true,
        complete: function(results) {
            const birthdays = results.data;
            const currentBirthday = [];
            const pastBirthday = [];
            const upcomingBirthday = [];

            const today = new Date();

            birthdays.forEach(birthday => {
                const birthDate = new Date(birthday.birthdate);
                const birthdayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

                if (birthdayThisYear.toDateString() === today.toDateString()) {
                    currentBirthday.push(birthday);
                } else if (birthdayThisYear < today && (today - birthdayThisYear <= 5 * 24 * 60 * 60 * 1000)) {
                    pastBirthday.push(birthday);
                } else if (birthdayThisYear > today && (birthdayThisYear - today <= 5 * 24 * 60 * 60 * 1000)) {
                    upcomingBirthday.push(birthday);
                }
            });

            displayBirthdays(currentBirthday, pastBirthday, upcomingBirthday);
        }
    });
}

// Function to display birthdays in their respective sections
function displayBirthdays(currentBirthday, pastBirthday, upcomingBirthday) {
    const currentBirthdaySection = document.getElementById('current-birthdays');
    const pastBirthdaySection = document.getElementById('past-birthdays');
    const upcomingBirthdaySection = document.getElementById('upcoming-birthdays');

    if (currentBirthday.length > 0) {
        currentBirthday.forEach(b => {
            currentBirthdaySection.innerHTML += `<p>${b.first_name} (${b.class_period})</p>`;
        });
    } else {
        currentBirthdaySection.innerHTML = '<p>No Birthdays Today</p>';
    }

    pastBirthday.forEach(b => {
        pastBirthdaySection.innerHTML += `<p>${b.first_name} (${b.class_period}) - ${new Date(b.birthdate).toLocaleDateString()}</p>`;
    });

    upcomingBirthday.forEach(b => {
        upcomingBirthdaySection.innerHTML += `<p>${b.first_name} (${b.class_period}) - ${new Date(b.birthdate).toLocaleDateString()}</p>`;
    });
}

// Function to calculate milliseconds remaining until midnight and refresh page
function refreshAtMidnight() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set to midnight (00:00:00.000)

    // Calculate how many milliseconds are left until midnight
    const timeUntilMidnight = midnight - now;

    // Set a timeout to refresh the page when midnight arrives
    setTimeout(() => {
        location.reload(); // Refresh the page
    }, timeUntilMidnight);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createConfetti(); // Call to generate and animate confetti
    loadBirthdays();
    refreshAtMidnight(); // Call the function to refresh at midnight
});
