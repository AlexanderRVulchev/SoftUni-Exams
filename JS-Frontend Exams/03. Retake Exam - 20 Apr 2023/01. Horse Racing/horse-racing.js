function solve(input) {
    let horses = Array.from(input.shift().split("|"));

    while (input.length > 0) {
        const [command, ...restOfTheTokens] = input.shift().split(" ");

        if (command === "Finish") {
            break;
        } else if (command === "Retake") {
            retake(restOfTheTokens);
        } else if (command === "Trouble") {
            trouble(restOfTheTokens);
        } else if (command === "Rage") {
            rage(restOfTheTokens);
        } else if (command === "Miracle") {
            miracle();
        }
    }

    console.log(horses.join("->"));
    console.log(`The winner is: ${horses[horses.length - 1]}`);

    function retake(tokens) {
        const [overtakingHorseName, overtakenHorseName] = tokens;
        const overtakingIndex = horses.indexOf(overtakingHorseName);
        const overtakenIndex = horses.indexOf(overtakenHorseName);
        if (overtakingIndex < overtakenIndex) {
            swap(overtakingIndex, overtakenIndex);
            console.log(`${overtakingHorseName} retakes ${overtakenHorseName}.`);
        }
    }

    function trouble(tokens) {
        const horseName = tokens[0];
        const horseIndex = horses.indexOf(horseName);
        if (horseIndex > 0) {
            swap(horseIndex, horseIndex - 1);
            console.log(`Trouble for ${horseName} - drops one position.`);
        }
    }

    function rage(tokens) {
        const horseName = tokens[0];
        const lastIndex = horses.length - 1;
        let horseIndex = horses.indexOf(horseName);

        for (let i = 0; i < 2; i++) {
            if (horseIndex < lastIndex) {
                swap(horseIndex, horseIndex + 1);
                horseIndex++;
            }            
        }
        console.log(`${horseName} rages 2 positions ahead.`);
    }

    function miracle() {
        const horseName = horses.shift();
        horses.push(horseName);
        console.log(`What a miracle - ${horseName} becomes first.`);
    }

    function swap(index1, index2) {
        const swap = horses[index1];
        horses[index1] = horses[index2];
        horses[index2] = swap;
    }
}

solve(['Fancy|Lilly',
'Retake Lilly Fancy',
'Trouble Lilly',
'Trouble Lilly',
'Finish',
'Rage Lilly'])


