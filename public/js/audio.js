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
  },
  {
    key: 'kick',
    path: './public/assets/sound/effects/kick.mp3'
  },
  {
    key: 'fireball',
    path: './public/assets/sound/effects/fireball.mp3'
  },
  {
    key: 'powerdown',
    path: './public/assets/sound/effects/powerdown.mp3'
  },
  {
    key: 'theme',
    path: './public/assets/sound/music/overworld/theme.mp3'
  },
  {
    key: 'hurry-theme',
    path: './public/assets/sound/music/overworld/hurry-up-theme.mp3'
  },
  {
    key: 'win-music',
    path: './public/assets/sound/music/win.wav'
  },
  {
    key: 'time-warning',
    path: './public/assets/sound/effects/time-warning.mp3'
  },
  {
    key: 'underground-theme',
    path: './public/assets/sound/music/underground/theme.mp3'
  },
  {
    key: 'underground-hurry',
    path: './public/assets/sound/music/underground/hurry-up-theme.mp3'
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

export const playMusic = (id, game, { volume = 0.1, loop = true } = {}) => {
  try {
    if (game.bgMusic) {
      game.bgMusic.stop()
    }
    game.bgMusic = game.sound.add(id, { volume, loop })
    game.bgMusic.play()
    return game.bgMusic
  } catch (e) {
    console.error(e)
  }
}