import { createAnimations } from './animations.js'
import { initAudio, playAudio, playMusic } from './audio.js'
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
    { x: 230, y: 140, item: 'fireflower' },
    { x: 280, y: 140, item: 'coin' },
    { x: 640, y: 140, item: 'coin' },
    { x: 880, y: 140, item: 'fireflower' },
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

class BootScene extends Phaser.Scene {
  constructor () {
    super('BootScene')
  }

  preload () {
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
  }

  create () {
    createAnimations(this)
    initMobileControls()
    this.scene.start('TitleScene')
  }
}

class TitleScene extends Phaser.Scene {
  constructor () {
    super('TitleScene')
  }

  create () {
    this.cameras.main.setBackgroundColor('#049cd8')

    this.add.text(config.width / 2, 50, 'SUPER MARIO BROS', {
      fontFamily: 'pixel',
      fontSize: config.width / 22,
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5)

    this.add.text(config.width / 2, 140, 'PRESS ENTER OR TAP\nTO PLAY', {
      fontFamily: 'pixel',
      fontSize: config.width / 35,
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5)

    this.registry.set('score', 0)
    this.registry.set('coins', 0)
    this.registry.set('lives', 3)
    this.registry.set('world', '1-1')

    this.input.keyboard.once('keydown-ENTER', () => {
      this.scene.start('LivesScene')
    })

    this.input.once('pointerdown', () => {
      this.scene.start('LivesScene')
    })
  }
}

class LivesScene extends Phaser.Scene {
  constructor () {
    super('LivesScene')
  }

  create () {
    this.cameras.main.setBackgroundColor('#000000')

    const world = this.registry.get('world') || '1-1'
    const lives = this.registry.get('lives')

    this.add.text(config.width / 2, 80, `WORLD ${world}`, {
      fontFamily: 'pixel',
      fontSize: config.width / 28,
      fill: '#fff'
    }).setOrigin(0.5)

    this.add.text(config.width / 2, 130, `MARIO x ${lives}`, {
      fontFamily: 'pixel',
      fontSize: config.width / 28,
      fill: '#fff'
    }).setOrigin(0.5)

    this.time.delayedCall(2000, () => {
      this.scene.start('GameScene')
    })
  }
}

class GameOverScene extends Phaser.Scene {
  constructor () {
    super('GameOverScene')
  }

  create () {
    this.cameras.main.setBackgroundColor('#000000')

    this.add.text(config.width / 2, config.height / 2, 'GAME OVER', {
      fontFamily: 'pixel',
      fontSize: config.width / 22,
      fill: '#f00'
    }).setOrigin(0.5)

    playAudio('gameover', this, { volume: 0.1 })

    this.time.delayedCall(4000, () => {
      this.scene.start('TitleScene')
    })
  }
}

class GameScene extends Phaser.Scene {
  constructor () {
    super('GameScene')
  }

  init () {
    this.timerSeconds = 400
    this.isTimerWarningPlayed = false
  }

  create () {
    // Iniciar Música de fondo
    playMusic('theme', this, { volume: 0.08 })

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
      .setOrigin(0.5, 1)
      .setCollideWorldBounds(true)
      .setGravityY(300)

    // Estado inicial de Mario en la corrida
    this.mario.isGrown = false
    this.mario.isFire = false
    this.mario.isDead = false
    this.mario.isBlocked = false
    this.mario.isWinning = false

    // Generar coleccionables sueltos
    this.collectibes = this.physics.add.staticGroup()
    this.collectibes.create(150, 150, 'coin').anims.play('coin-idle', true)
    this.collectibes.create(300, 150, 'coin').anims.play('coin-idle', true)
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
        .setOrigin(0.5, 1)
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
    this.fireballs = this.physics.add.group()

    // Configuración de límites y físicas del mundo
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

    // Físicas y colisiones para bolas de fuego
    this.physics.add.collider(this.fireballs, this.floor, (fb, floor) => {
      if (fb.body.blocked.left || fb.body.blocked.right) {
        explodeFireball(fb)
      } else {
        fb.setVelocityY(-100) // Botar
      }
    })
    this.physics.add.collider(this.fireballs, this.pipes, (fb, pipe) => { explodeFireball(fb) })
    this.physics.add.collider(this.fireballs, this.misteryBlocks, (fb, block) => {
      if (fb.body.blocked.left || fb.body.blocked.right) {
        explodeFireball(fb)
      } else {
        fb.setVelocityY(-100)
      }
    })
    this.physics.add.collider(this.fireballs, this.bricks, (fb, brick) => {
      if (fb.body.blocked.left || fb.body.blocked.right) {
        explodeFireball(fb)
      } else {
        fb.setVelocityY(-100)
      }
    })

    // Dañar enemigos con bolas de fuego
    this.physics.add.collider(this.fireballs, this.goombas, (fb, enemy) => {
      explodeFireball(fb)
      enemy.destroy()
      playAudio('goomba-stomp', this)
      addToScore(200, enemy, this)
    })
    this.physics.add.collider(this.fireballs, this.koopas, (fb, enemy) => {
      explodeFireball(fb)
      enemy.destroy()
      playAudio('goomba-stomp', this)
      addToScore(200, enemy, this)
    })
    this.physics.add.collider(this.fireballs, this.shells, (fb, enemy) => {
      explodeFireball(fb)
      enemy.destroy()
      playAudio('goomba-stomp', this)
      addToScore(200, enemy, this)
    })

    // Configuración de cámara
    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    this.keys = this.input.keyboard.createCursorKeys()
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    // Registrar click/tap en pantalla para disparar
    this.input.on('pointerdown', (pointer) => {
      if (this.mario.isFire && !this.mario.isDead && !this.mario.isBlocked && pointer.y < config.height - 80) {
        this.shootFireball()
      }
    })

    // Crear HUD
    const hudStyle = { fontFamily: 'pixel', fontSize: '7px', fill: '#ffffff' }
    this.scoreText = this.add.text(12, 10, 'MARIO\n000000', hudStyle).setScrollFactor(0)
    this.coinsText = this.add.text(90, 10, 'COINS\nx00', hudStyle).setScrollFactor(0)
    this.worldText = this.add.text(150, 10, 'WORLD\n1-1', hudStyle).setScrollFactor(0)
    this.timeText = this.add.text(210, 10, 'TIME\n400', hudStyle).setScrollFactor(0)

    this.updateHUD()

    // Timer de segundos
    this.timeEvent = this.time.addEvent({
      delay: 1000,
      callback: this.onSecondPassed,
      callbackScope: this,
      loop: true
    })
  }

  updateHUD () {
    const score = this.registry.get('score') || 0
    const coins = this.registry.get('coins') || 0
    this.scoreText.setText('MARIO\n' + String(score).padStart(6, '0'))
    this.coinsText.setText('COINS\nx' + String(coins).padStart(2, '0'))
    this.timeText.setText('TIME\n' + String(this.timerSeconds).padStart(3, '0'))
  }

  onSecondPassed () {
    if (this.mario.isWinning || this.mario.isDead) return

    this.timerSeconds--
    this.updateHUD()

    if (this.timerSeconds === 100 && !this.isTimerWarningPlayed) {
      this.isTimerWarningPlayed = true
      playAudio('time-warning', this, { volume: 0.1 })
      
      // Acelerar la música
      playMusic('hurry-theme', this, { volume: 0.08 })
    }

    if (this.timerSeconds <= 0) {
      this.killMario()
    }
  }

  shootFireball () {
    if (this.fireballs.countActive(true) >= 2) return

    playAudio('fireball', this, { volume: 0.1 })

    const direction = this.mario.flipX ? -1 : 1
    const x = this.mario.x + (direction * 12)
    const y = this.mario.y - 20

    const fb = this.fireballs.create(x, y, 'fireball')
    fb.setOrigin(0.5)
    fb.body.setAllowGravity(true)
    fb.setGravityY(300)
    fb.setVelocityX(direction * 180)
    fb.setVelocityY(50)
    fb.setBounce(0.6, 0.6)
    fb.anims.play('fireball-spin', true)
  }

  update () {
    const { mario } = this

    checkControls(this)

    // Disparar con Space
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && mario.isFire && !mario.isDead && !mario.isBlocked) {
      this.shootFireball()
    }

    // Comprobar muerte por caída
    if (mario.y >= config.height) {
      this.killMario()
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

    // Destruir bolas de fuego que salen del mapa
    this.fireballs.children.iterate(fb => {
      if (fb && fb.active && (fb.y >= config.height || fb.x < 0 || fb.x > 2000)) {
        fb.destroy()
      }
    })
  }

  killMario () {
    const { mario, scene } = this

    if (mario.isDead) return

    mario.isDead = true
    mario.anims.play('mario-dead')
    mario.setCollideWorldBounds(false)

    if (this.bgMusic) {
      this.bgMusic.stop()
    }
    playAudio('gameover', this, { volume: 0.05 })

    mario.body.checkCollision.none = true
    mario.setVelocity(0, 0)
    mario.setGravityY(0)

    setTimeout(() => {
      mario.setVelocityY(-250)
      mario.setGravityY(300)
    }, 100)

    setTimeout(() => {
      const lives = this.registry.get('lives') - 1
      this.registry.set('lives', lives)

      if (lives > 0) {
        scene.start('LivesScene')
      } else {
        scene.start('GameOverScene')
      }
    }, 2000)
  }
}

// Funciones Auxiliares Fuera de las Clases

function collectItem (mario, item) {
  const { texture: { key } } = item
  item.destroy()

  const scene = mario.scene

  if (key === 'coin') {
    playAudio('coin-pickup', scene, { volume: 0.1 })
    
    // Incrementar monedas y puntaje
    const coins = (scene.registry.get('coins') || 0) + 1
    scene.registry.set('coins', coins)
    
    const score = (scene.registry.get('score') || 0) + 100
    scene.registry.set('score', score)

    scene.updateHUD()

    addToScore(100, item, scene)
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

  // Sumar al estado global
  const score = (game.registry.get('score') || 0) + scoreToAdd
  game.registry.set('score', score)
  game.updateHUD()

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
  const scene = mario.scene

  if (mario.body.touching.down && enemy.body.touching.up) {
    enemy.anims.play('goomba-hurt', true)
    enemy.setVelocityX(0)
    mario.setVelocityY(-200)

    playAudio('goomba-stomp', scene)
    addToScore(200, mario, scene)

    setTimeout(() => {
      enemy.destroy()
    }, 500)
  } else {
    // Si Mario tiene fuego o es grande, se encoge en lugar de morir
    if (mario.isFire) {
      mario.isFire = false
      mario.isGrown = true
      playAudio('powerdown', scene, { volume: 0.1 })
      
      // Parpadeo de invencibilidad temporal
      triggerInvincibility(mario)
    } else if (mario.isGrown) {
      mario.isGrown = false
      playAudio('powerdown', scene, { volume: 0.1 })
      
      triggerInvincibility(mario)
    } else {
      if (!mario.isInvincible) {
        scene.killMario()
      }
    }
  }
}

function triggerInvincibility (mario) {
  mario.isInvincible = true
  mario.isBlocked = true

  // Achicar hitbox
  mario.setDisplaySize(18, 16)
  mario.body.setSize(18, 16)

  let blink = false
  const interval = setInterval(() => {
    blink = !blink
    mario.alpha = blink ? 0.3 : 1
  }, 100)

  setTimeout(() => {
    clearInterval(interval)
    mario.alpha = 1
    mario.isInvincible = false
    mario.isBlocked = false
  }, 1200)
}

function handleBlockCollision (mario, block) {
  const scene = mario.scene

  if (mario.body.touching.up && block.body.touching.down) {
    const key = block.texture.key

    if (key === 'misteryBlock') {
      const hasBeenHit = block.getData('hit')
      if (!hasBeenHit) {
        block.setData('hit', true)
        block.anims.stop()
        block.setTexture('emptyBlock')

        playAudio('block-bump', scene)

        // Rebote del bloque
        scene.tweens.add({
          targets: block,
          y: block.y - 8,
          duration: 100,
          yoyo: true,
          onComplete: () => {
            let itemType = block.getData('item')

            // Regla NES: Si es flor pero Mario es chico, spawnear champiñón
            if (itemType === 'fireflower' && !mario.isGrown) {
              itemType = 'supermushroom'
            }

            if (itemType === 'coin') {
              playAudio('coin-pickup', scene, { volume: 0.1 })

              const coin = scene.add.sprite(block.x, block.y - 16, 'coin')
              coin.anims.play('coin-idle', true)

              // Incrementar monedas y puntaje
              const coins = (scene.registry.get('coins') || 0) + 1
              scene.registry.set('coins', coins)
              scene.updateHUD()

              scene.tweens.add({
                targets: coin,
                y: coin.y - 32,
                duration: 250,
                yoyo: true,
                onComplete: () => {
                  coin.destroy()
                  addToScore(100, block, scene)
                }
              })
            } else if (itemType === 'supermushroom') {
              playAudio('powerup-appears', scene, { volume: 0.1 })

              const mushroom = scene.physics.add.sprite(block.x, block.y, 'supermushroom')
              mushroom.setOrigin(0.5, 0.5)
              mushroom.body.setAllowGravity(false)

              scene.tweens.add({
                targets: mushroom,
                y: block.y - 16,
                duration: 500,
                onComplete: () => {
                  mushroom.body.setAllowGravity(true)
                  mushroom.setGravityY(300)
                  mushroom.setVelocityX(50)

                  const collideBlock = (mush, b) => {
                    if (mush.body.touching.left || mush.body.touching.right) {
                      mush.setVelocityX(-mush.body.velocity.x)
                    }
                  }

                  scene.physics.add.collider(mushroom, scene.floor, collideBlock)
                  scene.physics.add.collider(mushroom, scene.pipes, collideBlock)
                  scene.physics.add.collider(mushroom, scene.misteryBlocks, collideBlock)
                  scene.physics.add.collider(mushroom, scene.bricks, collideBlock)
                  scene.physics.add.overlap(mario, mushroom, collectMushroom, null, scene)
                }
              })
            } else if (itemType === 'fireflower') {
              playAudio('powerup-appears', scene, { volume: 0.1 })

              const flower = scene.physics.add.sprite(block.x, block.y, 'fireflower')
              flower.setOrigin(0.5, 0.5)
              flower.body.setAllowGravity(false)
              flower.anims.play('fireflower-flash', true)

              scene.tweens.add({
                targets: flower,
                y: block.y - 16,
                duration: 500,
                onComplete: () => {
                  scene.physics.add.overlap(mario, flower, collectFireFlower, null, scene)
                }
              })
            }
          }
        })
      } else {
        playAudio('block-bump', scene)
      }
    } else if (key === 'block') {
      if (mario.isGrown) {
        playAudio('break-block', scene)

        for (let i = 0; i < 4; i++) {
          const debris = scene.physics.add.sprite(block.x, block.y, 'brick-debris')
          debris.setFrame(i)
          debris.setVelocityX((i % 2 === 0 ? -1 : 1) * (30 + Math.random() * 40))
          debris.setVelocityY(-150 - Math.random() * 50)
          debris.setGravityY(400)

          scene.time.delayedCall(1000, () => debris.destroy())
        }

        block.destroy()
        addToScore(50, block, scene)
      } else {
        playAudio('block-bump', scene)
        scene.tweens.add({
          targets: block,
          y: block.y - 4,
          duration: 100,
          yoyo: true
        })
      }
    }
  }
}

function collectMushroom (mario, mushroom) {
  const scene = mario.scene
  mushroom.destroy()

  scene.physics.world.pause()
  scene.anims.pauseAll()
  playAudio('powerup', scene, { volume: 0.1 })

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
    scene.anims.resumeAll()
    mario.isBlocked = false
    clearInterval(interval)
    scene.physics.world.resume()
  }, 1000)
}

function collectFireFlower (mario, flower) {
  const scene = mario.scene
  flower.destroy()

  scene.physics.world.pause()
  scene.anims.pauseAll()
  playAudio('powerup', scene, { volume: 0.1 })

  let i = 0
  const interval = setInterval(() => {
    i++
    mario.anims.play(i % 2 === 0
      ? 'mario-fire-idle'
      : 'mario-grown-idle'
    )
  }, 100)

  mario.isBlocked = true
  mario.isGrown = true
  mario.isFire = true

  setTimeout(() => {
    mario.setDisplaySize(18, 32)
    mario.body.setSize(18, 32)
    scene.anims.resumeAll()
    mario.isBlocked = false
    clearInterval(interval)
    scene.physics.world.resume()
  }, 1000)
}

function onHitKoopa (mario, koopa) {
  const scene = mario.scene

  if (mario.body.touching.down && koopa.body.touching.up) {
    koopa.destroy()
    mario.setVelocityY(-200)
    playAudio('goomba-stomp', scene)
    addToScore(200, koopa, scene)

    const shell = scene.shells.create(koopa.x, koopa.y - 4, 'shell')
      .setOrigin(0.5, 1)
      .setGravityY(300)
    shell.anims.play('shell-idle', true)
  } else {
    // Si Mario tiene fuego o es grande, se encoge en lugar de morir
    if (mario.isFire) {
      mario.isFire = false
      mario.isGrown = true
      playAudio('powerdown', scene, { volume: 0.1 })
      triggerInvincibility(mario)
    } else if (mario.isGrown) {
      mario.isGrown = false
      playAudio('powerdown', scene, { volume: 0.1 })
      triggerInvincibility(mario)
    } else {
      if (!mario.isInvincible) {
        scene.killMario()
      }
    }
  }
}

function onHitShell (mario, shell) {
  const scene = mario.scene

  if (shell.body.velocity.x === 0) {
    playAudio('kick', scene)
    const direction = (mario.x < shell.x) ? 1 : -1
    shell.setVelocityX(direction * 180)
    shell.anims.play('shell-spin', true)
    addToScore(100, shell, scene)
    shell.x += direction * 8
  } else {
    if (mario.body.touching.down && shell.body.touching.up) {
      shell.setVelocityX(0)
      shell.anims.play('shell-idle', true)
      mario.setVelocityY(-200)
      playAudio('goomba-stomp', scene)
    } else {
      // Dañar o morir según el estado de Mario
      if (mario.isFire) {
        mario.isFire = false
        mario.isGrown = true
        playAudio('powerdown', scene, { volume: 0.1 })
        triggerInvincibility(mario)
      } else if (mario.isGrown) {
        mario.isGrown = false
        playAudio('powerdown', scene, { volume: 0.1 })
        triggerInvincibility(mario)
      } else {
        if (!mario.isInvincible) {
          scene.killMario()
        }
      }
    }
  }
}

function onShellHitEnemy (shell, enemy) {
  const scene = shell.scene
  if (shell.body.velocity.x !== 0) {
    enemy.destroy()
    playAudio('goomba-stomp', scene)
    addToScore(200, enemy, scene)
  }
}

function explodeFireball (fb) {
  fb.setVelocity(0, 0)
  fb.body.setAllowGravity(false)
  fb.setTexture('fireball-explosion')
  fb.anims.play('fireball-explode', true)
  fb.once('animationcomplete', () => {
    fb.destroy()
  })
}

function handleVictory (mario, flagpole) {
  const scene = mario.scene

  if (mario.isWinning) return
  mario.isWinning = true
  mario.isBlocked = true

  mario.body.checkCollision.none = true
  mario.setVelocity(0, 0)
  mario.setGravityY(0)

  if (scene.bgMusic) {
    scene.bgMusic.stop()
  }
  playAudio('win-music', scene, { volume: 0.1 })

  scene.tweens.add({
    targets: scene.flag,
    y: config.height - 16 - 24,
    duration: 1000
  })

  scene.tweens.add({
    targets: mario,
    y: config.height - 16,
    duration: 1000,
    onComplete: () => {
      mario.anims.play(mario.isFire ? 'mario-fire-walk' : (mario.isGrown ? 'mario-grown-walk' : 'mario-walk'), true)
      mario.flipX = false
      scene.tweens.add({
        targets: mario,
        x: LEVEL_CONFIG.castle.x + 35,
        duration: 1500,
        onComplete: () => {
          mario.alpha = 0
          setTimeout(() => {
            scene.scene.start('TitleScene')
          }, 2000)
        }
      })
    }
  })
}

const config = {
  autoFocus: false,
  type: Phaser.AUTO, 
  width: 256,
  height: 244,
  backgroundColor: '#049cd8',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false 
    }
  },
  scene: [BootScene, TitleScene, LivesScene, GameScene, GameOverScene]
}

new Phaser.Game(config)
