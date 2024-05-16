// script.js
document.addEventListener("DOMContentLoaded", () => {
    const joinBtn = document.getElementById("join-btn");
    const startRoundBtn = document.getElementById("start-round-btn");
    const placeBetBtn = document.getElementById("place-bet-btn");
    const revealOutcomeBtn = document.getElementById("reveal-outcome-btn");
    const activatePowerUpBtn = document.getElementById("activate-power-up-btn");
    const getLeaderboardBtn = document.getElementById("get-leaderboard-btn");
    const roundDetailsDiv = document.getElementById("round-details");
    const leaderboardDiv = document.getElementById("leaderboard");
    const playerNameInput = document.getElementById("player-name");
    const betAmountInput = document.getElementById("bet-amount");

    joinBtn.addEventListener("click", async () => {
        const playerName = playerNameInput.value.trim();
        if (playerName !== "") {
            const response = await postData('/join', { name: playerName });
            alert(response.message);
            playerNameInput.disabled = true;
            joinBtn.disabled = true;
            startRoundBtn.disabled = false;
        } else {
            alert("Please enter your name.");
        }
    });

    startRoundBtn.addEventListener("click", async () => {
        const response = await getData('/start');
        roundDetailsDiv.innerHTML = `<p>Category: ${response.category}</p><p>Question: ${response.question}</p>`;
        betAmountInput.disabled = false;
        placeBetBtn.disabled = false;
    });

    placeBetBtn.addEventListener("click", async () => {
        const playerName = playerNameInput.value.trim();
        const bet = parseInt(betAmountInput.value);
        if (!isNaN(bet) && bet > 0) {
            const response = await postData('/place_bet', { name: playerName, bet: bet });
            alert(response.message);
            betAmountInput.disabled = true;
            placeBetBtn.disabled = true;
            revealOutcomeBtn.disabled = false;
        } else {
            alert("Please enter a valid bet amount.");
        }
    });

    revealOutcomeBtn.addEventListener("click", async () => {
        const answer = prompt("Enter your answer:");
        if (answer) {
            const response = await postData('/reveal_outcome', { answer });
            alert(`Correct Answer: ${response.correct_answer}\nLeaderboard:\n${formatLeaderboard(response.players)}`);
            activatePowerUpBtn.disabled = false;
        } else {
            alert("Please enter an answer.");
        }
    });

    activatePowerUpBtn.addEventListener("click", async () => {
        const powerUp = prompt("Enter the power-up to activate:");
        if (powerUp) {
            const response = await postData('/activate_power_up', { power_up: powerUp });
            alert(response.message);
            getLeaderboardBtn.click();
        } else {
            alert("Please enter a power-up.");
        }
    });

    getLeaderboardBtn.addEventListener("click", async () => {
        const response = await getData('/leaderboard');
        leaderboardDiv.innerHTML = `<h2>Leaderboard</h2>${formatLeaderboard(response.leaderboard)}`;
    });

    function formatLeaderboard(players) {
        return players.map(([name, score]) => `${name}: ${score}`).join('<br>');
    }

    async function getData(url) {
        const response = await fetch(url);
        return await response.json();
    }

    async function postData(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
});

