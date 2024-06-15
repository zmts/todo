export class CurrentUser {
  id: number
  role: string
  email: string

  constructor (src?) {
    this.id = src?.id || null
    this.role = src?.role || null
    this.email = src?.email || null
  }
}
