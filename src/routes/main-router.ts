import { Router } from 'express';
import poductsRouter from './products-router'
import usersRouter from './users-routers'

const router = Router()

router.use('/api/v1/shopX',usersRouter)
router.use('/api/v1/shopX', poductsRouter)

export default router
