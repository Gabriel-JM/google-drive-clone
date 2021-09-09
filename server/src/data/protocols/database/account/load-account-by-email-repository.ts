import { AccountModel } from '@/domain/models'

export type LoadAccountByEmailRepositoryResult = AccountModel | null

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<LoadAccountByEmailRepositoryResult>
}
