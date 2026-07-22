import { createAnimations } from './animations.js'
import { initAudio, playAudio } from './audio.js'
import { checkControls } from './controls.js'
import { initSpritesheet } from './spritesheet.js'
import { initMobileControls } from './mobileControls.js'

const LEVEL_CONFIG = {
  floor: [0, 128, 256, 384, 512, 640, 800, 928, 1056, 1184, 1312, 1440, 1600, 1728, 1856, 1984], 
  pipes: [
    { x: 340, type: 'small' },
    { x: 520, type: 'medium' },
    { x: 700, type: 'large' },
    { x: 980, type: 'medium' },
    { x: 1300, type: 'small' }
  ],
  scenery: [
    { x: 50, y: 198, key: 'mountain1' },
    { x: 600, y: 164, key: 'mountain2' },
    { x: 1200, y: 198, key: 'mountain1' },
    { x: 1650, y: 164, key: 'mountain2' },
    { x: 100, y: 50, key: 'cloud1', scale: 0.15 },
    { x: 400, y: 40, key: 'cloud2', scale: 0.15 },
    { x: 800, y: 50, key: 'cloud1', scale: 0.15 },
    { x: 1100, y: 40, key: 'cloud2', scale: 0.15 },
    { x: 1450, y: 50, key: 'cloud1', scale: 0.15 },
    { x: 1800, y: 40, key: 'cloud2', scale: 0.15 },
    { x: 180, y: 205, key: 'bush1', scale: 0.5 },
    { x: 850, y: 205, key: 'bush2', scale: 0.5 },
    { x: 1350, y: 205, key: 'bush1', scale: 0.5 }
  ],
  misteryBlocks: [
    { x: 180, y: 140, item: 'coin' },
    { x: 230, y: 140, item: 'supermushroom' },
    { x: 280, y: 140, item: 'coin' },
    { x: 640, y: 140, item: 'coin' },
    { x: 880, y: 140, item: 'supermushroom' },
    { x: 910, y: 140, item: 'coin' },
    { x: 1150, y: 100, item: 'coin' },
    { x: 1400, y: 140, item: 'coin' }
  ],
  bricks: [
    { x: 200, y: 140 },
    { x: 215, y: 140 },
    { x: 245, y: 140 },
    { x: 260, y: 140 },
    { x: 620, y: 140 },
    { x: 660, y: 140 },
    { x: 865, y: 140 },
    { x: 895, y: 140 },
    { x: 925, y: 140 },
    { x: 1135, y: 100 },
    { x: 1165, y: 100 },
    { x: 1385, y: 140 },
    { x: 1415, y: 140 }
  ],
  goombas: [
    { x: 140 },
    { x: 450 },
    { x: 820 },
    { x: 1050 },
    { x: 1250 },
    { x: 1480 }
  ],
  koopas: [
    { x: 290 },
    { x: 600 },
    { x: 940 },
    { x: 1350 }
  ],
  flagpole: { x: 1750 },
  castle: { x: 1850 }
}

const config = {
  autoFocus: false,
  type: Phaser.AUTO, // webgl, canvas
  width: 256,
  height: 244,
  backgroundColor: '#049cd8',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false // Cambiar a false en producción
    }
  },
  scene: {
    preload, // se ejecuta para precargar recursos
    create, // se ejecuta cuando el juego comienza
    update // se ejecuta en cada frame
  }
}

// Inicializar controles móviles antes de crear el juego
initMobileControls()

new Phaser.Game(config)
// this -> game -> el juego que estamos construyendo

function preload () {
  this.load.image(
    'cloud1',
    './public/assets/scenery/overworld/cloud1.png'
  )

  this.load.image(
    'cloud2',
    './public/assets/scenery/overworld/cloud2.png'
  )

  this.load.image(
    'floorbricks',
    './public/assets/scenery/overworld/floorbricks.png'
  )

  this.load.image(
    'supermushroom',
    './public/assets/collectibles/super-mushroom.png'
  )

  this.load.image(
    'vertical-small-tube',
    './public/assets/scenery/vertical-small-tube.png'
  )

  this.load.image(
    'vertical-medium-tube',
    './public/assets/scenery/vertical-medium-tube.png'
  )

  this.load.image(
    'vertical-large-tube',
    './public/assets/scenery/vertical-large-tube.png'
  )

  this.load.image(
    'castle',
    './public/assets/scenery/castle.png'
  )

  this.load.image(
    'flag-mast',
    './public/assets/scenery/flag-mast.png'
  )

  this.load.image(
    'final-flag',
    './public/assets/scenery/final-flag.png'
  )

  this.load.image(
    'mountain1',
    './public/assets/scenery/overworld/mountain1.png'
  )

  this.load.image(
    'mountain2',
    './public/assets/scenery/overworld/mountain2.png'
  )

  this.load.image(
    'bush1',
    './public/assets/scenery/overworld/bush1.png'
  )

  this.load.image(
    'bush2',
    './public/assets/scenery/overworld/bush2.png'
  )

  initSpritesheet(this)
  initAudio(this)
} // 1.

function create () {
  createAnimations(this)

  // Generar decoraciones de fondo
  LEVEL_CONFIG.scenery.forEach(item => {
    const scale = item.scale || 1
    this.add.image(item.x, item.y, item.key)
      .setOrigin(0, 0)
      .setScale(scale)
  })

  // Generar suelo físico
  this.floor = this.physics.add.staticGroup()
  LEVEL_CONFIG.floor.forEach(x => {
    this.floor
      .create(x, config.height - 16, 'floorbricks')
      .setOrigin(0, 0.5)
      .refreshBody()
  })

  // Generar tuberías
  this.pipes = this.physics.add.staticGroup()
  LEVEL_CONFIG.pipes.forEach(pipe => {
    let key = 'vertical-small-tube'
    if (pipe.type === 'medium') {
      key = 'vertical-medium-tube'
    } else if (pipe.type === 'large') {
      key = 'vertical-large-tube'
    }
    this.pipes.create(pipe.x, config.height - 16, key)
      .setOrigin(0.5, 1)
      .refreshBody()
  })

  // Generar Castillo y Asta de la Bandera
  this.add.image(LEVEL_CONFIG.castle.x, config.height - 16 - 80, 'castle')
    .setOrigin(0, 0)

  this.flagpole = this.physics.add.staticGroup()
  this.flagpole.create(LEVEL_CONFIG.flagpole.x, config.height - 16, 'flag-mast')
    .setOrigin(0.5, 1)
    .refreshBody()

  this.flag = this.add.sprite(LEVEL_CONFIG.flagpole.x - 8, config.height - 16 - 150, 'final-flag')
    .setOrigin(0.5, 0)

  // Instanciar Mario
  this.mario = this.physics.add.sprite(50, 100, 'mario')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(300)

  // Generar coleccionables sueltos
  this.collectibes = this.physics.add.staticGroup()
  this.collectibes.create(150, 150, 'coin').anims.play('coin-idle', true)
  this.collectibes.create(300, 150, 'coin').anims.play('coin-idle', true)
  this.collectibes.create(200, config.height - 40, 'supermushroom').anims.play('supermushroom-idle', true)
  this.physics.add.overlap(this.mario, this.collectibes, collectItem, null, this)

  // Generar bloques misteriosos
  this.misteryBlocks = this.physics.add.staticGroup()
  LEVEL_CONFIG.misteryBlocks.forEach(blockData => {
    const mb = this.misteryBlocks.create(blockData.x, blockData.y, 'misteryBlock')
    mb.setData('item', blockData.item)
    mb.anims.play('mistery-block-flash', true)
  })

  // Generar ladrillos destructibles
  this.bricks = this.physics.add.staticGroup()
  LEVEL_CONFIG.bricks.forEach(brickData => {
    this.bricks.create(brickData.x, brickData.y, 'block')
  })

  // Instanciar Goombas
  this.goombas = this.physics.add.group()
  LEVEL_CONFIG.goombas.forEach(goombaData => {
    const goomba = this.goombas.create(goombaData.x, config.height - 30, 'goomba')
      .setOrigin(0, 1)
      .setGravityY(300)
      .setVelocityX(-50)
    goomba.anims.play('goomba-walk', true)
  })

  // Instanciar Koopas
  this.koopas = this.physics.add.group()
  LEVEL_CONFIG.koopas.forEach(koopaData => {
    const koopa = this.koopas.create(koopaData.x, config.height - 30, 'koopa')
      .setOrigin(0.5, 1)
      .setGravityY(300)
      .setVelocityX(-40)
    koopa.anims.play('koopa-walk', true)
  })

  this.shells = this.physics.add.group()

  // Configuración de límites y físicas
  this.physics.world.setBounds(0, 0, 2000, config.height)

  // Colisiones de Mario
  this.physics.add.collider(this.mario, this.floor)
  this.physics.add.collider(this.mario, this.pipes)
  this.physics.add.collider(this.mario, this.goombas, onHitEnemy, null, this)
  this.physics.add.collider(this.mario, this.koopas, onHitKoopa, null, this)
  this.physics.add.collider(this.mario, this.shells, onHitShell, null, this)
  this.physics.add.collider(this.mario, this.misteryBlocks, handleBlockCollision, null, this)
  this.physics.add.collider(this.mario, this.bricks, handleBlockCollision, null, this)
  
  // Colisión de bandera de victoria
  this.physics.add.overlap(this.mario, this.flagpole, handleVictory, null, this)

  // Colisiones de Goombas
  this.physics.add.collider(this.goombas, this.floor)
  this.physics.add.collider(this.goombas, this.pipes)
  this.physics.add.collider(this.goombas, this.misteryBlocks)
  this.physics.add.collider(this.goombas, this.bricks)

  // Colisiones de Koopas
  this.physics.add.collider(this.koopas, this.floor)
  this.physics.add.collider(this.koopas, this.pipes)
  this.physics.add.collider(this.koopas, this.misteryBlocks)
  this.physics.add.collider(this.koopas, this.bricks)

  // Colisiones de Caparazones
  this.physics.add.collider(this.shells, this.floor)
  this.physics.add.collider(this.shells, this.pipes)
  this.physics.add.collider(this.shells, this.misteryBlocks)
  this.physics.add.collider(this.shells, this.bricks)
  
  // Interacciones del caparazón con enemigos
  this.physics.add.collider(this.shells, this.goombas, onShellHitEnemy, null, this)
  this.physics.add.collider(this.shells, this.koopas, onShellHitEnemy, null, this)

  // Colisión entre enemigos
  this.physics.add.collider(this.goombas, this.koopas, (goomba, koopa) => {
    goomba.setVelocityX(-goomba.body.velocity.x)
    koopa.setVelocityX(-koopa.body.velocity.x)
  })

  // Configuración de cámara
  this.cameras.main.setBounds(0, 0, 2000, config.height)
  this.cameras.main.startFollow(this.mario)

  this.keys = this.input.keyboard.createCursorKeys()
}

function collectItem (mario, item) {
  const { texture: { key } } = item
  item.destroy()

  if (key === 'coin') {
    playAudio('coin-pickup', this, { volume: 0.1 })
    addToScore(100, item, this)
  } else if (key === 'supermushroom') {
    this.physics.world.pause()
    this.anims.pauseAll()

    playAudio('powerup', this, { volume: 0.1 })

    let i = 0
    const interval = setInterval(() => {
      i++
      mario.anims.play(i % 2 === 0
        ? 'mario-grown-idle'
        : 'mario-idle'
      )
    }, 100)

    mario.isBlocked = true
    mario.isGrown = true

    setTimeout(() => {
      mario.setDisplaySize(18, 32)
      mario.body.setSize(18, 32)

      this.anims.resumeAll()
      mario.isBlocked = false
      clearInterval(interval)
      this.physics.world.resume()
    }, 1000)
  }
}

function addToScore (scoreToAdd, origin, game) {
  const scoreText = game.add.text(
    origin.x,
    origin.y,
    scoreToAdd,
    {
      fontFamily: 'pixel',
      fontSize: config.width / 40
    }
  )

  game.tweens.add({
    targets: scoreText,
    duration: 500,
    y: scoreText.y - 20,
    onComplete: () => {
      game.tweens.add({
        targets: scoreText,
        duration: 100,
        alpha: 0,
        onComplete: () => {
          scoreText.destroy()
        }
      })
    }
  })
}

function onHitEnemy (mario, enemy) {
  if (mario.body.touching.down && enemy.body.touching.up) {
    enemy.anims.play('goomba-hurt', true)
    enemy.setVelocityX(0)
    mario.setVelocityY(-200)

    playAudio('goomba-stomp', this)
    addToScore(200, mario, this)

    setTimeout(() => {
      enemy.destroy()
    }, 500)
  } else {
    killMario(this)
  }
}

function update () { // 3. continuamente
  const { mario } = this

  checkControls(this)

  // check if mario is dead
  if (mario.y >= config.height) {
    killMario(this)
  }

  // Patrulla e IA de los Goombas
  this.goombas.children.iterate(goomba => {
    if (goomba && goomba.active) {
      if (goomba.y >= config.height) {
        goomba.destroy()
      } else if (goomba.body.blocked.left || goomba.body.blocked.right) {
        goomba.setVelocityX(-goomba.body.velocity.x)
        goomba.flipX = goomba.body.velocity.x > 0
      }
    }
  })

  // Patrulla e IA de los Koopas
  this.koopas.children.iterate(koopa => {
    if (koopa && koopa.active) {
      if (koopa.y >= config.height) {
        koopa.destroy()
      } else {
        if (koopa.body.blocked.left || koopa.body.blocked.right) {
          koopa.setVelocityX(-koopa.body.velocity.x)
        }
        koopa.flipX = koopa.body.velocity.x > 0
      }
    }
  })

  // Rebotes e IA de los Caparazones deslizantes
  this.shells.children.iterate(shell => {
    if (shell && shell.active) {
      if (shell.y >= config.height) {
        shell.destroy()
      } else if (shell.body.velocity.x !== 0) {
        if (shell.body.blocked.left || shell.body.blocked.right) {
          shell.setVelocityX(-shell.body.velocity.x)
          playAudio('block-bump', this)
        }
      }
    }
  })
}

function killMario (game) {
  const { mario, scene } = game

  if (mario.isDead) return

  mario.isDead = true
  mario.anims.play('mario-dead')
  mario.setCollideWorldBounds(false)

  playAudio('gameover', game, { volume: 0.05 })

  mario.body.checkCollision.none = true
  mario.setVelocityX(0)

  setTimeout(() => {
    mario.setVelocityY(-250)
  }, 100)

  setTimeout(() => {
    scene.restart()
  }, 2000)
}

function handleBlockCollision (mario, block) {
  if (mario.body.touching.up && block.body.touching.down) {
    const key = block.texture.key

    if (key === 'misteryBlock') {
      const hasBeenHit = block.getData('hit')
      if (!hasBeenHit) {
        block.setData('hit', true)
        block.anims.stop()
        block.setTexture('emptyBlock')

        playAudio('block-bump', this)

        // Rebote del bloque
        this.tweens.add({
          targets: block,
          y: block.y - 8,
          duration: 100,
          yoyo: true,
          onComplete: () => {
            const itemType = block.getData('item')

            if (itemType === 'coin') {
              playAudio('coin-pickup', this, { volume: 0.1 })

              const coin = this.add.sprite(block.x, block.y - 16, 'coin')
              coin.anims.play('coin-idle', true)

              this.tweens.add({
                targets: coin,
                y: coin.y - 32,
                duration: 250,
                yoyo: true,
                onComplete: () => {
                  coin.destroy()
                  addToScore(100, block, this)
                }
              })
            } else if (itemType === 'supermushroom') {
              playAudio('powerup-appears', this, { volume: 0.1 })

              const mushroom = this.physics.add.sprite(block.x, block.y, 'supermushroom')
              mushroom.setOrigin(0.5, 0.5)
              mushroom.body.setAllowGravity(false)

              this.tweens.add({
                targets: mushroom,
                y: block.y - 16,
                duration: 500,
                onComplete: () => {
                  mushroom.body.setAllowGravity(true)
                  mushroom.setGravityY(300)
                  mushroom.setVelocityX(50)
                  mushroom.setCollideWorldBounds(true)

                  const collideBlock = (mush, b) => {
                    if (mush.body.touching.left || mush.body.touching.right) {
                      mush.setVelocityX(-mush.body.velocity.x)
                    }
                  }

                  this.physics.add.collider(mushroom, this.floor, collideBlock)
                  this.physics.add.collider(mushroom, this.pipes, collideBlock)
                  this.physics.add.collider(mushroom, this.misteryBlocks, collideBlock)
                  this.physics.add.collider(mushroom, this.bricks, collideBlock)
                  this.physics.add.overlap(this.mario, mushroom, collectItem, null, this)
                }
              })
            }
          }
        })
      } else {
        playAudio('block-bump', this)
      }
    } else if (key === 'block') {
      if (mario.isGrown) {
        playAudio('break-block', this)

        for (let i = 0; i < 4; i++) {
          const debris = this.physics.add.sprite(block.x, block.y, 'brick-debris')
          debris.setFrame(i)
          debris.setVelocityX((i % 2 === 0 ? -1 : 1) * (30 + Math.random() * 40))
          debris.setVelocityY(-150 - Math.random() * 50)
          debris.setGravityY(400)

          this.time.delayedCall(1000, () => debris.destroy())
        }

        block.destroy()
        addToScore(50, block, this)
      } else {
        playAudio('block-bump', this)
        this.tweens.add({
          targets: block,
          y: block.y - 4,
          duration: 100,
          yoyo: true
        })
      }
    }
  }
}

function onHitKoopa (mario, koopa) {
  if (mario.body.touching.down && koopa.body.touching.up) {
    koopa.destroy()
    mario.setVelocityY(-200)
    playAudio('goomba-stomp', this)
    addToScore(200, koopa, this)

    const shell = this.shells.create(koopa.x, koopa.y - 4, 'shell')
      .setOrigin(0.5, 1)
      .setGravityY(300)
    shell.anims.play('shell-idle', true)
  } else {
    killMario(this)
  }
}

function onHitShell (mario, shell) {
  if (shell.body.velocity.x === 0) {
    playAudio('kick', this)
    const direction = (mario.x < shell.x) ? 1 : -1
    shell.setVelocityX(direction * 180)
    shell.anims.play('shell-spin', true)
    addToScore(100, shell, this)
    // Desplazar el caparazón un poco para evitar daño inmediato por solapamiento
    shell.x += direction * 8
  } else {
    if (mario.body.touching.down && shell.body.touching.up) {
      shell.setVelocityX(0)
      shell.anims.play('shell-idle', true)
      mario.setVelocityY(-200)
      playAudio('goomba-stomp', this)
    } else {
      killMario(this)
    }
  }
}

function onShellHitEnemy (shell, enemy) {
  if (shell.body.velocity.x !== 0) {
    enemy.destroy()
    playAudio('goomba-stomp', this)
    addToScore(200, enemy, this)
  }
}

function handleVictory (mario, flagpole) {
  if (mario.isWinning) return
  mario.isWinning = true
  mario.isBlocked = true

  // Desactivar colisiones y físicas
  mario.body.checkCollision.none = true
  mario.setVelocity(0, 0)
  mario.setGravityY(0)

  // Sonido de victoria (reutilizando sonido de champiñón o powerup)
  playAudio('powerup-appears', this, { volume: 0.1 })

  // Animar la bandera bajando
  this.tweens.add({
    targets: this.flag,
    y: config.height - 16 - 24,
    duration: 1000
  })

  // Animar a Mario bajando por el asta
  this.tweens.add({
    targets: mario,
    y: config.height - 16,
    duration: 1000,
    onComplete: () => {
      // Mario camina hacia el castillo
      mario.anims.play(mario.isGrown ? 'mario-grown-walk' : 'mario-walk', true)
      mario.flipX = false
      this.tweens.add({
        targets: mario,
        x: LEVEL_CONFIG.castle.x + 35,
        duration: 1500,
        onComplete: () => {
          mario.alpha = 0
          // Reiniciar nivel después de 2 segundos
          setTimeout(() => {
            this.scene.restart()
          }, 2000)
        }
      })
    }
  })
}
