function solve(input) {
    let list = input.shift().split("!");

    while (input.length > 0) {
        const tokens = input.shift().split(" ");
        const command = tokens[0];

        if (command === "Go") {
            break;
        }

        if (command === "Urgent") {
            urgent(tokens[1]);
        } else if (command === "Unnecessary") {
            unnecessary(tokens[1]);
        } else if (command === "Correct") {
            correct(tokens[1], tokens[2]);
        } else if (command === "Rearrange") {
            rearrange(tokens[1]);
        }
    }

    console.log(list.join(", "));

    // Functions

    function urgent(item) {
        if (!list.includes(item)) {
            list.unshift(item);
        }
    }

    function unnecessary(item) {
        list = list.filter(i => i !== item);
    }

    function correct(oldItem, newItem) {
        const index = list.indexOf(oldItem);
        if (index >= 0) {
            list[index] = newItem;
        }
    }

    function rearrange(item) {
        const index = list.indexOf(item);
        if (index >= 0) {
            list.splice(index, 1);
            list.push(item);
        }
    }
}