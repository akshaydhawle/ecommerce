import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import CategoryService from '../../services/categories';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(3).nonempty(),
  creator: z.string().default('Akshay Dhawle'),
  createdAt: z.string().default(new Date().toLocaleDateString()),
  image: z.string().nonempty()  
})

type FormData = z.infer<typeof schema>;

const AddCategory = () => {
    const { state } = useLocation();
    const { register, handleSubmit, formState: { errors }, watch, getValues }  = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: state
    });

    const image = watch('image');
    const id = getValues('id');

    const navigate = useNavigate();
    const onSubmit = (data: FormData)=>{
        CategoryService.addCategory({ ...data })
        .then(res=> {
            toast('Category Added Successfully', {
                position: "top-center",
                theme: "dark",
            });
            navigate('/categories');
        })
        .catch(err=> {
            toast(err.response.data.error, {
                position: "top-center",
                theme: "dark",
            });
        })
    }

    return (
        <div className="fluid-container">
      <div className="p-1">
       <div className="row">
        <div className="col-9">
       <h3 className="mb-3 text-center text-black-50">Add Category</h3> 
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="form-label" htmlFor="email">
              Name
            </label>
            <input
              {...register('name')}  
              placeholder="Enter Category Name"
              id="name"
              type="text"
              className="form-control"
            />
            { errors.name && <div className="text-danger m-2">{errors.name.message}</div>  }
          </div>
          
          <div className="mb-4">
            <label className="form-label" htmlFor="password">
              Image
            </label>
            <input
              {...register('image')}  
              placeholder="Paste Your Category Image"
              id="image"
              type="text"
              className="form-control"
            />
            { errors.image && <div className="text-danger m-2">{errors.image.message}</div>  }
          </div>
          <button type="submit" className="btn btn-primary  mb-3">{ id ? 'Update' : 'Add' } Category</button>
        </form>
        </div>
        <div className="col-3">
        {
            image && (
                <div className="mt-5">
                    <img style={{ marginTop:'13%', width:'200px', height:'200px', borderRadius:'1.5rem' }} src={image} alt="wrong image" />
                </div>
            )
          }
        </div>
       </div>

      </div>
    </div>
  )
}

export default AddCategory