export type Gender = 'man' | 'woman'

export interface SecretEntity {
  age: number,
  tags: string[],
  gender: Gender,
  secret: string,
  likes: number,
  dislikes: number,
}