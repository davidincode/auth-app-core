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
  { id, name, mail, validationToken }: { id: string, name: string, mail: string, validationToken: string }
): Promise<{ code: number }> => {
  if (BASE_URL === undefined) return { code: 503 }
  const verificationUrl = `${BASE_URL}/user/${id}/verify/${validationToken}`
  await sendMail({
    to: [mail],
    subject: 'Email Address Verification',
    html: generateConfirmMailTemplate({ name, verificationUrl })
  })
  return { code: 503 }
}
