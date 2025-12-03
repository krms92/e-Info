// lol.js

// Fonction pour récupérer les "équipes" depuis JSONPlaceholder
async function fetchTeams() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users"); // API publique
        const data = await response.json(); // Convertit la réponse en JSON

        // Sélectionner les 4 premiers "users" comme équipes fictives
        const teams = data.slice(0, 4).map(user => user.name);

        // -------------------------------
        // Remplir la section Équipes
        // -------------------------------
        const ul = document.querySelector("#teams ul");
        ul.innerHTML = ""; // Vider les li existants
        teams.forEach(team => {
            const li = document.createElement("li"); 
            li.textContent = team;
            ul.appendChild(li);
        });

        // -------------------------------
        // Remplir la card "Résultats récents"
        // -------------------------------
        generateScores(teams);

        // -------------------------------
        // Remplir le calendrier
        // -------------------------------
        generateSchedule(teams);

    } catch (error) {
        console.error("Erreur en récupérant les équipes :", error);
    }
}

// Fonction pour générer des scores fictifs
function generateScores(teams) {
    const container = document.querySelector("#news .card.single-card p");
    const matches = [
        { team1: teams[0], team2: teams[1], score: `${Math.floor(Math.random()*5)} - ${Math.floor(Math.random()*5)}` },
        { team1: teams[2], team2: teams[3], score: `${Math.floor(Math.random()*5)} - ${Math.floor(Math.random()*5)}` }
    ];

    let resultText = "";
    matches.forEach(match => {
        resultText += `${match.team1} vs ${match.team2} : ${match.score}\n`; // Texte avec score
    });

    container.textContent = resultText; // Affichage dans la card
}

// Fonction pour générer un calendrier fictif
function generateSchedule(teams) {
    const table = document.querySelector("#schedule table");
    // Vider les lignes existantes sauf l'en-tête
    table.querySelectorAll("tr:not(:first-child)").forEach(row => row.remove());

    // Créer 3 matchs fictifs avec dates et heures
    const schedule = [
        { date: "01/12/2025", team1: teams[0], team2: teams[1], time: "18:00" },
        { date: "03/12/2025", team1: teams[2], team2: teams[3], time: "20:00" },
        { date: "05/12/2025", team1: teams[1], team2: teams[2], time: "19:00" }
    ];

    schedule.forEach(match => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${match.date}</td>
            <td>${match.team1} vs ${match.team2}</td>
            <td>${match.time}</td>
        `;
        table.appendChild(tr); // Ajouter la ligne au tableau
    });
}

// Appel principal
fetchTeams();
