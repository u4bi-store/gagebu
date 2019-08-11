import {User} from '../models/User'

export const findUserByName = async (email: string): Promise<User | null> => {
  const user = await User.findOne({where: {email}})
  return user
}