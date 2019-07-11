const log = require('../log')
const state = require('../gameState')

const start = (req, res) => {
  log(req.body)

  var data = {
    color: '#FF1493',
    name: 'KamizakeEeEeEEeEeEeE',
    head_url:
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/LB/en/999/EP4507-NPEB02124_00-AVVIRTUALB000006/1550719022000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000',
    // taunt: '💖💓💖',
    taunt: 'love ya',
    head_type: 'smile',
    tail_type: 'curled'
  }

  state.setState(req.body)

  log({ state: state.getState() })

  return res.json(data)
}

module.exports = start
