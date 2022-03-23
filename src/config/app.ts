export const APP_PORT = process.env.APP_PORT ? process.env.APP_PORT : 5000
export const APP_ENV = process.env.APP_ENV || 'dev'
export const IS_PROD = process.env.NODE_ENV === 'production'
export const APP_ROLES = [
  { id: 10, name: 'admin' },
  { id: 11, name: 'moderator' },
  { id: 12, name: 'seller' },
  { id: 13, name: 'tourist' }
]
export const AVATAR_PATH = 'api public/images/avatar.webp'
