"use strict";
var DiceRoller;
(function (DiceRoller) {
    window.addEventListener("load", handleLoad);
    let targetPercentage = 30;
    let maxDice = 6;
    let sides = 6;
    let results = [];
    let probabilities = [];
    let simulationResults = [0, 0];
    function handleLoad() {
        console.log("Loading...");
        const button = document.querySelector("#roll");
        button.addEventListener("click", handleButtonClick);
        gatherResults(0, 0);
        computeProbability();
        console.log("Loaded");
    }
    function gatherResults(_sum, _dice) {
        if (_dice === maxDice) {
            results.push(_sum);
            return;
        }
        for (let i = 1; i <= sides; i++) {
            gatherResults(_sum + i, _dice + 1);
        }
    }
    function computeProbability() {
        for (let i = maxDice; i <= (maxDice * sides); i++) {
            let possibilities = Math.pow(sides, maxDice);
            let prob = results.filter(item => item === i).length / possibilities * 100;
            probabilities.push(prob);
        }
    }
    function simulateRoll(_n) {
        for (let i = 0; i < _n; i++) {
            let diceTotal = 0;
            for (let k = 0; k < maxDice; k++) {
                let roll = Math.ceil(Math.random() * sides);
                diceTotal += roll;
            }
            // console.log(diceTotal)
            checkThreshold(diceTotal);
        }
        console.log("Success: " + simulationResults[0]);
        console.log("Failed: " + simulationResults[1]);
        simulationResults = [0, 0];
    }
    function checkThreshold(_diceTotal) {
        let totalProbability = 100;
        for (let j = 0; j < _diceTotal - maxDice; j++) {
            let currentProbability = probabilities[j];
            totalProbability -= currentProbability;
        }
        // console.log(totalProbability)
        if (totalProbability <= targetPercentage) {
            simulationResults[0] += 1;
        }
        else {
            simulationResults[1] += 1;
        }
    }
    function handleButtonClick() {
        const diceInput = document.querySelector("#dice");
        let n = diceInput.valueAsNumber;
        simulateRoll(n);
    }
})(DiceRoller || (DiceRoller = {}));
