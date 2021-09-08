import { DbAddAccount } from './db-add-account'

const fakeHashedValue = 'hashed_value'

function makeSut() {
  const hasherStub = {
    hash: jest.fn(() => fakeHashedValue)
  }

  const sut = new DbAddAccount(hasherStub)

  return {
    sut,
    hasherStub
  }
}

describe('Db add account use case', () => {
  const fakeParams = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
  
  it('should call Hasher with correct values', async () => {
    const { sut, hasherStub } = makeSut()
    await sut.add(fakeParams)

    expect(hasherStub.hash).toHaveBeenCalledWith(fakeParams.password)
  })
})
