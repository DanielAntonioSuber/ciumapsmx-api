import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => res.json('API v1'))

export default router
