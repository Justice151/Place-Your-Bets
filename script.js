document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = 'http://127.0.0.1:5000'; // Base URL for Flask server

    const joinBtn = document.getElementById("join-btn");
    const placeBetBtn = document.getElementById("place-bet-btn");
    const revealOutcomeBtn = document.getElementById("reveal-outcome-btn");
    const activatePowerUpBtn = document.getElementById("activate-power-up-btn");
    const getLeaderboardBtn = document.getElementById("get-leaderboard-btn");
    const roundDetailsDiv = document.getElementById("round-details");
    const leaderboardDiv = document.getElementById("leaderboard");
    const playerNameInput = document.getElementById("player-name");
    const betAmountInput = document.getElementById("bet-amount");
    const answerInput = document.getElementById("answer");
    const powerUpInput = document.getElementById("power-up");

    joinBtn.addEventListener("click", async () => {
        const playerName = playerNameInput.value.trim();
        if (playerName !== "") {
            const response = await postData(`${BASE_URL}/join`, { name: playerName });
            alert(response.message);
            playerNameInput.disabled = true;
            joinBtn.disabled = true;
            placeBetBtn.disabled = false;
        } else {
            alert("Please enter your name.");
        }
    });

    placeBetBtn.addEventListener("click", async () => {
        const betAmount = betAmountInput.value.trim();
        if (betAmount !== "") {
            const response = await postData(`${BASE_URL}/place_bet`, { name: playerNameInput.value.trim(), bet: parseInt(betAmount) });
            alert(response.message);
            betAmountInput.disabled = true;
            placeBetBtn.disabled = true;
            revealOutcomeBtn.disabled = false;
        } else {
            alert("Please enter bet amount.");
        }
    });

    revealOutcomeBtn.addEventListener("click", async () => {
        const answer = answerInput.value.trim();
        if (answer !== "") {
            const response = await postData(`${BASE_URL}/reveal_outcome`, { answer });
            alert(`Correct Answer: ${response.correct_answer}`);
            leaderboardDiv.innerHTML = ""; // Clear leaderboard
            response.players.forEach(player => {
                leaderboardDiv.innerHTML += `<div>${player[0]}: ${player[1].score}</div>`;
            });
            answerInput.disabled = true;
            revealOutcomeBtn.disabled = true;
            activatePowerUpBtn.disabled = false;
        } else {
            alert("Please enter answer.");
        }
    });

    activatePowerUpBtn.addEventListener("click", async () => {
        const powerUp = powerUpInput.value.trim();
        if (powerUp !== "") {
            const response = await postData(`${BASE_URL}/activate_power_up`, { power_up: powerUp });
            alert(response.message);
            activatePowerUpBtn.disabled = true;
            getLeaderboardBtn.disabled = false;
        } else {
            alert("Please enter power-up name.");
        }
    });

    getLeaderboardBtn.addEventListener("click", async () => {
        const response = await fetch(`${BASE_URL}/leaderboard`);
        const data = await response.json();
        leaderboardDiv.innerHTML = ""; // Clear leaderboard
        data.leaderboard.forEach(player => {
            leaderboardDiv.innerHTML += `<div>${player[0]}: ${player[1].score}</div>`;
        });
        getLeaderboardBtn.disabled = true;
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
