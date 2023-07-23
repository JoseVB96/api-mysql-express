import { Router } from 'express'
import { result } from '../controllers/index.controller.js'

const router = Router()

router.get('/', result)

export default router