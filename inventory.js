const readlineSync = require('readline-sync');

var backpack = ["Can of beans"];

var displayInventory = function () {
    return "Backpack contents\n"+
    backpack.join(" | ");
}

exports.addToInventory = function (item) {
    if (item == "") { return "No items to pick up."; }
    if (backpack.length < 5) {
        backpack.push(item);
        return item + " added to Backpack.";
    }
    else {
        console.log("Your Backpack is too full.\nWould you like to replace an Item? [y/n]");
        if (readlineSync.question(">> ") == "y") { replaceItemWith(item) }
    }
}

var replaceItemWith = function (item) {
    console.log("\nChoose an Item to replace.");
    displayInventory();
    do {
        var replaceItem = readlineSync.question(">> ");
        var replaceMe = backpack.indexOf(replaceItem);

        if (replaceMe != -1) {
            backpack[replaceMe] = item;
            return item + " added to Backpack.";
        }

        else {
            console.log("Invalid Item, try again.")
        }
    } while (replaceMe == -1)
}

exports.replaceItemWith = replaceItemWith;
exports.displayInventory = displayInventory;
