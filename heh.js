

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


setInterval(updateCountdown, 1000);


updateCountdown();




document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.close-btn'); // Selecting by class

    // Show the popup when the page loads if it hasn't been closed before
    if (!localStorage.getItem('popupClosed')) {
        popup.style.display = 'block';
    }

    closeButton.addEventListener('click', function() {
        // Hide the popup
        popup.style.display = 'none';
        // Save the state in localStorage
        localStorage.setItem('popupClosed', 'true');
        // Scroll to the math section
        const mathSection = document.getElementById('test-help');
        if (mathSection) {
            mathSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const coll = document.getElementsByClassName("collapsible");
    
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;

            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submit-problem");
    const problemInput = document.getElementById("problem-input");
    const problemsList = document.getElementById("problems-list");

    const encodedPassword = "bWF0ZW9r"; // "mateok" base64 encoded
    const adminPassword = atob(encodedPassword);

    // Function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Fetch and display problems from the server
    const loadProblems = async () => {
        const response = await fetch('http://localhost:5000/problems');
        const problems = await response.json();

        problemsList.innerHTML = problems.map((problem, index) => `
            <div class="problem" data-id="${problem._id}" data-index="${index}">
                <strong>Întrebare:</strong> ${problem.question}<br>
                <strong>Răspuns:</strong> ${problem.response || 'În așteptare...'}<br>
                <input type="password" class="password-input" placeholder="Introduceți parola pentru a răspunde..." />
                <input type="text" class="response-input" placeholder="Scrieți răspunsul dumneavoastră..." />
                <button class="submit-response">Trimite răspunsul</button>
                <input type="password" class="delete-password-input" placeholder="Introduceți parola pentru a șterge..." />
                <button class="delete-button">Șterge</button>
            </div>
        `).join('');
    };

    // Event delegation for response submission and problem deletion
    problemsList.addEventListener('click', async function (event) {
        const target = event.target;
        const problemDiv = target.closest('.problem');
        const problemId = problemDiv.getAttribute('data-id');

        // Check if it's a submit-response button click
        if (target.classList.contains('submit-response')) {
            const passwordInput = problemDiv.querySelector('.password-input').value.trim();
            const responseInput = problemDiv.querySelector('.response-input').value.trim();

            if (passwordInput === adminPassword && responseInput) {
                await fetch(`http://localhost:5000/problems/${problemId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ response: responseInput }),
                });
                loadProblems();
            } else {
                alert("Parolă incorectă sau răspuns gol.");
            }
        }

        // Check if it's a delete button click
        if (target.classList.contains('delete-button')) {
            const deletePasswordInput = problemDiv.querySelector('.delete-password-input').value.trim();

            if (deletePasswordInput === adminPassword) {
                await fetch(`http://localhost:5000/problems/${problemId}`, {
                    method: 'DELETE',
                });
                loadProblems();
            } else {
                alert("Parolă incorectă pentru ștergere.");
            }
        }
    });

    // Submit a new problem to the server
    submitButton.addEventListener("click", async function () {
        const question = problemInput.value.trim();

        if (question) {
            await fetch('http://localhost:5000/problems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question, date: getTodayDate() }),
            });
            problemInput.value = '';
            loadProblems();
        }
    });

    // Initial load of problems
    loadProblems();
});
