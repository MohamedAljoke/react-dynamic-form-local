import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateComplainSchemaType, TagSchemaType, ValidationSchema, createComplainSchema } from './schema/trip.schema';



function App() {
  const { register, handleSubmit, control, formState: { errors } } = useForm<CreateComplainSchemaType>({
    resolver: zodResolver(createComplainSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'taggedPeople'
  })

  const addComplain = (chosenRow: TagSchemaType) => {
    append(chosenRow)
  }
  const submitForum: SubmitHandler<ValidationSchema> = (data) => {
    //TODO: submit data to server
    console.log(data)
  }
  return (
    <div
      className='bg-red-50 flex flex-col items-center justify-center h-screen w-screen'
    >
      <form
        onSubmit={handleSubmit(submitForum)}
        className='flex flex-col w-[500px] bg-white p-4 rounded-md shadow-md'
      >
        <h2 className="text-2xl font-bold mb-4">Register Experience</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Trip title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
            placeholder="Title for your trip"
            {...register('title')}
          />
          {errors.title && <span className='text-red-500 text-xs'>{errors.title.message}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Trip description
          </label>
          <input
            type="text"
            id="description"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
            placeholder="Description for your trip"
            {...register('description', { required: true })}
          />
          {errors.description && <span className='text-red-500 text-xs'>{errors.description.message}</span>}
        </div>
        <div className='mt-2 max-h-[300px] overflow-y-auto'>
          {
            fields.map((field, index) => {
              const hasNameError = errors.taggedPeople?.[index]?.personName
              const hasEmailError = errors.taggedPeople?.[index]?.personEmail
              return (
                <div key={field.id} className='flex items-center gap-2 mt-2'>
                  <input
                    type="text"
                    id="description"
                    className={`
                    ${hasNameError ? 'border-red-500' : ''}
                    w-full px-3 py-2 h-12 border rounded focus:outline-none focus:shadow-outline`}
                    placeholder="participant name"
                    {...register(`taggedPeople.${index}.personName`, { required: true })}

                  />

                  <input
                    type="email"
                    id="description"
                    className={`
                    ${hasEmailError ? 'border-red-500' : ''}
                    w-full px-3 py-2 border h-12 rounded focus:outline-none focus:shadow-outline`}
                    placeholder="participant email"
                    {...register(`taggedPeople.${index}.personEmail`,
                      { required: true, })}
                  />
                  <p
                    className='text-red-500 cursor-pointer'
                    onClick={() => {
                      remove(index)
                    }}>Remove</p>
                </div>
              )
            })
          }
        </div>
        <p className='mt-4 text-xs'>Add people that went on the trip</p>
        <button
          type='button'
          className='mt-1 w-[200px] bg-white p-2 border border-solid rounded-md'
          onClick={() => {
            addComplain({
              personName: '',
              personEmail: ''
            })
          }}
        >Add Field</button>
        <button
          className='mt-4 bg-slate-400 p-2 border border-solid rounded-md hover:bg-slate-300'
          type='submit'
        >Submit</button>
      </form >
    </div >
  )
}

export default App



