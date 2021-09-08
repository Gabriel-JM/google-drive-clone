import { AddAccount, AddAccountParams } from '@/domain/usecases'
import { Hasher } from '../protocols/cryptography'

export class DbAddAccount implements AddAccount {
  constructor(private readonly hasher: Hasher) {}
  
  async add(params: AddAccountParams): Promise<void> {
    this.hasher.hash(params.password)
  }
}
