import z, { object, number, string, TypeOf, date, array, infer } from 'zod';

export const tagSchema = object({
  personName: string({
    required_error: 'Person name is required',
  }).min(1, { message: 'name is required' }),
  personEmail: string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
});

export const createTripSchema = object({
  title: string().min(1, { message: 'Title is required' }),
  description: string().min(1, { message: 'Description is required' }),
  taggedPeople: array(tagSchema),
});
export type CreateTripSchemaType = TypeOf<typeof createTripSchema>;
export type TagSchemaType = TypeOf<typeof tagSchema>;
