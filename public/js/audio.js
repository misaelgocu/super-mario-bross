const INIT_AUDIOS = [
  {
    key: 'gameover',
    path: './public/assets/sound/music/gameover.mp3'
  },
  {
    key: 'goomba-stomp',
    path: './public/assets/sound/effects/goomba-stomp.wav'
  },
  {
    key: 'coin-pickup',
    path: './public/assets/sound/effects/coin.mp3'
  },
  {
    key: 'powerup',
    path: './public/assets/sound/effects/consume-powerup.mp3'
  },
  {
    key: 'block-bump',
    path: './public/assets/sound/effects/block-bump.wav'
  },
  {
    key: 'break-block',
    path: './public/assets/sound/effects/break-block.wav'
  },
  {
    key: 'powerup-appears',
    path: './public/assets/sound/effects/powerup-appears.mp3'
  }
]

export const initAudio = ({ load }) => {
  INIT_AUDIOS.forEach(({ key, path }) => {
    load.audio(key, path)
  })
}

export const playAudio = (id, { sound }, { volume = 1 } = {}) => {
  try {
    return sound.add(id, { volume }).play()
  } catch (e) {
    console.error(e)
  }
}