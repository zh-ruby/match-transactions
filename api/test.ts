import { Router } from "express"

import testController from '../controllers/test'

const router = Router()

router.post('/match', testController.match)

export default router
