import { Gender } from 'domain/types/Secret'

export interface Secrets {
  _id: string
  gender: Gender
  age: number
  secret: string
  anonName: string
  country: string
  likes: number
}
