var express = require('express')
var router  = express.Router();

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game
  console.log(req.body)
  // Response data
  var data = {
    color: "#1BADE1",
    name: "Sheltered-Island",
    head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
    taunt: "I'm gonna eat ya!", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move
  console.log(req.body)
  let move = findFood(req.body)
  // Response data
  var data = {
    move: move, // one of: ['up','down','left','right']
    taunt: 'Outta my way, lunch! ', // optional, but encouraged!
  }

  return res.json(data)
})
function getMySnake(gameState){
  return getSnake(gameState,gameState.you)
}
function getSnake(gameState, id){
  let snake = gameState.snakes.find(snake => snake.id === id );
  return snake;
}

function getOtherSnakeCoords(gameState) {
  let coords = [];

  // console.log(`gameState.snakes.find(snake => snake.id !== gameState.you ):
  // ${JSON.stringify(gameState.snakes.filter(snake => snake.id !== gameState.you ))}`);

  gameState.snakes.filter(snake => snake.id !== gameState.you ).forEach(s => {
    console.log(`s: ${JSON.stringify(s.coords)}`);
    coords = coords.concat(s.coords);
  });
  console.log(`coords: ${JSON.stringify(coords)}`);
  return coords;
}

function findFood(gameState) {
  let mySnake = getMySnake(gameState);

  let head = mySnake.coords[0];
  let isSafe = false;
  let tries = [];


  let nextMove = getNextMove(gameState.food, head);
  tries.push(nextMove);

  console.log(`mySnake.coords: ${JSON.stringify(mySnake.coords)}`);
  console.log(`nextMove: ${nextMove}`);
  console.log( `mySnake.coords.length: ${mySnake.coords.length}`);
  let tail = mySnake.coords[mySnake.coords.length - 1];
  console.log( `tail: ${JSON.stringify(tail)}`);

  // if (isSafeMove(mySnake.coords, nextMove, gameState)) {
  //   return nextMove;
  // } else if (nextMove === "up") {
  //   if (tail[0] <= head[0] && isSafeMove(mySnake.coords, "left", gameState)) {
  //     return "left";
  //   } else if (isSafeMove(mySnake.coords, "right", gameState)) {
  //     return "right";
  //   } else {
  //     return "down";
  //   }
  // } else if (nextMove === "down") {
  //   if (tail[0] <= head[0] && isSafeMove(mySnake.coords, "left", gameState)) {
  //     return "left";
  //   } else if (isSafeMove(mySnake.coords, "right", gameState)) {
  //     return "right";
  //   } else {
  //     return "up";
  //   }
  // } else if (nextMove === "left") {
  //   if (tail[1] <= head[1] && isSafeMove(mySnake.coords, "up", gameState)) {
  //     return "up";
  //   } else if (isSafeMove(mySnake.coords, "down", gameState)) {
  //     return "down";
  //   } else {
  //     return "right";
  //   }
  // } else if (nextMove === "right") {
  //   if (tail[1] <= head[1] && isSafeMove(mySnake.coords, "up", gameState)) {
  //     return "up";
  //   } else if (isSafeMove(mySnake.coords, "down", gameState)) {
  //     return "down";
  //   } else {
  //     return "left";
  //   }
  // }





  if (isSafeMove(mySnake.coords, nextMove, gameState)) {
    return nextMove;
  } else if (isSafeMove(mySnake.coords, "left", gameState)) {
    return "left";
  } else if (isSafeMove(mySnake.coords, "right", gameState)) {
    return "right";
  } else if (isSafeMove(mySnake.coords, "up", gameState)) {
    return "up";
  } else if (isSafeMove(mySnake.coords, "down", gameState)) {
    return "down";
  } else if (isSafeMove(mySnake.coords, "right", gameState)) {
    return "right";
  } else if (isSafeMove(mySnake.coords, "left", gameState)) {
    return "left";
  } else if (isSafeMove(mySnake.coords, "down", gameState)) {
    return "down";
  } else if (isSafeMove(mySnake.coords, "up", gameState)) {
    return "up";
  } else if (isSafeMove(mySnake.coords, "left", gameState)) {
    return "left";
  } else if (isSafeMove(mySnake.coords, "right", gameState)) {
    return "right";
  } else if (isSafeMove(mySnake.coords, "up", gameState)) {
    return "up";
  } else if (isSafeMove(mySnake.coords, "down", gameState)) {
    return "down";
  } else if (isSafeMove(mySnake.coords, "right", gameState)) {
    return "right";
  } else if (isSafeMove(mySnake.coords, "left", gameState)) {
    return "left";
  } else if (isSafeMove(mySnake.coords, "down", gameState)) {
    return "down";
  } else if (isSafeMove(mySnake.coords, "up", gameState)) {
    return "up";
  } else {
    return nextMove;
  }
}

function getNextMove(food, head) {
  let foodToGet = food[getClosestFood(food, head)];
  if (foodToGet[0] < head[0]) {
    move = "left"
  }
  if (foodToGet[0] > head[0]) {
    move = "right"
  }
  if (foodToGet[1] < head[1]) {
    move = "up"
  }
  if (foodToGet[1] > head[1]) {
    move = "down"
  }
  return move;
}

function getClosestFood(food, head) {
  let foodNum = 0;
  let currMax = 99999999999;
  for (let i = 0; i < food.length; i++) {
    let currDist = getDist(food[i], head);
    if (currDist < currMax) {
      currMax = currDist;
      foodNum = i;
    }
  }
  return foodNum;
}

function getDist(coord1, coord2) {
  let result = (coord1[0]-coord2[0])*(coord1[0]-coord2[0]) + (coord1[1]-coord2[1])*coord1[1]-coord2[1];
  return result;
}


function isSafeMove(snakeCoords, move, gameState) {
  console.log('ENTERING isSafeMove');
  let head = snakeCoords[0];
  let nextMoveCoord = JSON.parse(JSON.stringify(head));
  let isSafe = true;

  console.log(`head: ${JSON.stringify(head)}`);


  if (move === "left") {
    nextMoveCoord[0] = head[0]-1;
  } else if (move === "right") {
    nextMoveCoord[0] = head[0]+1;
  } else if (move === "up") {
    nextMoveCoord[1] = head[1]-1;
  } else if (move === "down") {
    nextMoveCoord[1] = head[1]+1;
  }
  console.log(`snakeCoords: ${JSON.stringify(snakeCoords)}`);

  for (let i = 0; i < snakeCoords.length; i++) {
    console.log(`snakeCoords[i][0]: ${snakeCoords[i][0]} || nextMoveCoord[0] ${nextMoveCoord[0]}`);
    console.log(`snakeCoords[i][1]: ${snakeCoords[i][1]} || nextMoveCoord[1] ${nextMoveCoord[1]}`);

    if (snakeCoords[i][0] == nextMoveCoord[0] && snakeCoords[i][1] == nextMoveCoord[1]) {
      isSafe = false;
    }
    if (willHitEdge(nextMoveCoord, gameState)) {
      isSafe = false;
    }

    // console.log(`getOtherSnakeCoords(gameState): ${JSON.stringify(getOtherSnakeCoords(gameState))}`);
    console.log(`isSafe: ${isSafe}`);
  };

  let otherSnakeCoords = getOtherSnakeCoords(gameState);
  for (let i = 0; i < otherSnakeCoords.length; i++) {
    if (otherSnakeCoords[i][0] == nextMoveCoord[0] && otherSnakeCoords[i][1] == nextMoveCoord[1]) {
      isSafe = false;
    }
  }

  return isSafe;

}

function willHitEdge(coord, gameState) {
  if (coord[0] < 0 || coord[1] < 0) {
    return true;
  }
  if (coord[0] >= gameState.width || coord[1] >= gameState.height) {
    return true;
  }

  return false;
}

module.exports = router
