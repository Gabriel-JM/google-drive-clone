export class EmailAlreadyExistsError extends Error {
  readonly type = 'badRequest'

  constructor(msg = 'Email or password already in use') {
    super(msg)
  }
}
