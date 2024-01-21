import z, { object, number, string, TypeOf, date, array, infer } from 'zod';

export const tagSchema = object({
  personName: string({
    required_error: 'Person name is required',
  }).min(1, { message: 'name is required' }),
  personEmail: string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
});

export const createComplainSchema = object({
  title: string().min(1, { message: 'Title is required' }),
  description: string().min(1, { message: 'Description is required' }),
  taggedPeople: array(tagSchema).refine((data) => data.length > 0, {
    message: 'At least one tagged person is required',
  }),
});
export type CreateComplainSchemaType = TypeOf<typeof createComplainSchema>;
export type TagSchemaType = TypeOf<typeof tagSchema>;

export type ValidationSchema = z.infer<typeof createComplainSchema>;
