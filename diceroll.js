"use strict";
var DiceRoller;
(function (DiceRoller) {
    window.addEventListener("load", handleLoad);
    let targetResult;
    let targetPercentage;
    let maxDice;
    let sides;
    let results = [];
    let probabilities = [];
    function handleLoad() {
        const button = document.querySelector("#roll");
        button.addEventListener("click", handleButtonClick);
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
    function computeProbability(_x) {
        let possibilities = Math.pow(sides, maxDice);
        return results.filter(item => item === _x).length / possibilities * 100;
    }
    function computeThreshold(_targetPercentage) {
        probabilities = [];
        for (let i = maxDice; i <= (maxDice * sides); i++) {
            let possibilities = Math.pow(sides, maxDice);
            let prob = results.filter(item => item === i).length / possibilities * 100;
            probabilities.push(prob);
        }
        // console.log(probabilities);
        let totalProbability = 100;
        for (let j = 0; j < probabilities.length; j++) {
            let currentProbability = probabilities[j];
            totalProbability -= currentProbability;
            if (totalProbability <= _targetPercentage) {
                return maxDice + j + " or higher";
            }
        }
        return "error";
    }
    function handleButtonClick() {
        const diceInput = document.querySelector("#dice");
        const sidesInput = document.querySelector("#sides");
        const targetInput = document.querySelector("#target");
        const targetInput2 = document.querySelector("#target2");
        maxDice = diceInput.valueAsNumber;
        sides = sidesInput.valueAsNumber;
        targetResult = targetInput.valueAsNumber;
        targetPercentage = targetInput2.valueAsNumber;
        results = [];
        gatherResults(0, 0);
        // console.log(results);
        let p = computeProbability(targetResult);
        p = +p.toFixed(4);
        console.log(p);
        let q = computeThreshold(targetPercentage);
        console.log(q);
    }
})(DiceRoller || (DiceRoller = {}));
