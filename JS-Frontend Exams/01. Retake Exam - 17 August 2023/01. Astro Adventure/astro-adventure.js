function solve(input) {
    const maxOxygen = 100;
    const maxEnergy = 200;

    let astronauts = {};
    const numberOfAstronauts = Number(input.shift());

    for (let i = 0; i < numberOfAstronauts; i++) {
        const [name, oxygen, energy] = input.shift().split(" ");
        astronauts[name] = { name, oxygen: Number(oxygen), energy: Number(energy) };
    }

    while (input.length > 0) {
        const [command, ...restOfTheTokens] = input.shift().split(" - ");
        if (command === "End") {
            break;
        }

        if (command === "Explore") {
            explore(restOfTheTokens)
        } else if (command === "Refuel") {
            refuel(restOfTheTokens)
        } else if (command === "Breathe") {
            breathe(restOfTheTokens);
        }
    }

    for (const astronaut of Object.values(astronauts)) {
        console.log(`Astronaut: ${astronaut.name}, Oxygen: ${astronaut.oxygen}, Energy: ${astronaut.energy}`);
    }

    function explore(tokens) {
        const [astronautName, energyNeeded] = tokens;
        const astronaut = astronauts[astronautName];
        if (astronaut.energy <= energyNeeded) {
            console.log(`${astronautName} does not have enough energy to explore!`);
        } else {
            astronaut.energy -= Number(energyNeeded);
            console.log(`${astronautName} has successfully explored a new area and now has ${astronaut.energy} energy!`);
        }
    }

    function refuel(tokens) {
        const [astronautName, amount] = tokens;
        const astronaut = astronauts[astronautName];
        const energyGain = Math.min(maxEnergy - astronaut.energy, amount);
        astronaut.energy += energyGain;
        console.log(`${astronautName} refueled their energy by ${energyGain}!`);
    }

    function breathe(tokens) {
        const [astronautName, amount] = tokens;
        const astronaut = astronauts[astronautName];
        const oxygenGain = Math.min(maxOxygen - astronaut.oxygen, amount);
        astronaut.oxygen += oxygenGain;
        console.log(`${astronautName} took a breath and recovered ${oxygenGain} oxygen!`);
    }
}


solve(
    [
        '4',
        'Alice 60 100',
        'Bob 40 80',
        'Charlie 70 150',
        'Dave 80 180',
        'Explore - Bob - 60',
        'Refuel - Alice - 30',
        'Breathe - Charlie - 50',
        'Refuel - Dave - 40',
        'Explore - Bob - 40',
        'Breathe - Charlie - 30',
        'Explore - Alice - 40',
        'End'
    ]
)