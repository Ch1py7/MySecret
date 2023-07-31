import { Gender, SecretEntity } from 'domain/types/Secret'
import { InvalidSecretError, InvalidSecretMessages } from './errors/invalidSecretError'

export class Secret implements SecretEntity {
  private _age: number
  private _tags: string[]
  private _gender: Gender
  private _secret: string
  private _likes: number
  private _dislikes: number

  constructor({ age, tags, gender, secret, likes, dislikes }: SecretEntity) {
    this._assertAge(age)
    this._assertTags(tags)
    this._assertGender(gender)
    this._assertSecret(secret)
    this._assertLikes(likes)
    this._assertDislikes(dislikes)
    this._age = age
    this._tags = tags
    this._gender = gender
    this._secret = secret
    this._likes = likes
    this._dislikes = dislikes
  }

  get age(): number {
    return this._age
  }

  get tags(): string[] {
    return this._tags
  }

  get gender(): Gender {
    return this._gender
  }

  get secret(): string {
    return this._secret
  }

  get likes(): number {
    return this._likes
  }

  get dislikes(): number {
    return this._dislikes
  }

  private _assertAge(age: number) {
    if (typeof age !== 'number' || age < 12 || age > 99) {
      throw new InvalidSecretError(InvalidSecretMessages.INVALID_AGE)
    }
  }

  private _assertTags(tags: string[]) {
    if(!Array.isArray(tags) || tags.some(tag => !/^(?:[a-zA-Z0-9]{1,7}(?:,|$)){0,3}$/.test(tag))) {
      throw new InvalidSecretError(InvalidSecretMessages.INVALID_TAGS)
    }
  }

  private _assertGender(gender: Gender) {
    if (gender !== 'man' && gender !== 'woman') {
      throw new InvalidSecretError(InvalidSecretMessages.INVALID_GENDER)
    }
  }

  private _assertSecret(secret: string) {
    if (typeof secret !== 'string' || secret.length > 420 || !/^[a-zA-Z0-9\s]+$/.test(secret)) {
      throw new InvalidSecretError(InvalidSecretMessages.INVALID_SECRET)
    }
  }

  private _assertLikes(likes: number) {
    if (typeof likes !== 'number' || likes !== 0) {
      throw new InvalidSecretError(InvalidSecretMessages.INVALID_LIKES)
    }
  }

  private _assertDislikes(dislikes: number) {
    if (typeof dislikes !== 'number' || dislikes !== 0) {
      throw new InvalidSecretError(InvalidSecretMessages.INVALID_DISLIKES)
    }
  }

  getDataForRequest(): SecretEntity {
    return {
      age: this._age,
      tags: this._tags,
      gender: this._gender,
      secret: this._secret,
      likes: this._likes,
      dislikes: this._dislikes,
    }
  }
}
