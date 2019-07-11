const udlr = ([x1, y1], [x2, y2]) => {
  const xdiff = x2 - x1
  const ydiff = y2 - y1

  if (ydiff === 0) {
    return xdiff > 0 ? 'right' : 'left'
  }

  if (xdiff === 0) {
    return ydiff > 0 ? 'down' : 'up'
  }
}

const manhattan = ([x1, y1], [x2, y2]) => Math.abs(x2 - x1) + Math.abs(y2 - y1)

const search = (source, target, grid) => {
  const finder = new PF.AStarFinder()

  const path = finder.findPath(source[0], source[1], target[0], target[1], grid)

  // console.log('PATH', path)

  const next = path[1]

  return next
}

const PF = require('pathfinding')

const moveFn = (req, res) => {
  const { height, width, snakes, you, food } = req.body

  const grid = new PF.Grid(height, width)

  const me = snakes.find(snake => snake.id === you)
  const myHead = me.coords[0]

  const enemies = snakes.filter(snake => snake.id !== you)

  snakes
    .reduce((coords, snake) => coords.concat(snake.coords), [])
    .map(([x, y]) => {
      grid.setWalkableAt(x, y, false)
    })

  let move
  let taunt

  const closestFood = food[0]

  if (closestFood) {
    console.log('FOOD', myHead, closestFood)

    const next = search(myHead, closestFood, grid)

    console.log('FOOD', next)

    move = udlr(myHead, next)
    taunt = 'NOM NOMS'
  } else {
    const sortedEnemies = enemies.sort((a, b) => {
      const aHead = a.coords[0]
      const bHead = b.coords[0]
      return manhattan(myHead, aHead) - manhattan(myHead, bHead)
    })
    const target = sortedEnemies[0].coords[0]

    const dist = manhattan(myHead, target)

    if (dist < 3) {
      const myTail = me.coords[me.coords.length - 1]
      grid.setWalkableAt(myTail[0], myTail[1], true)

      console.log('TAIL', myHead, myTail)

      const next = search(myHead, myTail, grid)

      console.log('TAIL', next)

      move = udlr(myHead, next)
      taunt = 'CHASE MY TAIL'
    } else {
      grid.setWalkableAt(target[0], target[1], true)

      console.log('TARGET', myHead, target)

      const next = search(myHead, target, grid)

      console.log('TARGET', next)

      move = udlr(myHead, next)
      taunt = `COMING FOR U ${sortedEnemies[0].name}`
    }
  }

  var data = {
    move,
    taunt
  }

  console.log('-----')

  return res.json(data)
}

module.exports = moveFn
