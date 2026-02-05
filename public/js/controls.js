import { getTouchControlsState } from './mobileControls.js'

const MARIO_ANIMATIONS = {
  grown: {
    idle: 'mario-grown-idle',
    walk: 'mario-grown-walk',
    jump: 'mario-grown-jump'
  },
  normal: {
    idle: 'mario-idle',
    walk: 'mario-walk',
    jump: 'mario-jump'
  }
}

/**
 * Verifica y procesa los controles del juego
 * Soporta tanto teclado como controles táctiles móviles
 * @param {Object} context - Contexto del juego con mario y keys
 */
export function checkControls ({ mario, keys }) {
  // Validaciones iniciales
  if (mario.isDead || mario.isBlocked) return

  const isMarioTouchingFloor = mario.body.touching.down

  // Obtener estado de controles (teclado + táctiles)
  const controls = getControlsState(keys)

  // Determinar animaciones según el estado de Mario
  const marioAnimations = mario.isGrown
    ? MARIO_ANIMATIONS.grown
    : MARIO_ANIMATIONS.normal

  // Procesar movimiento horizontal
  handleHorizontalMovement(mario, controls, isMarioTouchingFloor, marioAnimations)

  // Procesar salto
  handleJump(mario, controls, isMarioTouchingFloor, marioAnimations)
}

/**
 * Obtiene el estado combinado de teclado y controles táctiles
 * @param {Object} keys - Teclas de Phaser
 * @returns {Object} Estado combinado de controles
 */
function getControlsState(keys) {
  const touchState = getTouchControlsState()

  return {
    left: keys.left.isDown || touchState.left,
    right: keys.right.isDown || touchState.right,
    up: keys.up.isDown || touchState.jump
  }
}

/**
 * Maneja el movimiento horizontal de Mario
 * @param {Object} mario - Sprite de Mario
 * @param {Object} controls - Estado de controles
 * @param {boolean} isTouchingFloor - Si Mario está en el suelo
 * @param {Object} animations - Animaciones de Mario
 */
function handleHorizontalMovement(mario, controls, isTouchingFloor, animations) {
  const { left, right } = controls

  if (left && !right) {
    // Mover a la izquierda
    if (isTouchingFloor) {
      mario.anims.play(animations.walk, true)
    }
    mario.x -= 2
    mario.flipX = true
  } else if (right && !left) {
    // Mover a la derecha
    if (isTouchingFloor) {
      mario.anims.play(animations.walk, true)
    }
    mario.x += 2
    mario.flipX = false
  } else if (isTouchingFloor) {
    // Sin movimiento - animación idle
    mario.anims.play(animations.idle, true)
  }
}

/**
 * Maneja el salto de Mario
 * @param {Object} mario - Sprite de Mario
 * @param {Object} controls - Estado de controles
 * @param {boolean} isTouchingFloor - Si Mario está en el suelo
 * @param {Object} animations - Animaciones de Mario
 */
function handleJump(mario, controls, isTouchingFloor, animations) {
  if (controls.up && isTouchingFloor) {
    mario.setVelocityY(-300)
    mario.anims.play(animations.jump, true)
  }
}
