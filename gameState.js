let gameState = {}

const getState = () => gameState
const setState = state => (gameState = state)

module.exports = {
  getState,
  setState
}
