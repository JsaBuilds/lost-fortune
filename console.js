const input = require('readline-sync');

const inventory = require('./inventory');
const game = require('./game');

exports.GameConsole = function () {
    this.turnOn = function () {
        console.log("Welcome. Would you like to:");
        console.log("1. Load a game\n");
        console.log("2. Turn off\n");
        startupChoice = input.question(">> ");

        if (startupChoice == 1) { this.load(); }
        else { console.log("Goodbye. ");  }
    }

    this.start = function () {
        do {
            email = input.question("Enter your email (must be a valid email). >> ");
        
        } while (!(/\w\w*@\w\w*\.(?=com|net|gov|org)/).test(email));
        do {
            credit = input.question("Enter a valid credit card number. >> ");
        
        } while (!(/\d\d\d\d \d\d\d\d \d\d\d\d \d\d\d\d/m).test(credit));

        console.log("\nYour email: " + email);
        console.log("Your credit card: " + credit);

        reenterInfo = input.question("\n Re-enter data? (y/n)\n>>");
        if (reenterInfo == "y") { this.start(); }
        else { this.turnOn(); }
    }

    this.load = function () {
        choose = input.question("\nWhat game would you like to play? ");
        if (choose == "Lost Fortune") {
            var newGame = new game.Game("Lost Fortune");
            newGame.play();
        }
        else { console.log("Sorry, that's not a game.\n Maybe buy a PS-4 if you wanna play " + choose); }
    }
}
