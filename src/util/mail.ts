import { Resend } from 'resend'
import { CreateEmailResponse } from 'resend/build/src/emails/interfaces'
import { generateConfirmMailTemplate } from './template'
import dotenv from 'dotenv'
dotenv.config()

const { RESEND_API_KEY, BASE_URL } = process.env
const resend = new Resend(RESEND_API_KEY)

export const sendMail = async (
  { to, subject, html }: { to: string[], subject: string, html: string }
): Promise<CreateEmailResponse> => {
  return await resend.emails.send({
    from: 'David Dev <david@resend.dev>', to, subject, html
  })
}

export const sendVerificationMail = async (
  { id, name, email, validationToken }: { id: string, name: string, email: string, validationToken: string }
): Promise<{ emailSent: boolean }> => {
  if (BASE_URL === undefined) return { emailSent: false }
  const verificationUrl = `${BASE_URL}/user/${id}/verify/${validationToken}`
  console.log(verificationUrl)
  await sendMail({
    to: [email],
    subject: 'Email Address Verification',
    html: generateConfirmMailTemplate({ name, verificationUrl })
  })
  return { emailSent: true }
}
