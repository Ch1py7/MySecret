export type Gender = 'man' | 'woman' | 'other'

export interface SecretEntity {
  age: number,
  gender: Gender,
  secret: string,
  anonName: string
  likes: number,
}