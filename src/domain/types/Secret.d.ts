export type Gender = 'man' | 'woman'

export interface SecretEntity {
  age: number,
  gender: Gender,
  secret: string,
  anonName: string
  likes: number,
}