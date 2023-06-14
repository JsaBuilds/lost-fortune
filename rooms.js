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
        "The woods in front of you and the ship behind you, your"+
        "journey begins.",
        ["Go deeper into woods.", "r.wood1"], ["Go through the swamp.", "r.swamp1"], ["Fight Zortax Eevorp.", "d.eevorp"], ["Head out into plains.", "r.plain1"]);

// (0.1) Deeper into woods:
const wood_entrance = new Room("r.wood1", 
        "You trek deeper into the woods, further from the crash site."+
        "\nAn overgrown footpath heads left, whilst all else seems un-"+
        "\ntamed wilderness.",
        ["Go left.", "r.hollow1"], ["Go right.", "r.cave1"], ["Go forward", "r.wood2"], ["", ""]);

// (0.2) through swamp:
const swamp_entrance = new Room("r.swamp1",
        "Rubbery sludge seeps into your boot and soaks into your socks.",
        ["", ""], ["", ""], ["", ""], ["", ""])

// (0.3) fight:
const fight_death = new Room("d.eevorp",
        "You go back out and put up a fight against the Zortax Eevorp, who have"+
        "\n come to collect your ship for scrap. Unfortunately, they have the"+
        "\nbetter weapons and large numbers. You were overwhelmed and destroyed...",
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
        ["Enter the hollow.", "r.hollow3"], ["Walk around the hollow.", "r.hollow2"], ["", ""], ["", ""]);

// (0.1.2) Go right:


var roomlist = [crashsite, wood_entrance, swamp_entrance, fight_death, plains_entrance, wood_cave, wood_hollow,

new Room("r.wood2",
        "The trees are so thick that the light is almost com-"+
        "\npletely blocked out. The ground gets rockier, indi-"+
        "\ncating a mountain is up ahead.",
        ["Go left", "d.woodmonster1"], ["Go right", "d.woodmonster2"], ["Climb up the mountain", "r.wood3"], ["", ""]),

new Room("d.woodmonster1",
        "As you get into the darker portions of the wood, strange"+
        "\nanimal sounds echo from the bushes. A sharp pain pierces"+
        "\nthrough your back to your chest, and you fall to the"+
        "\nground. A large toothy mouth plunges into your vision...",
        ["", ""], ["", ""], ["", ""], ["", ""]),

new Room("d.woodmonster2",
        "A large troll-like creature leaps out of the shrubbery"+
        "\nand swings a rock at you. The club strikes your head,"+
        "\nknocking you senseless. The creature raises his weapon"+
        "\nfor one last strike...",
        ["", ""], ["", ""], ["", ""], ["", ""]),

new Room("r.wood3",
        "You made it to the top of the mountain. The forest blankets"+
        "\nthe land for miles, only interrupted by a vast desert plane"+
        "\nin one direction and a small bog in the other.",
        ["Climb down", "d.fallmountain"], ["", ""], ["", ""], ["", ""]),

new Room("d.fallmountain",
        "Making it down the mountain is tricky. A rock slips out"+
        "\nfrom under your foot, and you find yourself falling through"+
        "\nempty space, faster and faster, until...",
        ["", ""], ["", ""], ["", ""], ["", ""]),

new Room("r.hollow2",
        "You walk along the edge of the ditch. Soon you come to a"+
        "\nplace where a large tree has fallen across the ditch."+
        "\nThere is a dirt pathway on your side of the ditch.",
        ["Cross the log", "??"], ["Follow the path", "r.cabin1"], ["Leave the path", "r.hollow4"], ["", ""]),

new Room("r.hollow4",
        "In an area where the trees thin out into a light pine grove"+
        "\nyou find a large pit. There are no trees around it, and it"+
        "\nlooks to be man-made, given it is a perfect circle.",
        ["Ignore the pit", "d.woodmonster1"], ["Inspect the pit", "d.pitmonster"], ["", ""], ["", ""]),

new Room("d.pitmonster",
        "You approach the pit. A serrated tentacle shoots up from the"+
        "\ndark and latches painfully onto you, then drags you down into"+
        "\nthe eternal darkness...",
        ["", ""], ["", ""], ["", ""], ["", ""]),

new Room("r.hollow3",
        "There is a pool of water hewn out of the steep stone hillside."+
        "\nyou cannot see the bottom, and it is black when you look down"+
        "\ninto it. ",
        ["Go past it.", "r.wood2"], ["Wade in for metal", "d.watermonster"], ["Go back", "r.hollow1"], ["", ""]),

new Room("d.watermonster",
        "Getting into the pool, you can feel no bottom, so you tread"+
        "\nwater. Suddenly, something snags your foot and you are pulled"+
        "\nquickly under. Sharp claws dig into your chest...",
        ["", ""], ["", ""], ["", ""], ["", ""]),

new Room("r.cabin1",
        "At the end of the path, partially hidden by several large oaks,"+
        "\nsits a quaint little cabin. It is dilapidated and seems unin-"+
        "\nhabited, by the looks of the mossy door and sagging windows.",
        ["Enter the cabin", "r.cabin2"], ["Pass by", "r.hollow5"], ["", ""], ["", ""]),

new Room("r.hollow5",
        "A deep fog rolls in not long after leaving the cabin site. The trees"+
        "\nof the forest vanish from around you, reappearing not three feet in"+
        "\nfront of your face. You can still remember the cabin's location.",
        ["Keep going", "d.fallhollow"], ["Return to cabin", "r.cabin2"], ["", ""], ["", ""]),

new Room("d.fallhollow",
        "Suddenly, your feet give way to nothing. You fall into the hollow, hit-"+
        "\nting your head on a rock and paralyzing yourself. Slowly you drift into"+
        "\nunconciousness...",
        ["", ""], ["", ""], ["", ""], ["", ""]),

new Room("r.cabin2",
        "Inside the cabin it is dusty and cobweb-draped. An old bookshelf has col-"+
        "\nlapsed in the far right corner of the room. On the left-hand side by the"+
        "\nwindow sits a wooden workbench; the photograph on the wall is unrecognizable.",
        ["Go out the front door", "d.doortrap"], ["Go out the back door", "r.plain1"], ["Go into the cellar", "r.cabin3"], ["", ""]),

]


exports.crashsite = crashsite;
exports.wood_entrance = wood_entrance;
exports.swamp_entrance = swamp_entrance;
exports.fight_death = fight_death;
exports.plains_entrance = plains_entrance;
exports.wood_cave = wood_cave;
exports.wood_hollow = wood_hollow;
exports.roomlist = roomlist;
