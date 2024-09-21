

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

document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submit-problem");
    const problemInput = document.getElementById("problem-input");
    const problemsList = document.getElementById("problems-list");

    const encodedPassword = "bWF0ZW9r"; 
    const adminPassword = atob(encodedPassword); 

    // Load existing problems from local storage
    const loadProblems = () => {
        const problems = JSON.parse(localStorage.getItem("problems")) || [];
        
        problemsList.innerHTML = problems.map((problem, index) => `
            <div class="problem">
                <strong>Întrebare:</strong> ${problem.question}<br>
                <strong>Răspuns:</strong> ${problem.response || 'În așteptare...'}<br>
                <input type="password" class="password-input" placeholder="Introduceți parola pentru a răspunde..." />
                <input type="text" class="response-input" placeholder="Scrieți răspunsul dumneavoastră..." data-index="${index}" />
                <button class="submit-response">Trimite răspunsul</button>
                <input type="password" class="delete-password-input" placeholder="Introduceți parola pentru a șterge..." />
                <button class="delete-button" data-index="${index}">Șterge</button>
            </div>
        `).join('');

        // Add event listeners for response submission and deletion
        const responseButtons = document.querySelectorAll('.submit-response');
        responseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.previousElementSibling.dataset.index;
                const responseInput = this.previousElementSibling;
                const passwordInput = this.previousElementSibling.previousElementSibling;
                const response = responseInput.value.trim();
                const enteredPassword = passwordInput.value.trim();

                // Check if the entered password is correct
                if (enteredPassword === adminPassword && response) {
                    const problems = JSON.parse(localStorage.getItem("problems"));
                    problems[index].response = response;
                    localStorage.setItem("problems", JSON.stringify(problems));
                    loadProblems(); // Refresh the list
                } else {
                    alert("Parolă incorectă sau răspuns gol.");
                }
            });
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                const deletePasswordInput = this.previousElementSibling;
                const enteredPassword = deletePasswordInput.value.trim();

                // Check if the entered password is correct
                if (enteredPassword === adminPassword) {
                    const problems = JSON.parse(localStorage.getItem("problems"));
                    problems.splice(index, 1); // Remove the problem
                    localStorage.setItem("problems", JSON.stringify(problems));
                    loadProblems(); // Refresh the list
                } else {
                    alert("Parolă incorectă pentru ștergere.");
                }
            });
        });
    };

    // Save problem
    submitButton.addEventListener("click", function() {
        const question = problemInput.value.trim();
        const problems = JSON.parse(localStorage.getItem("problems")) || [];
        
        if (question) {
            // Check if the user has submitted less than 5 questions today
            const todayProblemsCount = problems.filter(problem => problem.date === getTodayDate()).length;

            if (todayProblemsCount < 5) {
                problems.push({ question: question, response: '', date: getTodayDate() });
                localStorage.setItem("problems", JSON.stringify(problems));
                problemInput.value = ''; // Clear input
                loadProblems(); // Refresh the list
            } else {
                alert("Puteți trimite doar 5 întrebări pe zi.");
            }
        }
    });

    // Function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Initial load of problems
    loadProblems();
});
