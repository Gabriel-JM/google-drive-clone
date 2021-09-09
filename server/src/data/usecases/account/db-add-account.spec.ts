import { DbAddAccount } from './db-add-account'
import { EmailAlreadyExistsError } from '@/data/errors'
import { LoadAccountByEmailRepositoryResult } from '@/data/protocols/database'

const fakeHashedValue = 'hashed_value'

function makeSut() {
  const loadAccountByEmailRepositoryStub = {
    loadByEmail: jest.fn<
      Promise<LoadAccountByEmailRepositoryResult>, []
    >(() => Promise.resolve(null))
  }

  const hasherStub = {
    hash: jest.fn(() => fakeHashedValue)
  }

  const sut = new DbAddAccount(
    loadAccountByEmailRepositoryStub,
    hasherStub
  )

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hasherStub
  }
}

describe('Db add account use case', () => {
  const fakeParams = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }

  it('should call LoadAccountByEmailRepository with correct values', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    await sut.add(fakeParams)

    expect(loadAccountByEmailRepositoryStub.loadByEmail)
      .toHaveBeenCalledWith(fakeParams.email)
  })

  it(
    'should throw an EmailAlreadyExistsError if LoadAccountByEmailRepository returns an account',
    async () => {
      const { sut, loadAccountByEmailRepositoryStub } = makeSut()
      loadAccountByEmailRepositoryStub.loadByEmail.mockResolvedValueOnce({
        id: 1,
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })

      const promise = sut.add(fakeParams)

      await expect(promise).rejects.toThrowError(EmailAlreadyExistsError)
    }
  )
  
  it('should call Hasher with correct values', async () => {
    const { sut, hasherStub } = makeSut()
    await sut.add(fakeParams)

    expect(hasherStub.hash).toHaveBeenCalledWith(fakeParams.password)
  })
})
