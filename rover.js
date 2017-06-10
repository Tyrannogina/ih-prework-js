var myRover = {
  position: [0, 0],
  direction: 'E'
};

var myCommands = "bbbbbbbbbbbbbbb";

var cardinalPoints = ['N', 'E', 'S', 'W'];

//TODO add obstacles!
function iniGrid() {
  var planetaryGrid = new Array(10);
  for (var i = 0; i < 10; i++) {
    planetaryGrid[i] = new Array(10);
  }
}

function iniRover(rover, coordY, coordX, direction) {
  rover.position[0] = getValidCoordinate(coordY);
  rover.position[1] = getValidCoordinate(coordX);
  rover.direction = direction;
}

function getValidCoordinate(coord) {
  coord = coord % 10;
  if (coord < 0) {
    return 10 + coord;
  }
  return coord;
}

function goForward(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[0]++;
      break;
    case 'E':
      rover.position[1]++;
      break;
    case 'S':
      rover.position[0]--;
      break;
    case 'W':
      rover.position[1]--;
      break;
  }
  stayInsidePlanet(rover);
  console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
}

function goBackwards(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[0]--;
      break;
    case 'E':
      rover.position[1]--;
      break;
    case 'S':
      rover.position[0]++;
      break;
    case 'W':
      rover.position[1]++;
      break;
  }
  stayInsidePlanet(rover);
  console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
}

function rotateCounterclockwise(rover) {
  var currentCardinalPoint = cardinalPoints.indexOf(rover.direction);
  if (currentCardinalPoint - 1 < 0) {
    rover.direction = cardinalPoints[cardinalPoints.length - 1];
  } else {
    rover.direction = cardinalPoints[currentCardinalPoint - 1];
  }
  console.log("New Rover Direction: " + rover.direction);
}

function rotateClockwise(rover) {
  var currentCardinalPoint = cardinalPoints.indexOf(rover.direction);
  if (currentCardinalPoint + 1 > cardinalPoints.length - 1) {
    rover.direction = cardinalPoints[0];
  } else {
    rover.direction = cardinalPoints[currentCardinalPoint + 1];
  }
  console.log("New Rover Direction: " + rover.direction);
}

function stayInsidePlanet(rover) {
  rover.position[0] = getValidCoordinate(rover.position[0]);
  rover.position[1] = getValidCoordinate(rover.position[1]);
}
/**
(string) instructions: will contain a series of instructions for the Rover:
  f: forward
  b: backwards
  l: rotate counterclockwise
  r: rotate clockwise
*/
function executeCommands(commands, rover) {
  commands = cleanString(commands);
  console.log("Executing commands:" + commands);
  console.log("Rover starting at: [" + rover.position[0] + ", " + rover.position[1] + "] facing " + rover.direction);
  for (var i = 0; i < commands.length; i++) {
    switch (commands[i]) {
      case 'f':
        goForward(rover);
        break;
      case 'b':
        goBackwards(rover);
        break;
      case 'r':
        rotateClockwise(rover);
        break;
      case 'l':
        rotateCounterclockwise(rover);
        break;
      default:
        console.log(commands[i] + " is not a valid command.");
    }
  }
}

/* returns string without spaces and in lowercase */
function cleanString(str) {
  str = str.replace(/\s+/g, '');
  str = str.toLowerCase();
  return str;
}
executeCommands(myCommands, myRover);
