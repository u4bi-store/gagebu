import path from 'path'
import express from 'express'
const app: express.Application = express()

interface User {
  name: string
}

app.use('/static', express.static(path.join(__dirname, './static')))
app.get('/api/me', (req: express.Request, res: express.Response) => {
  const user: User = {
    name: '김정환'
  }
  res.json(user)
})
app.use('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.use('/*', (req: express.Request, res: express.Response) => {
  // fixme 주소는 변경 안됨 
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Server is running on 3000')
}) 