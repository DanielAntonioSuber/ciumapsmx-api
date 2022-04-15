export const APP_PORT = process.env.APP_PORT ? process.env.APP_PORT : 5000
export const APP_ENV = process.env.APP_ENV || 'dev'
export const IS_PROD = process.env.NODE_ENV === 'production'
export const JWT_SECRET = process.env.JWT_SECRET || 'DefaultJWT'
export const APP_URL = process.env.APP_URL || `http://localhost:${APP_PORT}/`
