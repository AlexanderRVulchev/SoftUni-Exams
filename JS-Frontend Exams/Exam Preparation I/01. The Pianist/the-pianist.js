function solve(input) {
    const numberOfPieces = Number(input.shift());
    const collection = {};

    for (let i = 0; i < numberOfPieces; i++) {
        const line = input.shift();
        const [piece, composer, key] = line.split("|");
        collection[piece] = { composer, key };
    };

    while (input.length > 0) {
        const line = input.shift();
        const [command, ...restOfTheTokens] = line.split("|");

        if (command === "Add") {
            add(restOfTheTokens);
        } else if (command === "Remove") {
            remove(restOfTheTokens);
        } else if (command === "ChangeKey") {
            changeKey(restOfTheTokens);
        } else {
            break;
        }
    }

    for (const [pieceName, pieceObj] of Object.entries(collection)) {
        console.log(`${pieceName} -> Composer: ${pieceObj.composer}, Key: ${pieceObj.key}`);
    }

    // -- Functions

    function add(tokens) {
        const [piece, composer, key] = tokens;
        if (collection.hasOwnProperty(piece)) {
            console.log(`${piece} is already in the collection!`);
        } else {
            collection[piece] = { composer, key };
            console.log(`${piece} by ${composer} in ${key} added to the collection!`);
        }
    }

    function remove(tokens) {
        const piece = tokens.shift();
        if (collection.hasOwnProperty(piece)) {
            delete collection[piece];
            console.log(`Successfully removed ${piece}!`);
        } else {
            console.log(`Invalid operation! ${piece} does not exist in the collection.`);
        }
    }

    function changeKey(tokens) {
        const [piece, newKey] = tokens;
        if (collection.hasOwnProperty(piece)) {
            collection[piece].key = newKey;
            console.log(`Changed the key of ${piece} to ${newKey}!`);
        } else {
            console.log(`Invalid operation! ${piece} does not exist in the collection.`);
        }
    }
}