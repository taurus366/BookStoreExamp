export interface IUser {
  email: string,
  firstName: string,
  secondName: string,
  address: string,
  phoneNumber: string,
  gender: string,
  type: string,
  role: string,
  session: {
    authToken: string
  }
}
