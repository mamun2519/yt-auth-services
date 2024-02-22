import { z } from 'zod'

const singUpWithGoogleZodSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string({
      required_error: 'Email  is required',
    }),
  }),
})

export const AuthValidation = {
  singUpWithGoogleZodSchema,
}
