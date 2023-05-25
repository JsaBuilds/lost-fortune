const readlineSync = require('readline-sync');

class Item {

    constructor(id, scene_n, inv_n, desc, room_id) {
        this.id = id;
        this.scene_n = scene_n; // Name used for pick-up UI.
        this.inv_n = inv_n; // Inventory name.
        this.desc = desc; // Description of item for the scene narration.
        this.room_id = room_id; // ID of the room item is in.
        this.taken = false; // Whether or not item has been picked up by player.
    }

}

const items = [
    new Item("i.beans", "Can of Beans", "CanOfBeans", "A can of beans lies nearby.", "r.ccite"),
    new Item("i.stick", "Thick Stick", "ThickStick", "A Thick Stick lies in the grass.", "r.wood1"),
    new Item("i.rgun", "Rusty Shotgun", "RustyShGun", "A Rusty Shotgun lies half-buried.", "r.plain1"),
]


var backpack = [new Item("i.beans", "Can of Beans", "CanOfBeans", "A can of beans lies nearby.", "r.ccite"), "sdfsdf", "sdfsd", "dfsdf", "Sdfsd"];

var displayInventory = function () {
    console.log("Inventory:");
    for (let i = 0; i < 5; i++) {
        console.log(i+1 + ") " + backpack[i].inv_n);
    }
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

exports.items = items;
