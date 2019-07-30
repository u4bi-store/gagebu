import { Table, Model, PrimaryKey, AutoIncrement, Column, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { User } from './User';

@Table
export class Expense extends Model<Expense> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  amount: number;

  @ForeignKey(()=> User)
  @Column
  userId: number;

  @BelongsTo(()=> User)
  user: User
}