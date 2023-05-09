export interface User {
  username: string
  email: string
  password: string
}

export interface UserWithId extends User {
  id: number
}

export default interface IUserService {
  create (user: User): Promise<Omit<UserWithId, 'password'>>
  getById (id: number): Promise<Omit<UserWithId, 'password'>>
}
