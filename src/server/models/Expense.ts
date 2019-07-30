import { 
  Table, 
  Model, 
  Column, 
  BelongsTo, 
  ForeignKey, 
  AllowNull, 
  Default, 
  DataType 
} from 'sequelize-typescript'
import { User } from './User';

@Table
export class Expense extends Model<Expense> {

  @AllowNull(false)
  @Column
  amount: number;

  @AllowNull(false)
  @Column
  text: string;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column
  date: Date;

  @ForeignKey(()=> User)
  @Column
  userId: number;

  @BelongsTo(()=> User)
  user: User
}