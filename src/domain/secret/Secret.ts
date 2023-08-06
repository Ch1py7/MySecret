import { Gender, SecretEntity } from 'domain/types/Secret'
import { InvalidSecretError, InvalidSecretMessages } from './errors/invalidSecretError'

export class Secret implements SecretEntity {
  private _age: number
  private _gender: Gender
  private _anonName: string
  private _secret: string
  private _likes: number

  constructor({ age, gender, secret, likes, anonName }: SecretEntity) {
    this._assertAge(age)
    this._assertGender(gender)
    this._assertSecret(secret)
    this._assertLikes(likes)
    this._assertAnonName(anonName)
    this._age = age
    this._gender = gender
    this._secret = secret
    this._likes = likes
    this._anonName = anonName
  }

  get age(): number {
    return this._age
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

  get anonName(): string {
    return this._anonName
  }

  private _assertAge(age: number) {
    if (typeof age !== 'number' || age < 12 || age > 99) {
      throw new InvalidSecretError(InvalidSecretMessages.INVALID_AGE)
    }
  }

  private _assertGender(gender: Gender) {
    if (gender !== 'man' && gender !== 'woman' && gender !== 'other') {
      throw new InvalidSecretError(InvalidSecretMessages.INVALID_GENDER)
    }
  }

  private _assertSecret(secret: string) {
    if (typeof secret !== 'string' || secret.length > 420 || !/^[a-zA-Z0-9\s!¡?¿,.:'"¡"'.\sáéíóúÁÉÍÓÚñÑ]+$/.test(secret)) {
      throw new InvalidSecretError(InvalidSecretMessages.INVALID_SECRET)
    }
  }

  private _assertLikes(likes: number) {
    if (typeof likes !== 'number' || likes !== 0) {
      throw new InvalidSecretError(InvalidSecretMessages.INVALID_LIKES)
    }
  }

  private _assertAnonName(anonName: string) {
    if (typeof anonName !== 'string' || anonName.length > 10) {
      throw new InvalidSecretError(InvalidSecretMessages.INVALID_ANONNAME)
    }
  }

  getDataForRequest(): SecretEntity {
    return {
      anonName: this._anonName,
      age: this._age,
      gender: this._gender,
      secret: this._secret,
      likes: this._likes,
    }
  }
}
