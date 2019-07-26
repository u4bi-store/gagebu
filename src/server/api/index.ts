import {Router} from 'express'
import expense from './expense'
import user from './user'

const router = Router()

router.use('/expenses', expense)
router.use('/users', user)

export default router
