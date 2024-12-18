'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CircleAlert } from 'lucide-react'
import React, { useActionState, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import { formSchema } from '@/lib/validation'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { createPitch } from '@/src/actions'

type Errors = {
  title?: string,
  description?: string,
  category?: string,
  image?: string,
  pitch?: string,
}
const StartupForm = () => {
  const [errors, setErrors] = useState<Errors>({});
  const [pitch, setPitch] = useState<string>();
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
    formValues: {
      title: '',
      description: '',
      category: '',
      image: '',
      pitch: '',
    }
  });
  const { toast } = useToast();
  const router = useRouter();

  

  async function handleFormSubmit(prevState: any, formData: FormData) {
    const formValues = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      image: formData.get('image') as string,

      pitch,
    };

    
    try {
      
      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch as string);

      if (result.status == 'SUCCESS') {
        toast({
          title: 'вот сматри мы сделали',
          description: 'че нормально оцени мою работу 5 звзд пж',
        })
        router.push(`/startup/${result.slug.current}`);

      }
      
      return result;
      

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors);

        toast({
          title: 'Какая-то ошибка произошла',
          description: 'ты сходи проверь инпуты и всё братан создаш',
          variant: 'destructive',
        });
        return { ...prevState, formValues, error: 'Validation error', status: 'ERROR' };
      }

      toast({
        title: 'а че за говно',
        description: 'я хз как создать твой стартап поэтому пашел заново саздавать быстраааа',
        variant: 'destructive',
      })

      return {
        ...prevState,
        formValues,
        error: 'An unexpected error has occured',
        status: 'ERROR',
      };
    }
  }


  return (
    <section className='w-full flex flex-col justify-center items-center my-10'>
      <form action={formAction} className='max-w-7xl w-full flex flex-col items-center justify-center gap-5 px-10'>
        <div className='w-full flex items-center gap-5'>
          <div className='flex-1'>
            <label htmlFor='title' className='text-2xl font-bold ml-2'>
              Title
            </label>
            <Input
              className='create-input my-2'
              required
              id="title"
              name="title"
              placeholder='Startup title'
              defaultValue={state.formValues.title}
              />
            {
              errors.title && (
                <p className='text-red-500 ml-2 flex gap-1 items-center'><CircleAlert className='size-5' /> {errors.title}</p>
                )
              }
          </div>
          <div className='flex-1'>
            <label htmlFor='category' className='text-2xl font-bold ml-2'>
              Category
            </label>
            <Input
              className='create-input my-2'
              required
              id="category"
              name="category"
              placeholder='Category'
              defaultValue={state.formValues.category}
              />
            {
              errors.category && (
                <p className='text-red-500 ml-2 flex gap-1 items-center'><CircleAlert className='size-5' /> {errors.category}</p>
                )
              }
          </div>
        </div>

        <div className='w-full'>
          <label htmlFor='description' className='text-2xl font-bold ml-2'>
            Description
          </label>
          <Textarea
             className='create-input my-2'
             required
             id="description"
             name="description"
             placeholder='Description of your Startup'
             defaultValue={state.formValues.description}                            
           />
           {
            errors.description && (
              <p className='text-red-500 ml-2 flex gap-1 items-center'><CircleAlert className='size-5' /> {errors.description}</p>
            )
           }
        </div>

        <div className='w-full'>
          <label htmlFor='image' className='text-2xl font-bold ml-2'>
            Image URL
          </label>
          <Input
             className='create-input my-2'
             required
             id="image"
             name="image"
             placeholder='Startup image URL'
             defaultValue={state.formValues.image}
           />
           {
            errors.image && (
              <p className='text-red-500 ml-2 flex gap-1 items-center'><CircleAlert className='size-5' /> {errors.image}</p>
            )
           }
        </div>

        <div className='w-full'>
          <label htmlFor='pitch' className='text-2xl font-bold ml-2'>
            Pitch
          </label>
          <MDEditor
            value={pitch}
            onChange={value => setPitch(value as string)}
            id='pitch'
          />
           {
            errors.pitch && (
              <p className='text-red-500 ml-2 flex gap-1 items-center'><CircleAlert className='size-5' /> {errors.pitch}</p>
            )
           }
        </div>
        
        <button type="submit" disabled={isPending} className='max-w-xl w-full bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 px-4 rounded-md'>
          { isPending ? 'Submitting...' : 'Submit' } 
        </button>
      </form>
    </section>
  )
}

export default StartupForm