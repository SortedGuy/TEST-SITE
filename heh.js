

document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('current-date');
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('ro-RO', options);
});


function updateCountdown() {
    const now = new Date();
    let targetTime = new Date();
    
    // Set the target time to 3 PM today
    targetTime.setHours(15, 0, 0, 0);
    
    // If the target time is in the past, set it to 4 PM tomorrow
    if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeDifference = targetTime - now;
    const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

    document.getElementById('countdown-timer').innerHTML =
        `Timp ramas pana la urmatoarea actualizare: ${hours}h ${minutes}m ${seconds}s`;
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial call to set the countdown immediately
updateCountdown();


document.addEventListener('DOMContentLoaded', function() {
    const exercises = [
        {
            title: 'Exercițiu 5 Testul 16',
            description: ''
        },
        {
            title: 'Exercițiu 2',
            description: ''
        },
        {
            title: 'Exercițiu 3',
            description: ''
        },
        {
            title: 'Exercițiu 4',
            description: ''
        },
        {
            title: 'Exercițiu 5',
            description: ''
        }
    ];

    let currentIndex = 0;

    function updateExercise() {
        const exerciseTitle = document.getElementById('exercise-title');
        const exerciseDescription = document.getElementById('exercise-description');
        
        exerciseTitle.textContent = exercises[currentIndex].title;
        exerciseDescription.innerHTML = exercises[currentIndex].description;
    }

    document.querySelector('.prev-exercise').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateExercise();
        }
    });

    document.querySelector('.next-exercise').addEventListener('click', function() {
        if (currentIndex < exercises.length - 1) {
            currentIndex++;
            updateExercise();
        }
    });

    updateExercise(); // Initial call to display the first exercise
});


document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.close-btn');

    // Show the popup when the page loads
    popup.style.display = 'block';

    // Close the popup when the close button is clicked
    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Store close state in localStorage
    if (!localStorage.getItem('popupClosed')) {
        popup.style.display = 'block';
    }

    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
        localStorage.setItem('popupClosed', 'true');
    });
});

