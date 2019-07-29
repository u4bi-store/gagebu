import {Table, Model, PrimaryKey, AutoIncrement, Column, HasMany} from 'sequelize-typescript'
import {Expense} from './Expense'

@Table
export class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  email: string;

  @HasMany(() => Expense)
  expenses: Expense[]
}