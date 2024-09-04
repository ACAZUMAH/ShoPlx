import { Router } from 'express';
import poductsRouter from './products-router'
import usersRouter from './users-routers'

const router = Router()

router.use('/api/v1/shoplx',usersRouter)
router.use('/api/v1/shoplx', poductsRouter)

export default router