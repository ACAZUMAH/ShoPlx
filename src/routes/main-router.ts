import { Router } from 'express';
import poductsRouter from './products-router'
import usersRouter from './users-routers'

const router = Router()

router.use('/api', usersRouter)
//router.use('/api', poductsRouter)

export default router