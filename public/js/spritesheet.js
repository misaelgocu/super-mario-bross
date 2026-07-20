const INIT_SPRITESHEETS = [
  {
    key: 'mario',
    path: './public/assets/entities/mario.png',
    frameWidth: 18,
    frameHeight: 16
  },
  {
    key: 'goomba',
    path: './public/assets/entities/overworld/goomba.png',
    frameWidth: 16,
    frameHeight: 16
  },
  {
    key: 'coin',
    path: './public/assets/collectibles/coin.png',
    frameWidth: 16,
    frameHeight: 16
  },
  {
    key: 'mario-grown',
    path: 'public/assets/entities/mario-grown.png',
    frameWidth: 18,
    frameHeight: 32
  },
  {
    key: 'misteryBlock',
    path: './public/assets/blocks/overworld/misteryBlock.png',
    frameWidth: 16,
    frameHeight: 16
  },
  {
    key: 'block',
    path: './public/assets/blocks/overworld/block.png',
    frameWidth: 16,
    frameHeight: 16
  },
  {
    key: 'emptyBlock',
    path: './public/assets/blocks/overworld/emptyBlock.png',
    frameWidth: 16,
    frameHeight: 16
  },
  {
    key: 'brick-debris',
    path: './public/assets/blocks/overworld/brick-debris.png',
    frameWidth: 8,
    frameHeight: 8
  }
]

export const initSpritesheet = ({ load }) => {
  INIT_SPRITESHEETS.forEach(({ key, path, frameWidth, frameHeight }) => {
    load.spritesheet(key, path, { frameWidth, frameHeight })
  })
}