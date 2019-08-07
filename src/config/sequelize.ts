import path from 'path'
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Expense } from '../models/Expense';

const pkg = require('../../package.json')
const debug = require('debug')(`${pkg.name}:sequelize`)

export const init = (): Sequelize => {
  // todo Env vars.
  const sequelize: Sequelize = new Sequelize({
    database: 'gagebu_develop',
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'test',
    modelPaths: [path.resolve(__dirname,'../models')]
  })

  return sequelize
}

interface Options {
  force?: boolean
  seed?: boolean
}

export const run = async (sequelize: Sequelize, options: Options) => {
  await sequelize.sync({force: options.force || false})
  if (options.seed) {
      const user = new User({email: 'ej88ej@gmail.com'})
      user.save();

      const expense = new Expense({amount: 8000, text: '된장찌게', userId: 1})
      expense.save()
  }
  debug('Databse Sync Done')
}

