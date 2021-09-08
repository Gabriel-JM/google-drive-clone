export interface AddAccountParams {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add(params: AddAccountParams): Promise<void>
}
