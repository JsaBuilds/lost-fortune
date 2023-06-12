const input = require('readline-sync');

const inventory = require('./inventory');
//console.log(require('./inventory'));
//console.log(inventory.items)
const rooms = require('./rooms.js');

const roomlist = rooms.roomlist;

exports.Game = function Game(name) {
    this.name = name;

    this.play = function () {
        // Leader's (general's) name
        var genName;

        // Display

        var gameOutput = "";

        // Options

        var options = [];
        var choice;
        var opt1;
        var opt2;
        var opt3;
        var opt4;
        var pickupItem = "";
        var scene_desc;
        var room_id = "r.ccite";

        // Game loop

        var continueGame = "y";
        var gameOver = false;


        // Getting name input.

        function getLeader() {
            do {
                genName = input.question("Enter the name of your main character >> ");
            } while (genName == "");
        }

        // In-game display stuff.

        function displayIntroduction() {
            console.log("\n~ Welcome to Lost Fortune ~\n");
            getLeader();
            console.log("\n    The great fortune of the powerful and influencial Grand Terrocom of 55 Cancri E has been stolen!");
            console.log("The Terrocom is furious over the issue, and when he gets angry, planets are blown up. The Galaxy is ");
            console.log("gripped in fear, every being dreading their planet might be next.                                   ");
            console.log("\n    The Galactic Congress sent a legion of soldiers led by General " + genName+ " to find this fortune.");
            console.log("They tracked the theft to the stormy planet of Fallahathu 7. (They did not inform the Terrocom,");
            console.log("however, for fear he might incinerate the planet.)                                                   ");
            console.log("On arrival in the Fallahathu system, the General and company were ambushed by the Zortax Eevorp, a");
            console.log("hostile intergalactic species. After a harsh battle he and his crew were crashlanded on Fallahathu 7.")
            console.log("In the crash, all soldiers died, leaving " + genName + " the sole survivor.");
            console.log("\n   The general knew the Zortax Eevorp would arrive soon to take the ship away for scrap, and he");
            console.log("was not equipped for another battle. So " + genName + " struck out into the forest, to find another");
            console.log("way to escape from the planet, and hopefully recover the Terrocom's lost fortune.\n");
            input.question("~ Press ENTER to continue. ~ ");
        }

        function clearScreen() {
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        }

        function displayMenu() {
                clearScreen();
                console.log("\n----------------------------\n");
                console.log(gameOutput);
                gameOutput = "";
                console.log("\n----------------------------\n");
                console.log(scene_desc + "\n");
                disp_items();
                console.log("\n-------- Inventory ---------\n");
                inventory.displayInventory();
                console.log("\n-----------------------------\n");
                displayOptions();
                console.log("\n-----------------------------\n");
        }

        function disp_items() { // Display items in the scene
            for (const item of inventory.items) {
                if (item.taken == false && item.room_id == room_id) {
                    console.log(item.desc);
                }
            }
        }

        function displayOptions() {
            console.log("  Type \"use: ITEM NUMBER\" to use an inventory item.");
            console.log("  Type \"take: ITEM NAME\" to pick up an item.\n");
            console.log("  [1] " + opt1[0]); // opt = [action, room ID]
            console.log("  [2] " + opt2[0]);
            console.log("  [3] " + opt3[0]);
            console.log("  [4] " + opt4[0]);
        }

        // Gameplay and functionality.

        function scene_chg(goto_id) { // Scene change: Go to the Go-to ID
            console.log("Searching for room ID '" + goto_id + "' within:");
            for (const room of roomlist) {
                console.log("room ID: " + room.id);
                if (room.id == goto_id) {
                    console.log("Found " + room.id);
                    changeOptions(room.opt1, room.opt2, room.opt3, room.opt4, room.desc);
                    room_id = room.id
                    console.log("new options");
                    console.log([opt1, opt2, opt3, opt4, scene_desc]);
                }
            }
        }

        function chooseOption() {
            choice = input.question(">> "); // Ask for user input.

            // Change scene
           
            if (choice == "1") {
                scene_chg(opt1[1]); // opt = [action, room ID]
            }

            else if (choice == "2") {
                scene_chg(opt2[1]);
            }

            else if (choice == "3") {
                scene_chg(opt3[1]);
            }

            else if (choice == "4") {
                scene_chg(opt4[1]);
            }

            else {
                cmd = choice.split(": "); command = cmd[0]; select = cmd[1] // A string or a number.

                if (command == "take") {  inventory.addToInventory(select, room_id); }
                else if (command == "use") { useitem = inventory.backpack[select - 1]; inventory.useItem(useitem, room_id); }//gameOutput = "use command: " + useitem; }
            }

        }

        function changeOptions(newopt1, newopt2, newopt3, newopt4, desc) {
            opt1 = newopt1;
            opt2 = newopt2;
            opt3 = newopt3;
            opt4 = newopt4;
            scene_desc = desc;
        }

        function mainGameLoop() {
            displayMenu();
            while (gameOver == false) {
                chooseOption();
                displayMenu();
            }
        }

        displayIntroduction();
        scene_chg("r.ccite");
        mainGameLoop();
    };
}
