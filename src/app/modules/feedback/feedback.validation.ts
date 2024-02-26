import { z } from 'zod'

const FeedbackPostZodSchema = z.object({
  body: z.object({
    reason: z.string({
      required_error: 'Reason  is required',
    }),
    email: z.string({
      required_error: 'Email  is required',
    }),
    massage: z.string({
      required_error: 'Message  is required',
    }),
  }),
})

export const FeedbackValidation = {
  FeedbackPostZodSchema,
}
