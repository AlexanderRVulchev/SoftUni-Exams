function solve(input) {
    console.log(Number(true));
    let baristas = {};
    const numberOfBaristas = Number(input.shift());

    for (let i = 0; i < numberOfBaristas; i++) {
        const line = input.shift();
        const [name, shift, coffeeToken] = line.split(" ");
        const coffees = coffeeToken.split(",");

        baristas[name] = {
            name,
            shift,
            coffees
        };
    }

    while (true) {
        const line = input.shift();
        const [command, ...restOfThetokens] = line.split(" / ");

        if (command === "Closed") {
            break;
        } else if (command === "Prepare") {
            prepare(restOfThetokens);
        } else if (command === "Change Shift") {
            changeShift(restOfThetokens);
        } else if (command === "Learn") {
            learn(restOfThetokens);
        }
    }

    for (const barista of Object.values(baristas)) {
        console.log(`Barista: ${barista.name}, Shift: ${barista.shift}, Drinks: ${barista.coffees.join(", ")}`);
    }

    function prepare(tokens) {
        const [name, shift, type] = tokens;
        const barista = baristas[name];
        if (barista.shift === shift && barista.coffees.includes(type)) {
            console.log(`${name} has prepared a ${type} for you!`);
        } else {
            console.log(`${name} is not available to prepare a ${type}.`);
        }
    }

    function changeShift(tokens) {
        const [name, newShift] = tokens;
        const barista = baristas[name];
        barista.shift = newShift;
        console.log(`${name} has updated his shift to: ${newShift}`);
    }

    function learn(tokens) {
        const [name, newType] = tokens;
        const barista = baristas[name];
        if (barista.coffees.includes(newType)) {
            console.log(`${name} knows how to make ${newType}.`);
        } else {
            barista.coffees.push(newType);
            console.log(`${name} has learned a new coffee type: ${newType}.`);
        }
    }
}



solve(
    ['4',
        'Alice day Espresso,Cappuccino',
        'Bob night Latte,Mocha',
        'Carol day Americano,Mocha',
        'David night Espresso',
        'Prepare / Alice / day / Espresso',
        'Change Shift / Bob / day',
        'Learn / Carol / Latte',
        'Prepare / Bob / night / Latte',
        'Learn / David / Cappuccino',
        'Prepare / Carol / day / Cappuccino',
        'Change Shift / Alice / night',
        'Learn / Bob / Mocha',
        'Prepare / David / night / Espresso',
        'Closed']
);