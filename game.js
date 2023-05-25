const input = require('readline-sync');

const inventory = require('./inventory');
const rooms = require('./rooms.js');

const roomlist = rooms.roomlist;

exports.Game = function Game(name) {
    this.name = name;

    this.play = function () {
        // Leader's (general's) name
        var genName;

        // Stats
        var lives = 3;
        var health = 100;

        var gameOutput = "";

        // options

        var options = [];
        var choice;
        var opt1;
        var opt2;
        var opt3;
        var opt4;
        var pickupItem = "";
        var scene_desc;

        var continueGame = "y";

        // Getting name input.

        function getLeader() {
            do {
                genName = input.question("Enter the name of your main character >> ");
                
            } while (genName == "");
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
            console.log("On arrival in the Fallahathu system, the General and company were ambushed by the Zortax Eevorp, a");
            console.log("hostile intergalactic species. After a harsh battle he and his crew were crashlanded on Fallahathu 7.")
            console.log("In the crash, all soldiers died, leaving " + genName + " the sole survivor.");
            console.log("\n   The general knew the Zortax Eevorp would arrive soon to take the ship away for scrap, and he");
            console.log("was not equipped for another battle. So " + genName + " struck out into the forest, to find another");
            console.log("way to escape from the planet, and hopefully recover the Terrocom's lost fortune.\n");
            input.question("~ Press ENTER to continue. ~ ");
        }

        function displayOptions() {
            console.log("  {A} Look in backpack");
            console.log("  {B} Pickup item");
            console.log("  {C} Use item\n");
            console.log("  [1] " + opt1[0]);
            console.log("  [2] " + opt2[0]);
            console.log("  [3] " + opt3[0]);
            console.log("  [4] " + opt4[0]);
        }

        function displayMenu() {
                clearScreen();
                console.log(gameOutput);
                gameOutput = "";
                console.log("\n----------------------------\n");
                console.log(scene_desc);
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


        //function changeScene(possibleOptions) { // fix this to do a function as well.
          //  newScreenOptions = possibleOptions["choice" + choice];
            //if (newScreenOptions[0] == "death") {
              //  deathMsg(newScreenOptions[1]);
            //}
            //else {
              //  changeOptions(newScreenOptions[0], newScreenOptions[1], 
                //              newScreenOptions[2], newScreenOptions[3], 
                  //            newScreenOptions[4]);
   //         }
     //   }

        function scene_chg(goto_id) { // Scene change: Go to the Go-to ID
            console.log("Searching for room ID '" + goto_id + "' within:");
            for (const room of roomlist) {
                console.log("room ID: " + room.id);
                if (room.id == goto_id) {
                    console.log("Found " + room.id);
                    changeOptions(room.opt1, room.opt2, room.opt3, room.opt4, room.desc);
                    console.log("new options");
                    console.log([opt1, opt2, opt3, opt4, scene_desc]);
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
           
            else if (choice == "1") {
                scene_chg(opt1[1]);
                displayMenu();
            }

            else if (choice == "2") {
                scene_chg(opt2[1]);
                displayMenu();
            }

            else if (choice == "3") {
                scene_chg(opt3[1]);
                displayMenu();
            }

            else if (choice == "4") {
                scene_chg(opt4[1]);
                displayMenu();
            }

            //else if (options[choice] == undefined || options[choice] == "") {
              //  console.log("reset: choice == undefined or '' "); chooseOption(); 
           // }

            else { scene_chg(choice); }//console.log(scene_desc); console.log(options); chooseOption(); }

        }

        function changeOptions(newopt1, newopt2, newopt3, newopt4, desc) {
            opt1 = newopt1;
            opt2 = newopt2;
            opt3 = newopt3;
            opt4 = newopt4;
            scene_desc = desc;
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

           // changeOptions("Go deeper into woods.", "Setup camp.", "Fight Zortax Eevorp.", "Head out into plains.",
            //"The woods in front of you and\nthe ship behind you, your journey begins.");
            scene_chg("r.ccite");

            displayMenu();
            displayMenu();

        }

        displayIntroduction();
        mainGameLoop();
    };
}
