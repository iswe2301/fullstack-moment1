"use strict";

// Väntar på att hela sidan ska laddas in innan den kör koden
document.addEventListener('DOMContentLoaded', function () {

    // Anropar funktion för att läsa in sparad data från localStorage
    loadData();

    // Använder tablesort-plugin för att sortera tabellen
    $('#data-table').tablesort();

    // Hämtar formuläret och lägger till en eventlyssnare för inskickning
    document.getElementById('data-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Förhindrar standardbeteendet för formuläret

        // Hämtar värdena från formuläret
        const name = document.getElementById('name').value;
        const interests = document.getElementById('interests').value;
        const season = document.getElementById('season').value;
        const foodCheckboxes = document.querySelectorAll('input[name="food"]:checked'); // Hämtar alla kryssrutor som är ikryssade
        const foods = Array.from(foodCheckboxes).map(cb => cb.value).join(', '); // Skapar en sträng av de ikryssade kryssrutorna med kommatecken emellan

        // Skapar ett objekt för input-värdena
        const inputData = {
            name: name,
            interests: interests,
            season: season,
            foods: foods
        };

        // Anropar funktion för att spara ny data i localStorage
        saveData(inputData);

        // Skapar en ny rad i tabellen och lägger till den
        const tableBody = document.querySelector('#data-table tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${name}</td><td>${interests}</td><td>${season}</td><td>${foods}</td>`;
        tableBody.appendChild(newRow);

        // Rensar formuläret
        document.getElementById('data-form').reset();
    });
});

// Funktion för att spara data i localStorage
function saveData(input) {

    // Hämtar data från localStorage
    const storedData = localStorage.getItem('tableData');

    // Kontrollerar om det finns data i localStorage
    if (storedData) {

        // Konverterar JSON-strängen till ett objekt
        const data = JSON.parse(storedData);

        // Lägger till det nya objektet i arrayen
        data.push(input);

        // Konverterar arrayen till en JSON-sträng och sparar i localStorage
        localStorage.setItem('tableData', JSON.stringify(data));
    } else {
        // Skapar annars en ny array med det nya objektet och sparar i localStorage
        localStorage.setItem('tableData', JSON.stringify([input]));
    }
}

// Funktion för att ladda in data från localStorage
function loadData() {

    // Hämtar data från localStorage
    const storedData = localStorage.getItem('tableData');

    // Kontrollerar om det finns data i localStorage
    if (storedData) {
        // Konverterar JSON-strängen till ett objekt
        const data = JSON.parse(storedData);

        // Hämtar tabellens tbody-element
        const tableBody = document.querySelector('#data-table tbody');

        // Loopar igenom objekten och skapar en rad med värdena från objekten
        data.forEach(item => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `<td>${item.name}</td><td>${item.interests}</td><td>${item.season}</td><td>${item.foods}</td>`;
            tableBody.appendChild(newRow); // Lägger till raden i tabellen
        });
    }
}
