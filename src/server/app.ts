
import path from 'path'
import express, {Request, Response} from 'express'
import apiRouter from './api'
import { Sequelize } from 'sequelize-typescript';
import { User } from './dbModels/User';
import { Expense } from './dbModels/Expense';

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
  modelPaths: [__dirname + '/dbModels']
})

sequelize
  .sync({force: true})
  .then(()=> {
    console.log('db sync done!')
    const user = new User({email: 'ej88ej@gmail.com'})
    user.save();

    const expense = new Expense({amount: 8000, text: '된장찌게', userId: 1})
    expense.save()
  })

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

module.exports = app
