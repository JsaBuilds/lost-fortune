// Room class

class Room {
    constructor(id, desc, opt1, opt2, opt3, opt4) {
        this.id = id
        this.desc = desc
        this.opt1 = opt1
        this.opt2 = opt2
        this.opt3 = opt3
        this.opt4 = opt4
    }
};

// Rooms in the game:

// (0)
const crashsite = new Room("r.ccite", 
        "The woods in front of you and\nthe ship behind you, your journey begins.",
        ["Go deeper into woods.", "r.wood1"], ["Go through the swamp.", "r.swamp1"], ["Fight Zortax Eevorp.", "d.eevorp"], ["Head out into plains.", "r.plain1"]);

// (0.1) Deeper into woods:
const wood_entrance = new Room("r.wood1", 
        "You and your troops trek deeper into the woods, further from"+
        "\nthe crash site. You come to a fork in the road.",
        ["Go left.", "r.hollow1"], ["Go right.", "r.cave1"], ["", ""], ["", ""]);

// (0.2) through swamp:
const swamp_entrance = new Room("r.swamp1",
        "Rubbery sludge seeps into your boot and soaks into your socks.",
        ["", ""], ["", ""], ["", ""], ["", ""])

// (0.3) fight:
const fight_death = new Room("d.eevorp",
        "You and your troops go back out and put up a fight against the Zortax Eevorp,"+
        "\nwho have come to collect your ship for scrap. Unfortunately, they have the"+
        "\nbetter weapons and large numbers. You were overwhelmed and destroyed.",
        ["", ""], ["", ""], ["", ""], ["", ""]);

// (0.4) into Plains:
const plains_entrance = new Room("r.plain1",
        "You and the troops turn east\nand head for the plains instead\nof the forest.",
        ["Go West.", ""], ["Go South.", ""], ["Return to the forest.", "r.wood1"], ["", ""]);

// (0.1.1) Go left:
const wood_cave = new Room("r.cave1",
        "You go right. You walk for a long time."+
        "\nThe light coming through the leaves darkens, and a fog"+
        "\nbegins to develop. Ahead a large cave entrance yawns.",
        ["", ""], ["", ""], ["", ""], ["", ""]);
        
// (0.1.2) Go right:
const wood_hollow = new Room("r.hollow1",
        "You go left. Presently you come to a narrow hollow."+
        "\nThe trees on both sides lean over to form a roof, and"+
        "\na large rock in similar shape to a compass needle sits"+
        "\non the side of the hill, pointing off at an angle into."+
        "\nthe hollow", 
        ["Enter the hollow.", ""], ["Walk around the hollow.", ""], ["Walk straight through.", ""], ["Go back.", ""]);

// (0.1.2) Go right:


var roomlist = [crashsite, wood_entrance, swamp_entrance, fight_death, plains_entrance, wood_cave, wood_hollow];

exports.crashsite = crashsite;
exports.wood_entrance = wood_entrance;
exports.swamp_entrance = swamp_entrance;
exports.fight_death = fight_death;
exports.plains_entrance = plains_entrance;
exports.wood_cave = wood_cave;
exports.wood_hollow = wood_hollow;
exports.roomlist = roomlist;
