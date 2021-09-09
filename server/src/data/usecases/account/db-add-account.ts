import { LoadAccountByEmailRepository } from '@/data/protocols/database'
import { AddAccount, AddAccountParams } from '@/domain/usecases'
import { Hasher } from '@/data/protocols/cryptography'
import { EmailAlreadyExistsError } from '@/data/errors'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher
  ) {}
  
  async add(params: AddAccountParams): Promise<void> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(params.email)

    if(account) {
      throw new EmailAlreadyExistsError()
    }

    this.hasher.hash(params.password)
  }
}
