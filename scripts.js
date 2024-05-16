function joinGame() {
    const playerName = document.getElementById('playerName').value;

    fetch('http://10.100.18.59:5000/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: playerName })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('joinMessage').innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function startRound() {
    fetch('http://10.100.18.59:5000/start', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('roundMessage').innerText = `Category: ${data.category}, Question: ${data.question}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function placeBet() {
    const betAmount = document.getElementById('betAmount').value;

    fetch('http://10.100.18.59:5000/place_bet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: playerName, bet: betAmount })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('betMessage').innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function revealOutcome() {
    const answer = document.getElementById('answer').value;

    fetch('http://10.100.18.59:5000/reveal_outcome', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer: answer })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('outcomeMessage').innerText = `Correct Answer: ${data.correct_answer}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getLeaderboard() {
    fetch('http://10.100.18.59:5000/leaderboard', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const leaderboardList = document.getElementById('leaderboardList');
        leaderboardList.innerHTML = '';

        data.leaderboard.forEach(player => {
            const li = document.createElement('li');
            li.textContent = `${player[0]}: ${player[1].score}`;
            leaderboardList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Call getLeaderboard on page load
getLeaderboard();
