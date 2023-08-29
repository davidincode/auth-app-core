import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const JWT_LIFETIME_IN_SECONDS = 3 * 60 * 60

export const createJwt = (id: string): string => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET ?? 'defaultSecret', {
    expiresIn: JWT_LIFETIME_IN_SECONDS
  })
}
