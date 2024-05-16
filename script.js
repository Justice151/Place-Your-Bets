document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = 'http://10.100.18.59:5000'; // Base URL for Flask server

    const playerNameInput = document.getElementById("player-name");
    const joinBtn = document.getElementById("join-btn");
    const startBtn = document.getElementById("start-btn");
    const placeBetBtn = document.getElementById("place-bet-btn");
    const revealOutcomeBtn = document.getElementById("reveal-outcome-btn");
    const activatePowerUpBtn = document.getElementById("activate-power-up-btn");
    const getLeaderboardBtn = document.getElementById("get-leaderboard-btn");
    const outputDiv = document.getElementById("output");

    joinBtn.addEventListener("click", async () => {
        const playerName = playerNameInput.value.trim();
        if (playerName !== "") {
            const response = await postData(`${BASE_URL}/join`, { name: playerName });
            outputDiv.innerText = JSON.stringify(response);
        } else {
            alert("Please enter your name.");
        }
    });

    startBtn.addEventListener("click", async () => {
        const response = await fetch(`${BASE_URL}/start`);
        const data = await response.json();
        outputDiv.innerText = JSON.stringify(data);
    });

    placeBetBtn.addEventListener("click", async () => {
        const response = await postData(`${BASE_URL}/place_bet`, { name: 'Player', bet: 10 });
        outputDiv.innerText = JSON.stringify(response);
    });

    revealOutcomeBtn.addEventListener("click", async () => {
        const response = await postData(`${BASE_URL}/reveal_outcome`, { answer: 'Paris' });
        outputDiv.innerText = JSON.stringify(response);
    });

    activatePowerUpBtn.addEventListener("click", async () => {
        const response = await postData(`${BASE_URL}/activate_power_up`, { power_up: 'Extra Life' });
        outputDiv.innerText = JSON.stringify(response);
    });

    getLeaderboardBtn.addEventListener("click", async () => {
        const response = await fetch(`${BASE_URL}/leaderboard`);
        const data = await response.json();
        outputDiv.innerText = JSON.stringify(data);
    });

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
});
