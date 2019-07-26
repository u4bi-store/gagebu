import {Router, Request, Response} from 'express'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json([
    {id: 2, text: '부식', amount: 8000},
    {id: 1, text: '아이스크림', amount: 1000}
  ])
})

export default router