namespace DiceRoller
{
    window.addEventListener("load", handleLoad);

    let targetResult: number;
    let targetPercentage: number;
    let maxDice: number;
    let sides: number;
    let results: number[] = [];
    let probabilities: number[] = [];

    function handleLoad(): void
    {
        const button: HTMLButtonElement = document.querySelector("#roll")!;
        button.addEventListener("click", handleButtonClick);
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

    function computeProbability(_x: number): number
    {
        let possibilities: number = Math.pow(sides, maxDice);
        return results.filter(item => item === _x).length / possibilities * 100;
    }

    function computeThreshold(_targetPercentage: number): string
    {
        probabilities = [];

        for (let i: number = maxDice; i <= (maxDice * sides); i++)
        {
            let possibilities: number = Math.pow(sides, maxDice);
            let prob: number = results.filter(item => item === i).length / possibilities * 100;
            probabilities.push(prob);
        }

        // console.log(probabilities);

        let totalProbability: number = 100;

        for (let j: number = 0; j < probabilities.length; j++)
        {
            let currentProbability = probabilities[j];
            totalProbability -= currentProbability;

            if (totalProbability <= _targetPercentage)
            {
                return maxDice + j + " or higher";
            }
        }

        return "error";
    }

    function handleButtonClick()
    {
        const diceInput: HTMLInputElement = document.querySelector("#dice")!;
        const sidesInput: HTMLInputElement = document.querySelector("#sides")!;
        const targetInput: HTMLInputElement = document.querySelector("#target")!;
        const targetInput2: HTMLInputElement = document.querySelector("#target2")!;

        maxDice = diceInput.valueAsNumber;
        sides = sidesInput.valueAsNumber;
        targetResult = targetInput.valueAsNumber;
        targetPercentage = targetInput2.valueAsNumber;

        results = [];
        gatherResults(0, 0);
        // console.log(results);

        let p: number = computeProbability(targetResult);
        p = +p.toFixed(4);
        console.log(p);

        let q: string = computeThreshold(targetPercentage);
        console.log(q);
    }
}
