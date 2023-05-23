const input = require('readline-sync');

const inventory = require('./inventory');
const game = require('./game');
const cons = require("./console");

//var gameConsole = new cons.GameConsole();
//gameConsole.start();

var newGame = new game.Game("Lost Fortune");
newGame.play();
