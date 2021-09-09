import { LoadAccountByEmailRepository } from '@/data/protocols/database'
import { AddAccount, AddAccountParams } from '@/domain/usecases'
import { Hasher } from '../../protocols/cryptography'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher
  ) {}
  
  async add(params: AddAccountParams): Promise<void> {
    await this.loadAccountByEmailRepository.loadByEmail(params.email)

    this.hasher.hash(params.password)
  }
}
