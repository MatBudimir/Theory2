namespace DiceRoller
{
    window.addEventListener("load", handleLoad);

    let targetPercentage: number = 0.3;
    let dice: number = 4;
    let sides: number = 8;

    let results: number[] = [];
    let probabilities: number[] = [];
    let simulationResults: number[] = [0, 0];


    function handleLoad(): void
    {
        console.log("Loading...");

        const button: HTMLButtonElement = document.querySelector("#roll")!;
        button.addEventListener("click", handleButtonClick);

        gatherResults(0, 0);
        computeProbability();

        console.log("Loaded");
        console.log(probabilities);
    }

    function gatherResults(_sum: number, _dice: number): void
    {
        if (_dice === dice)
        {
            results.push(_sum);
            return;
        }

        for (let i: number = 1; i <= sides; i++)
        {
            gatherResults(_sum + i, _dice + 1);
        }
    }

    function computeProbability(): void
    {
        for (let i: number = 0; i <= (dice * sides); i++)
        {
            let possibilities: number = Math.pow(sides, dice);
            let prob: number = results.filter(item => item === i).length / possibilities;
            probabilities.push(prob);
        }
    }

    function simulateRoll(_n: number): void
    {
        for (let i: number = 0; i < _n; i++)
        {
            let diceTotal: number = 0;

            for (let k: number = 0; k < dice; k++)
            {
                let roll: number = Math.ceil(Math.random() * sides);
                diceTotal += roll;
            }
           // console.log(diceTotal)
            checkThreshold(diceTotal);
        }
        console.log("Success: " + simulationResults[0]);
        console.log("Failed: " + simulationResults[1]);
        simulationResults = [0, 0];
    }

    function checkThreshold(_diceTotal: number): void
    {
        let totalProbability: number = 1;

        for (let j: number = dice; j < _diceTotal; j++)
        {
            let currentProbability = probabilities[j];
            totalProbability -= currentProbability;
        }

        // console.log(totalProbability)

        if (totalProbability <= targetPercentage)
        {
            simulationResults[0] += 1;
        } else
        {
            simulationResults[1] += 1;
        }
    }

    function handleButtonClick()
    {
        const diceInput: HTMLInputElement = document.querySelector("#dice")!;
        let n: number = diceInput.valueAsNumber;
        simulateRoll(n);
    }
}
