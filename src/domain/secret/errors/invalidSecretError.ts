export class InvalidSecretError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export enum InvalidSecretMessages {
	INVALID_AGE = 'Property "age" is required and must be a number between 12 and 99',
	INVALID_TAGS = 'Property "tags" is required and must be a string array with a maximum of 3 elements and each element must be a string with a maximum of 7 characters',
  INVALID_GENDER = 'Property "gender" is required and must be "man" or "woman"',
  INVALID_SECRET = 'Property "secret" is required and must be a string with a maximum of 420 characters',
  INVALID_LIKES = 'Property "likes" is required and must be a number',
  INVALID_DISLIKES = 'Property "dislikes" is required and must be a number',
}
