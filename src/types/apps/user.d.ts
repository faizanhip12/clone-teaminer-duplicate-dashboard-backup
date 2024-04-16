export interface IUser {
  id?: string
  first_name?: string
  email?: string
  last_name?: string
  email_status?: string
  profile_picture?: string
  gender?: "MALE" | "FEMALE"
  [key: string]: any
}
