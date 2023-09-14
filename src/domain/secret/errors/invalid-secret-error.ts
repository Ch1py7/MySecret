export class InvalidSecretError extends Error {
  constructor(message: string) {
    super()
    this.message = message
  }
}

export enum InvalidSecretMessages {
	INVALID_AGE = 'Property "age" is required and must be a number between 12 and 99',
  INVALID_GENDER = 'Property "gender" is required and must be "man", "woman" or "other"',
  INVALID_SECRET = 'Property "secret" is required and must be a string with a maximum of 420 characters',
  INVALID_LIKES = 'Property "likes" is required and must be a number',
  INVALID_ANONNAME = 'Property "anonName" is required and must be a string with a maximum of 10 characters',
  INVALID_ID = 'Property "id" is required and must have a maximum of 36 characters',
  INVALID_DATE = 'Property "createdAt" is required and must be an object (Date) type'
}
