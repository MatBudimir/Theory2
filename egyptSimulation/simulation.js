"use strict";
let result = 0;
let resources = Array(13).fill(0); // Food, Clay, Labor, Papyrus, Stone, Wood, Bronze, Gold, Herbs, Jewelry, Tools, Weapons, Horse, Chariot, Treasure, Horde, Population
let turnCount = 0;
Simulate();
function RandomAction() {
    let result = Math.floor(Math.random() * 100 + 1);
    if (result <= 10) { // Food
        resources[0] += 1;
    }
    else if (result <= 20) { // Clay
        resources[1] += 1;
    }
    else if (result <= 30) { // Labor
        resources[2] += 1;
    }
    else if (result <= 40) { // Papyrus
        resources[3] += 1;
    }
    else if (result <= 47) { // Stone
        resources[4] += 1;
    }
    else if (result <= 54) { // Wood
        resources[5] += 1;
    }
    else if (result <= 61) { // Bronze
        resources[6] += 1;
    }
    else if (result <= 68) { // Gold
        resources[7] += 1;
    }
    else if (result <= 74) { // Herbs
        resources[8] += 1;
    }
    else if (result <= 77) { // Jewelry
        resources[9] += 1;
    }
    else if (result <= 80) { // Tools
        resources[10] += 1;
    }
    else if (result <= 82) { // Weapons
        resources[11] += 1;
    }
    else if (result <= 84) { // Horse
        resources[12] += 1;
    }
}
function Simulate() {
    while (resources[0] < 15 || resources[1] < 15 || resources[2] < 17 || resources[3] < 17 || resources[4] < 11 || resources[5] < 11 || resources[6] < 9 || resources[7] < 9 || resources[8] < 10 || resources[9] < 2 || resources[10] < 5 || resources[11] < 3) {
        RandomAction();
        turnCount += 1;
    }
    displayInfo();
}
function displayInfo() {
    console.log(`Simulation complete in ${turnCount} turns.`);
    console.log(`Simulation complete in ${turnCount / 4} rounds.`);
    console.log(`Final resources: 
    Food: ${resources[0]}
    Clay: ${resources[1]}
    Labor: ${resources[2]}
    Papyrus: ${resources[3]}
    Stone: ${resources[4]}
    Wood: ${resources[5]}
    Bronze: ${resources[6]}
    Gold: ${resources[7]}
    Herbs: ${resources[8]}
    Jewelry: ${resources[9]}
    Tools: ${resources[10]}
    Weapons: ${resources[11]}`);
}
