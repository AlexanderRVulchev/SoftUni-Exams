function solve(input) {
    const maxFuel = 100;
    const numberOfRiders = input.shift();
    const racers = {}

    for (let i = 0; i < numberOfRiders; i++) {
        [rider, fuel, position] = input.shift().split("|");
        fuel = Math.min(fuel, maxFuel);
        racers[rider] = { rider, fuel, position };
    }

    while (input.length > 0) {
        const line = input.shift();
        const [command, ...restOfTheTokens] = line.split(" - ");

        if (command === "Finish") {
            break;
        } else if (command === "StopForFuel") {
            stopForFuel(restOfTheTokens);
        } else if (command === "Overtaking") {
            overtaking(restOfTheTokens);
        } else if (command === "EngineFail") {
            engineFail(restOfTheTokens);
        }
    }

    for (const racer of Object.values(racers)) {
        console.log(racer.rider);
        console.log(`  Final position: ${racer.position}`);
    }

    function stopForFuel(tokens) {
        const [rider, minimumFuel, changedPosition] = tokens;
        const racer = racers[rider];
        if (racer.fuel < minimumFuel) {
            racer.position = changedPosition;
            console.log(`${rider} stopped to refuel but lost his position, now he is ${changedPosition}.`);
        } else {
            console.log(`${rider} does not need to stop for fuel!`);
        }
    }

    function overtaking(tokens) {
        const [rider1, rider2] = tokens;
        const racer1 = racers[rider1];
        const racer2 = racers[rider2];
        if (Number(racer2.position) > Number(racer1.position)) {
            [racer1.position, racer2.position] = [racer2.position, racer1.position];
            console.log(`${rider1} overtook ${rider2}!`);
        }
    }

    function engineFail(tokens) {
        [rider, lapsLeft] = tokens;
        delete racers[rider];
        console.log(`${rider} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`);
    }
}