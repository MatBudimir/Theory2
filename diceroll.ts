namespace DiceRoller
{
    window.addEventListener("load", handleLoad);

    let targetPercentage: number = 30;
    let maxDice: number = 6;
    let sides: number = 6;

    let results: number[] = [];
    let probabilities: number[] = [];
    let simulationResults: number[] = [0, 0];


    function handleLoad(): void
    {
        console.log("Loading...")

        const button: HTMLButtonElement = document.querySelector("#roll")!;
        button.addEventListener("click", handleButtonClick);

        gatherResults(0, 0);
        computeProbability();

        console.log("Loaded")
    }

    function gatherResults(_sum: number, _dice: number): void
    {
        if (_dice === maxDice)
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
        for (let i: number = maxDice; i <= (maxDice * sides); i++)
        {
            let possibilities: number = Math.pow(sides, maxDice);
            let prob: number = results.filter(item => item === i).length / possibilities * 100;
            probabilities.push(prob);
        }
    }

    function simulateRoll(_n: number): void
    {
        for (let i: number = 0; i < _n; i++)
        {
             let diceTotal: number = 0;

            for (let k: number = 0; k < maxDice; k++)
            {
                let roll: number = Math.ceil(Math.random() * sides);
                diceTotal += roll;
            }
            // console.log(diceTotal)
            checkThreshold(diceTotal)
        }
        console.log("Success: " + simulationResults[0]);
        console.log("Failed: " + simulationResults[1]);
        simulationResults = [0, 0];
    }

    function checkThreshold(_diceTotal: number): void
    {
            let totalProbability: number = 100;


            for (let j: number = 0; j < _diceTotal - maxDice; j++)
            {
                let currentProbability = probabilities[j];
                totalProbability -= currentProbability;
            }

            // console.log(totalProbability)

            if (totalProbability <= targetPercentage)
                {
                    simulationResults[0] +=1
                } else {
                    simulationResults[1] +=1
                }
    }

    function handleButtonClick()
    {
        const diceInput: HTMLInputElement = document.querySelector("#dice")!;
        let n: number = diceInput.valueAsNumber;
        simulateRoll(n);
    }
}
