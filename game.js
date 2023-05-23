const input = require('readline-sync');

const inventory = require('./inventory');
const rooms = require('./rooms.js');

const roomlist = rooms.roomlist;

exports.Game = function Game(name) {
    this.name = name;

    this.play = function () {
        // Person-related
        // Leader's (general's) name
        var genName;
        var soldiers = [];
        var soldierNum;
        var survivors;

        // Stats
        var killed = 2; // Soldiers killed.
        var lives = 3;
        var health = 100;
        var day = 1;
        var gameOutput = "";

        // options

        var options = [];
        var choice;
        var choiceList = [];
        var pickupItem = "";
        var msg;

        var continueGame = "y";

        // Getting name input.

        function getLeader() {
            do {
                genName = input.question("Enter the name of your main character >> ");
                
            } while (genName == "");
            soldiers.push(genName);
        }

        function getSoldierNames() {
            console.log("\nEnter the name of a soldier at your command.\nThen press enter when you are done.");

            var nameInput;

            do {

                nameInput = input.question(">> ");
                if (nameInput == "") {
                    if (soldiers.length < 5) {console.log("Must enter at least 4 names.")}
                    else { break; }
                }

                else {
                    soldiers.push(nameInput);
                }

            } while (soldiers.length < 10);

            soldierNum = soldiers.length;
            survivors = soldierNum - killed;
        }

        // in-game display stuff.

        function displayIntroduction() {
            console.log("\n~ Welcome to Lost Fortune ~\n");
            getLeader();
            //getSoldierNames();
            console.log("\n    The great fortune of the powerful and influencial Grand Terrocom of 55 Cancri E has been stolen!");
            console.log("The Terrocom is furious over the issue, and when he gets angry, planets are blown up. The Galaxy is ");
            console.log("gripped in fear, every being dreading their planet might be next.                                   ");
            console.log("\n    The Galactic Congress sent a legion of soldiers led by General " + genName+ " to find this fortune.");
            console.log("They tracked the theft to the stormy planet of Fallahathu 7. (They did not inform the Terrocom,");
            console.log("however, for fear he might incinerate the planet.)                                                   ");
            //console.log("The team members are:");

            //soldierNames();

            console.log("On arrival in the Fallahathu system, the General and company were ambushed by the Zortax Eevorp, a");
            console.log("hostile intergalactic species. After a harsh battle he and his crew were crashlanded on Fallahathu 7.")
            console.log("In the crash, all soldiers died, leaving " + genName + " the sole survivor.");
            console.log("\n   The general knew the Zortax Eevorp would arrive soon to take the ship away for scrap, and he");
            console.log("was not equipped for another battle. So " + genName + " struck out into the forest, to find another");
            console.log("way to escape from the planet, and hopefully recover the Terrocom's lost fortune.\n");
            input.question("~ Press ENTER to continue. ~ ");
        }

        function soldierNames() {
            for (i = 0; i < soldierNum; i++) {
                console.log("> " + soldiers[i]);
            }
        }

        function removeDead() {
            while (soldierNum > survivors) {
                soldiers.pop();
                soldierNum -= 1;
            }
        }

        function displayOptions() {
            console.log("  {A} Look in backpack");
            console.log("  {B} Pickup item\n");
            for (i=0; i < 4; i++) {
                console.log("  [" + (i+1) + "] " + options[i]);
            }
        }

        function displayMenu() {
                clearScreen();
                console.log(gameOutput);
                gameOutput = "";
                console.log("----------------------------\n");
                console.log(msg);
                console.log("\n---------- Stats -----------\n");
                console.log("Lives: " + lives);
                console.log("Health: " + health);
                console.log("\n-----------------------------\n");
                displayOptions();
                console.log("\n-----------------------------\n");
                chooseOption();
        }

        function clearScreen() {
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        }

        // Gameplay and functionality.


        function changeScene(possibleOptions) { // fix this to do a function as well.
            newScreenOptions = possibleOptions["choice" + choice];
            if (newScreenOptions[0] == "death") {
                deathMsg(newScreenOptions[1]);
            }
            else {
                changeOptions(newScreenOptions[0], newScreenOptions[1], 
                              newScreenOptions[2], newScreenOptions[3], 
                              newScreenOptions[4]);
            }
        }

        function scene_chg(goto_id) { // Scene change: Go to the Go-to ID
            console.log("Searching for room ID " + goto_id + " within:");
            //console.log(roomlist);
            for (const room of roomlist) {
                console.log("room ID: " + room.id);
                if (room.id == goto_id) {
                    console.log("Found " + room.id);
                    changeOptions(room.opt1, room.opt2, room.opt3, room.opt4, room.desc);
                    console.log("new options");
                    console.log(options);
                }
            }
        }

        function chooseOption() {
            choice = input.question(">> "); // Ask for user input.
            console.log(choice);
            if (choice == "a" || choice == "A") { // Look in inventory
                gameOutput = inventory.displayInventory();
                displayMenu();
            }
            else if (choice == "b" || choice == "B") { // Pickup item
                gameOutput = inventory.addToInventory(pickupItem);
                displayMenu();
            }
            //else if (options[choice] == undefined || options[choice] == "") {
              //  console.log("reset: choice == undefined or '' "); chooseOption(); 
           // }
            else { scene_chg(choice); }//console.log(msg); console.log(options); chooseOption(); }

        }

        function changeOptions(opt1, opt2, opt3, opt4, newMsg) {
            options[0] = opt1;
            options[1] = opt2;
            options[2] = opt3;
            options[3] = opt4;
            msg = newMsg;
        }

        function setItems(itemList) {
            itemInScene = itemList[choice - 1];

            if (itemInScene == undefined) {
                pickupItem = "";
            }
            else { pickupItem = itemInScene; }
        }

        function checkProgressFromScreen(screenNum) {
            var choiceInList = choiceList[screenNum - 1]; // for example, checkProgressFromScreen(1) means return choiceList[0].
            return choiceInList;
        }

        // Losing health and death.

        function doDamage(damage) {
            health -= damage;
            gameOutput = "-" + damage + " Health.";
            if (health <= 0) {
                deathMsg("Your health dropped to zero.");
            }
        }

        function deathMsg(msg) {
            console.log(msg);
            lives -= 1;

            if (lives > 0) {
                console.log("Lives: " + lives);
                console.log(" - Would you like to continue? [y/n]");
                continueGame = input.question(">> ");

                if (continueGame == "y") { mainGameLoop(); }
            }

            else {
                console.log("\n~ Game Over ~\n");
                 // TODO: need something here to stop game from continuing
            }
        }

        function mainGameLoop() {

            changeOptions("Go deeper into woods.", "Setup camp.", "Fight Zortax Eevorp.", "Head out into plains.",
            "The woods in front of you and\nthe ship behind you, your journey begins.");

            displayMenu();

        }

//            changeScene({
//                choice1: ["Open Backpack.", "Pick up stick.", "Go left.", "Go right.",
//                "You and your troops trek deeper into the woods, further from"+
//                "\nthe crash site. You come to a fork in the road. A big thick stick"+
//                "\nlies in the grass."],
//                choice2: ["Inspect the campsite.", "Stay for the night.", "Move on.", "",
//                "You order the troops to set up\ncamp. Tents are pitched."],
//                choice3: ["death", "You and your troops go back out and put up a fight against the Zortax Eevorp,"+
//                                    "\nwho have come to collect your ship for scrap. Unfortunately, they have the"+
//                                    "\nbetter weapons, and you and your soldiers were destroyed."],
//                choice4: ["Open Backpack.", "Pick up shotgun.", "Move on.", "",
//                "You and the troops turn east\nand head for the plains instead\nof the forest. You find\na rusty shotgun on the ground."]
//            });
//
//            setItems(["Thick stick", "", "", "Rusty Shotgun"]);
//
//            displayMenu();
//
//            if (checkProgressFromScreen(1) == 1) { // This copy-pasting is less than optimal, but I'll fix it soon.
//                if (choice == 1) { inventory.displayInventory(); }
//
//                else if (choice == 2) { 
//                    inventory.addToInventory("Thick stick"); }
//
//                else if (choice == 3) {
//                    changeOptions("Enter the hollow.", "Walk around the hollow.", "Walk straight through.", "Go back.",
//                    "You go left. Presently you come to a narrow hollow."+
//                    "\nThe trees on both sides lean over to form a roof, and"+
//                    "\na large rock in similar shape to a compass needle sits"+
//                    "\non the side of the hill, pointing off at an angle into."+
//                    "\nthe hollow");
//                }
//
//                else if (choice == 4) {
//                    changeOptions("Enter the cave.", "Setup camp nearby.", "Setup camp elsewhere.", "",
//                    "You go right. You and your troops walk for a long time."+
//                    "\nThe light coming through the leaves darkens, and a fog"+
//                    "\nbegins to develop. One of the troops points ahead at a"+
//                    "\nlarge cave entrance. 'Let's go in there,' he suggests.");
//                }
//            }
//
//            if (checkProgressFromScreen(1) == 2) {
//                if (choice == 1) {
//                    changeOptions("add options", "add options", "add options", "add options",
//                    "You take a stroll around your campsite, peering"+
//                    "\nout into the forest for any possible danger."+
//                    "\nSomething rushes by your feet. a rabbit-like"+
//                    "\ncreature jumps out of the bushes and slashes at"+
//                    "\nyour leg with its claws. You kick it, sending it"+
//                    "\nflying. Blood seeps from your pant leg.");
//                    doDamage(10);
//                }
//                else if (choice == 2) {
//                    changeOptions("add options", "add options", "add options", "add options",
//                    "You and your troops rest at the camp during the"+
//                    "\nnight. You wake up refreshed and ready to continue"+
//                    "\nyour journey.");
//                }
//                else if (choice == 3) {
//                    changeOptions("add options", "add options", "add options", "add options",
//                    "After quickly glancing at the area, you decide to"+
//                    "\nmove on; it would be unwise to remain in so un-"+
//                    "\nprotected a place.");
//                }
//            }
//
//            if (checkProgressFromScreen(1) == 4) {
//                if (choice == 1) { inventory.displayInventory();}
//                else if (choice == 2) { inventory.addToInventory("Rusty shotgun"); }
//
//                else if (choice == 3) {
//                    changeOptions("add options", "add options", "add options", "add options",
//                    "You move on, leaving the ancient weapon.");
//                }
//            }
//            displayMenu();
//        }
//
        displayIntroduction();
        mainGameLoop();
    };
}
