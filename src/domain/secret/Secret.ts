import { SecretEntity } from 'domain/types/Secret'
import { InvalidSecretError, InvalidSecretMessages } from './errors/invalid-secret-error'

export class Secret implements SecretEntity {
  private _age: number
  private _gender: 'man' | 'woman' | 'other'
  private _anonName: string
  private _secret: string
  private _likes: number

  constructor({ age, gender, secret, likes, anonName }: SecretEntity) {
    this._age = age
    this._assertAge(age)
    this._gender = gender
    this._assertGender(gender)
    this._secret = secret
    this._assertSecret(secret)
    this._likes = likes
    this._assertLikes(likes)
    this._anonName = anonName
    this._assertAnonName(anonName)
  }


  get age(): number {
    return this._age
  }

  set age(age: number) {
    this._assertAge(age)
    this._age = age
  }

  get gender(): 'man' | 'woman' | 'other' {
    return this._gender
  }

  set gender(gender: 'man' | 'woman' | 'other') {
    this._assertGender(gender)
    this._gender = gender
  }

  get secret(): string {
    return this._secret
  }
  
  set secret(secret: string) {
    this._assertSecret(secret)
    this._secret = secret
  }

  get likes(): number {
    return this._likes
  }

  set likes(likes: number) {
    this._assertLikes(likes)
    this._likes = likes
  }

  get anonName(): string {
    return this._anonName
  }

  set anonName(anonName: string) {
    this._assertAnonName(anonName)
    this._anonName = anonName
  }

  private _assertAge(age: number) {
    if (typeof age !== 'number' || age < 12 || age > 99) {
      throw new InvalidSecretError(InvalidSecretMessages.INVALID_AGE)
    }
  }

  private _assertGender(gender: 'man' | 'woman' | 'other') {
    if (gender !== 'man' && gender !== 'woman' && gender !== 'other') {
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
