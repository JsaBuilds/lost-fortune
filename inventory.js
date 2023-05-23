const readlineSync = require('readline-sync');

class Item {

    constructor(id, scene_n, inv_n, desc, room_id) {
        this.id = id;
        this.scene_n = scene_n; // list of names used for pick-up UI.
        this.inv_n = inv_n; // Inventory name.
        this.desc = desc; // Description of item for the scene narration.
        this.room_id = room_id; // ID of the room item is in.
        this.taken = false; // Whether or not item has been picked up by player.
    }

}

var backpack = [new Item("i.beans", ["Can of Beans", "can of beans"], "CanOfBeans", "A can of beans lies nearby.", "r.ccite")];

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
