// scores.js

// Fonction pour récupérer des "équipes" fictives depuis JSONPlaceholder
async function fetchScores() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users"); // API publique
        const data = await response.json(); // Convertit la réponse en JSON

        // Sélectionner les 4 premiers "users" comme équipes
        const teams = data.slice(0, 4).map(user => user.name);

        // Sélectionner la section où afficher les scores
        const container = document.querySelector(".liste-scores");
        container.innerHTML = ""; // On vide les scores existants

        // Générer 3 matchs fictifs
        const schedule = [
            { date: "01/12/2025", team1: teams[0], team2: teams[1] },
            { date: "03/12/2025", team1: teams[2], team2: teams[3] },
            { date: "05/12/2025", team1: teams[1], team2: teams[2] }
        ];

        // Créer le HTML pour chaque match
        schedule.forEach(match => {
            const div = document.createElement("div"); // Crée un div.score
            div.classList.add("score");

            // Générer un score aléatoire
            const score1 = Math.floor(Math.random() * 5);
            const score2 = Math.floor(Math.random() * 5);

            // Remplir le div avec le match, score et date
            div.innerHTML = `
                <h3 class="match">${match.team1} vs ${match.team2}</h3>
                <p class="resultat">Score : <strong>${score1} - ${score2}</strong></p>
                <p class="date">${match.date}</p>
            `;

            // Ajouter le div à la section
            container.appendChild(div);
        });

    } catch (error) {
        console.error("Erreur en récupérant les scores :", error);
        document.querySelector(".liste-scores").innerHTML = "<p>Impossible de charger les scores.</p>";
    }
}

// Appel de la fonction dès le chargement
fetchScores();
