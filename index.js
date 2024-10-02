const apiKey = "59c9aeeb508fb3178a034c09";

async function getDevises() {
  const deviseEntry = document.getElementById("deviseEntry");
  const deviseOutput = document.getElementById("deviseOutput");
  try {
    let response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`
    );
    // Vérifier que la réponse est valide
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    let data = await response.json();

    // Extraire les devises
    let devises = Object.keys(data.conversion_rates);

    // Ajouter les devises dans les deux listes déroulantes (entrée et sortie)
    devises.forEach((devise) => {
      let optionEntry = document.createElement("option");
      optionEntry.value = devise;
      optionEntry.text = devise;
      deviseEntry.appendChild(optionEntry);

      let optionOutput = document.createElement("option");
      optionOutput.value = devise;
      optionOutput.text = devise;
      deviseOutput.appendChild(optionOutput);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  } finally {
    console.log("Requête terminée !");
  }
}

getDevises();

// Convertir
async function convertData() {
  const deviseEntry = document.getElementById("deviseEntry").value;
  const deviseOutput = document.getElementById("deviseOutput").value;
  const searchValue = document.getElementById("search").value;

  // Vérification des champs vides
  const result = document.getElementById("result");
  if (!deviseEntry || !deviseOutput || !searchValue) {
    result.innerHTML = "Veuillez remplir tout les champs.";
    result.style.color = "red"; // Optionnel : changer la couleur du texte d'erreur
    return; // Sortir de la fonction si des champs sont vides
  }

  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${deviseEntry}`;

  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    let data = await response.json();
    console.log(data); // Afficher la réponse complète pour débogage

    if (data.result === "success") {
      const rate = data.conversion_rates[deviseOutput];
      const convertedAmount = (rate * searchValue).toFixed(2);
      result.innerHTML = `Montant converti: ${convertedAmount}`;
      result.style.color = "#007bff"; // Réinitialiser la couleur en cas de succès
    } else {
      console.error("Erreur dans la réponse de l'API:", data.error);
      result.innerHTML = "Erreur dans la conversion. Veuillez réessayer.";
      result.style.color = "red"; // Optionnel : changer la couleur du texte d'erreur
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    result.innerHTML = "Erreur lors de la récupération des données.";
    result.style.color = "red"; // Optionnel : changer la couleur du texte d'erreur
  } finally {
    console.log("Requête terminée !");
  }
}

document.getElementById("btn").addEventListener("click", convertData);
