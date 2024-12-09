"use strict";
var DiceRoller;
(function (DiceRoller) {
    window.addEventListener("load", handleLoad);
    let targetPercentage = 0.3;
    let dice = 4;
    let sides = 8;
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
        console.log(probabilities);
    }
    function gatherResults(_sum, _dice) {
        if (_dice === dice) {
            results.push(_sum);
            return;
        }
        for (let i = 1; i <= sides; i++) {
            gatherResults(_sum + i, _dice + 1);
        }
    }
    function computeProbability() {
        for (let i = 0; i <= (dice * sides); i++) {
            let possibilities = Math.pow(sides, dice);
            let prob = results.filter(item => item === i).length / possibilities;
            probabilities.push(prob);
        }
    }
    function simulateRoll(_n) {
        for (let i = 0; i < _n; i++) {
            let diceTotal = 0;
            for (let k = 0; k < dice; k++) {
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
        let totalProbability = 1;
        for (let j = dice; j < _diceTotal; j++) {
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
