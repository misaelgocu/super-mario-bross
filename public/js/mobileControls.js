/**
 * Mobile Touch Controls Module
 * Maneja los controles táctiles para dispositivos móviles
 * Sigue el patrón de módulo ES6 y buenas prácticas
 */

class MobileControls {
  constructor() {
    // Estado de los controles
    this.touchState = {
      left: false,
      right: false,
      jump: false
    }

    // Referencias a elementos DOM
    this.elements = {
      container: null,
      leftButton: null,
      rightButton: null,
      jumpButton: null
    }

    // IDs de touch para seguimiento multi-touch
    this.touchIds = {
      left: null,
      right: null,
      jump: null
    }

    this.isMobile = this.detectMobileDevice()
    this.isInitialized = false
  }

  /**
   * Detecta si el dispositivo es móvil
   * @returns {boolean}
   */
  detectMobileDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    )
  }

  /**
   * Inicializa los controles móviles
   */
  init() {
    if (!this.isMobile || this.isInitialized) {
      return
    }

    this.createControlsHTML()
    this.setupEventListeners()
    this.isInitialized = true

    console.log('✓ Controles móviles inicializados')
  }

  /**
   * Crea el HTML de los controles
   */
  createControlsHTML() {
    const controlsHTML = `
      <div class="mobile-controls">
        <!-- D-Pad (Controles direccionales) -->
        <div class="dpad-container">
          <div class="dpad-grid">
            <div></div>
            <div></div>
            <div></div>
            
            <div class="dpad-button dpad-left" data-control="left">
              <div class="dpad-icon"></div>
            </div>
            <div></div>
            <div class="dpad-button dpad-right" data-control="right">
              <div class="dpad-icon"></div>
            </div>
            
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="action-buttons">
          <button class="action-button jump-button" data-control="jump">
            A
          </button>
        </div>
      </div>
    `

    // Insertar HTML en el body
    document.body.insertAdjacentHTML('beforeend', controlsHTML)

    // Guardar referencias
    this.elements.container = document.querySelector('.mobile-controls')
    this.elements.leftButton = document.querySelector('[data-control="left"]')
    this.elements.rightButton = document.querySelector('[data-control="right"]')
    this.elements.jumpButton = document.querySelector('[data-control="jump"]')
  }

  /**
   * Configura los event listeners
   */
  setupEventListeners() {
    const buttons = {
      left: this.elements.leftButton,
      right: this.elements.rightButton,
      jump: this.elements.jumpButton
    }

    // Prevenir comportamiento por defecto en todos los botones
    Object.values(buttons).forEach(button => {
      if (!button) return

      button.addEventListener('contextmenu', (e) => e.preventDefault())
      button.addEventListener('touchmove', (e) => e.preventDefault(), {
        passive: false
      })
    })

    // Setup touch events para cada botón
    this.setupButtonTouchEvents(buttons.left, 'left')
    this.setupButtonTouchEvents(buttons.right, 'right')
    this.setupButtonTouchEvents(buttons.jump, 'jump')

    // Manejar cuando el usuario levanta todos los dedos
    document.addEventListener('touchend', this.handleDocumentTouchEnd.bind(this))
    document.addEventListener('touchcancel', this.handleDocumentTouchEnd.bind(this))
  }

  /**
   * Configura eventos touch para un botón específico
   * @param {HTMLElement} button - Elemento del botón
   * @param {string} control - Nombre del control
   */
  setupButtonTouchEvents(button, control) {
    if (!button) return

    button.addEventListener('touchstart', (e) => {
      e.preventDefault()
      e.stopPropagation()

      // Guardar el ID del touch
      if (e.changedTouches.length > 0) {
        this.touchIds[control] = e.changedTouches[0].identifier
      }

      this.activateControl(control)
    })

    button.addEventListener('touchend', (e) => {
      e.preventDefault()
      e.stopPropagation()

      // Verificar que es el mismo touch
      if (e.changedTouches.length > 0) {
        const touchId = e.changedTouches[0].identifier
        if (this.touchIds[control] === touchId) {
          this.deactivateControl(control)
          this.touchIds[control] = null
        }
      }
    })
  }

  /**
   * Activa un control
   * @param {string} control - Nombre del control
   */
  activateControl(control) {
    this.touchState[control] = true

    // Feedback visual
    const button = this.elements[`${control}Button`]
    if (button) {
      button.classList.add('active')
    }

    // Haptic feedback en dispositivos compatibles
    this.triggerHapticFeedback()
  }

  /**
   * Desactiva un control
   * @param {string} control - Nombre del control
   */
  deactivateControl(control) {
    this.touchState[control] = false

    // Quitar feedback visual
    const button = this.elements[`${control}Button`]
    if (button) {
      button.classList.remove('active')
    }
  }

  /**
   * Maneja cuando se levantan todos los dedos
   * @param {TouchEvent} e
   */
  handleDocumentTouchEnd(e) {
    // Desactivar controles si sus touches terminaron
    const activeTouchIds = Array.from(e.touches).map(t => t.identifier)

    Object.keys(this.touchIds).forEach(control => {
      const touchId = this.touchIds[control]
      if (touchId !== null && !activeTouchIds.includes(touchId)) {
        this.deactivateControl(control)
        this.touchIds[control] = null
      }
    })
  }

  /**
   * Activa feedback háptico si está disponible
   */
  triggerHapticFeedback() {
    if (navigator.vibrate) {
      navigator.vibrate(10) // Vibración corta de 10ms
    }
  }

  /**
   * Obtiene el estado actual de los controles
   * @returns {Object}
   */
  getState() {
    return { ...this.touchState }
  }

  /**
   * Verifica si un control está activo
   * @param {string} control - Nombre del control
   * @returns {boolean}
   */
  isControlActive(control) {
    return this.touchState[control] === true
  }

  /**
   * Reinicia todos los controles
   */
  reset() {
    Object.keys(this.touchState).forEach(control => {
      this.deactivateControl(control)
    })

    Object.keys(this.touchIds).forEach(control => {
      this.touchIds[control] = null
    })
  }

  /**
   * Destruye los controles y limpia event listeners
   */
  destroy() {
    if (!this.isInitialized) return

    this.reset()

    if (this.elements.container) {
      this.elements.container.remove()
    }

    this.isInitialized = false
    console.log('✓ Controles móviles destruidos')
  }
}

// Singleton instance
let mobileControlsInstance = null

/**
 * Obtiene la instancia singleton de MobileControls
 * @returns {MobileControls}
 */
export function getMobileControls() {
  if (!mobileControlsInstance) {
    mobileControlsInstance = new MobileControls()
  }
  return mobileControlsInstance
}

/**
 * Inicializa los controles móviles
 */
export function initMobileControls() {
  const controls = getMobileControls()
  controls.init()
  return controls
}

/**
 * Verifica si un control táctil está activo
 * @param {string} control - 'left', 'right', o 'jump'
 * @returns {boolean}
 */
export function isTouchControlActive(control) {
  const controls = getMobileControls()
  return controls.isInitialized ? controls.isControlActive(control) : false
}

/**
 * Obtiene el estado completo de los controles táctiles
 * @returns {Object}
 */
export function getTouchControlsState() {
  const controls = getMobileControls()
  return controls.isInitialized ? controls.getState() : {
    left: false,
    right: false,
    jump: false
  }
}
