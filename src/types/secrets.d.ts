import { Gender } from 'domain/types/Secret'

export interface Secrets {
  _id: string
  age: number
  anonName: string
  gender: 'man' | 'woman' | 'other'
  likes: number
  secret: string
  createdAt: number
}
