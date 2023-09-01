import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { ACCESS_TOKEN_SECRET } = process.env

export const tokenLifetimeInSeconds = 24 * 60 * 60

export const generateUserToken = (id: string): string[] => {
  return [
    jwt.sign({ id }, ACCESS_TOKEN_SECRET ?? 'defaultSecret', {
      expiresIn: tokenLifetimeInSeconds
    }),
    jwt.sign({ id }, ACCESS_TOKEN_SECRET ?? 'defaultSecret', {
      expiresIn: tokenLifetimeInSeconds
    })
  ]
}
