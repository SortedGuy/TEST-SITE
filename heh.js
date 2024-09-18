

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
    const closeButton = document.querySelector('.close-btn');

   
    popup.style.display = 'block';


    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });

  
    if (!localStorage.getItem('popupClosed')) {
        popup.style.display = 'block';
    }

    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
        localStorage.setItem('popupClosed', 'true');
    });
});

