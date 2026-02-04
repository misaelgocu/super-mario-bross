# Super Mario Bros - Recreación con Phaser.js

Un clon del clásico Super Mario Bros construido con JavaScript y el framework de juegos Phaser 3.

## 📋 Descripción del Proyecto

Este proyecto es una recreación del icónico videojuego Super Mario Bros utilizando tecnologías web modernas. El juego implementa las mecánicas básicas del original, incluyendo movimiento, saltos, colisiones y animaciones del personaje.

## 🛠️ Tecnologías Utilizadas

- **JavaScript (ES6+)**: Lenguaje de programación principal
- **Phaser 3**: Framework de desarrollo de videojuegos en 2D
- **HTML5**: Estructura del proyecto
- **CSS3**: Estilos y diseño de la interfaz
- **Canvas/WebGL**: Renderizado gráfico

## 📁 Estructura del Proyecto

```
mario/
├── index.html              # Punto de entrada de la aplicación
├── public/
│   ├── assets/             # Recursos del juego
│   │   ├── blocks/         # Sprites de bloques (overworld/underground)
│   │   ├── collectibles/   # Power-ups y monedas
│   │   ├── entities/       # Sprites de personajes (Mario, enemigos)
│   │   ├── scenery/        # Decoraciones y fondos
│   │   ├── sound/          # Efectos de sonido y música
│   │   └── fonts/          # Tipografías del juego
│   ├── css/
│   │   └── style.css       # Estilos de la aplicación
│   └── js/
│       ├── game.js         # Lógica principal del juego
│       ├── animations.js   # Definición de animaciones
│       └── phaser.min.js   # Librería Phaser 3
└── README.md
```

## 🎮 Características Implementadas

### Motor de Juego
- Sistema de física arcade de Phaser
- Gravedad y colisiones
- Carga dinámica de recursos (sprites, sonidos)
- Sistema de animaciones

### Animaciones de Mario
- `mario-walk`: Animación de caminar (frames 1-3)
- `mario-idle`: Estado de reposo
- `mario-jump`: Animación de salto
- `mario-dead`: Animación de muerte

### Assets Incluidos

#### Bloques
- Bloques destructibles y no destructibles
- Bloques misteriosos (mystery blocks)
- Variantes para overworld y underground
- Efectos de debris al romper bloques

#### Coleccionables
- Monedas
- Super champiñón
- Flor de fuego
- Champiñón de vida extra

#### Enemigos y Personajes
- Mario (normal, grande, con fuego)
- Goombas (overworld/underground)
- Koopa Troopas
- Caparazones

#### Escenarios
- Elementos decorativos (nubes, arbustos, montañas)
- Tuberías (verticales y horizontales de varios tamaños)
- Ladrillos de piso
- Castillo final
- Bandera de meta

#### Audio
- Música de fondo (overworld/underground)
- Efectos de sonido (saltos, colectar monedas, power-ups, etc.)
- Música de "Game Over"
- Tema de victoria

## 🚀 Configuración del Juego

### Parámetros Principales
```javascript
{
  type: Phaser.AUTO,        // Renderizado automático (WebGL/Canvas)
  width: 300,               // Ancho del canvas
  height: 270,              // Alto del canvas
  backgroundColor: '#049cd8', // Color de fondo característico
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },  // Gravedad del juego
      debug: false          // Modo debug desactivado
    }
  }
}
```

## 🎯 Ciclo de Vida del Juego

1. **Preload**: Carga de assets (sprites, imágenes, sonidos)
2. **Create**: Inicialización del juego y creación de objetos
3. **Update**: Loop principal que se ejecuta en cada frame

## 💻 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Servidor web local (opcional para desarrollo)

### Ejecución Local

1. Clona el repositorio
```bash
git clone [url-del-repositorio]
cd mario
```

2. Abre el archivo `index.html` en tu navegador o usa un servidor local:

**Opción 1: Con Python**
```bash
python -m http.server 8000
# Abre http://localhost:8000 en tu navegador
```

**Opción 2: Con Node.js (http-server)**
```bash
npx http-server
# Abre la URL indicada en la terminal
```

**Opción 3: Con PHP**
```bash
php -S localhost:8000
```

## 🎨 Diseño y Patrones

### Modularización
- Separación de lógica de juego (`game.js`) y animaciones (`animations.js`)
- Uso de módulos ES6 para organización del código

### Arquitectura
- Arquitectura basada en escenas de Phaser
- Sistema de eventos para manejo de interacciones
- Organización de assets por categorías

## 🔊 Sistema de Audio

### Efectos de Sonido
- Salto, recolección de monedas
- Ruptura de bloques
- Power-ups
- Ataques con bola de fuego
- Pisotones a enemigos
- Pausa del juego

### Música
- Temas principales (overworld/underground)
- Variaciones de "prisa" (hurry-up themes)
- Música de victoria y game over

## 📝 Notas de Desarrollo

- El juego usa un canvas de 300x270 píxeles para mantener la estética retro
- Los sprites están organizados en spritesheets para optimización
- Se implementa un sistema de física arcade para colisiones simplificadas
- El color de fondo (#049cd8) es el característico del cielo de Mario

## 🎓 Propósito Educativo

Este proyecto sirve como ejemplo de:
- Desarrollo de videojuegos con JavaScript
- Uso del framework Phaser 3
- Manejo de sprites y animaciones
- Implementación de física en juegos 2D
- Organización de assets en proyectos de juegos

## 🔄 Estado del Proyecto

El proyecto contiene la estructura base y los assets necesarios para recrear Super Mario Bros. Se han implementado las animaciones básicas de Mario y la configuración inicial del motor de juego.

## 📄 Licencia

Este es un proyecto educativo. Todos los assets de Super Mario Bros son propiedad de Nintendo.

---

**Nota**: Este es un proyecto con fines educativos y de aprendizaje del desarrollo de videojuegos con JavaScript y Phaser.
