import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { ACCESS_TOKEN_SECRET } = process.env

export const tokenLifetimeInSeconds = 24 * 60 * 60

export const generateUserTokenTuple = (id: string): string[] => {
  return [
    jwt.sign({ id }, ACCESS_TOKEN_SECRET ?? 'defaultSecret', {
      expiresIn: tokenLifetimeInSeconds,
    }),
    jwt.sign({ id }, ACCESS_TOKEN_SECRET ?? 'defaultSecret', {
      expiresIn: tokenLifetimeInSeconds,
    }),
  ]
}

export const verifyToken = (
  token: string,
): { validToken: boolean; decodedToken?: string | JwtPayload } => {
  const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET ?? 'defaultSecret')
  return { validToken: true, decodedToken }
}
