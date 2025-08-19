import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      username?: string
      isProfileCompleted: boolean
    }
  }
  
  interface User {
    id: string
    email: string
    username?: string
    isProfileCompleted: boolean
  }
}