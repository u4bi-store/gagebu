import path from 'path'
import express, {Request, Response} from 'express'
import apiRouter from './api'

const app: express.Application = express()
const env: string = process.env.NODE_ENV || 'development'
const development = env === 'development'
const pkg = development 
  ? require(path.resolve(__dirname, '../../package.json'))
  : require(path.resolve(__dirname, '../package.json'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/assets', express.static(path.join(__dirname, pkg.assetPath)))
app.use('/api', apiRouter)
app.use('/', (_: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.use('/*', (_: Request, res: Response) => {
  // fixme 주소는 변경 안됨 
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Server is running on 3000')
}) 