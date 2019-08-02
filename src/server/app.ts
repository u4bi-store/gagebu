import path from 'path'
import express, {Request, Response} from 'express'
import { Sequelize } from 'sequelize-typescript';
import morgan from 'morgan'
import apiRouter from './api'
import { User } from './models/User';
import { Expense } from './models/Expense';

const app: express.Application = express()
const env: string = process.env.NODE_ENV || 'development'
const development = env === 'development'
const pkg = development 
  ? require(path.resolve(__dirname, '../../package.json'))
  : require(path.resolve(__dirname, '../package.json'))


const sequelize = new Sequelize({
  database: 'gagebu_develop',
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'test',
  modelPaths: [__dirname + '/models']
})

sequelize
  .sync({force: false})
  .then(()=> {
    console.log('db sync done!')
    const user = new User({email: 'ej88ej@gmail.com'})
    user.save();

    const expense = new Expense({amount: 8000, text: '된장찌게', userId: 1})
    expense.save()
  })

if (development) {
  app.use(morgan('dev'))
}

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

export default app
