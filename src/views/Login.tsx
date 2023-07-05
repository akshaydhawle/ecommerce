import React from "react";
import "../css/Login.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import UserService from '../services/users'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().min(3, { message:' password should contain at least 3 characters'}).max(13, { message: 'max password length is 13'}).nonempty()
})

type FormData = z.infer<typeof schema>;

const Login = () => {
    const { register, handleSubmit, reset, formState:{ errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    })

  const navigate = useNavigate();
  const onSubmit = async(data: FormData)=>{
        UserService.login(data)
        .then(res=> navigate('/') )
        .catch(error => {
            toast(error.response.data.error, {
                position: "top-center",
                theme: "dark",
            });
        })
  }  

  return (
    <div className="container d-flex justify-content-center align-items-center ew-100 eh-100 ">
      <div className="border w-50 h-50 p-5">
       <h3 className="text-center mb-2 text-black-50">Login</h3> 
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              {...register('email')}  
              placeholder="Enter Your Email"
              id="email"
              type="email"
              className="form-control"
            />
            { errors.email && <div className="text-danger m-2">{errors.email.message}</div>  }
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              {...register('password')}  
              placeholder="Enter Your Password"
              id="password"
              type="password"
              className="form-control"
            />
            { errors.password && <div className="text-danger m-2">{errors.password.message}</div>  }
          </div>
          <button type="submit" className="btn btn-primary mb-3">Login</button>
           <p>
            Not Registered <Link className="text-decoration-none text-success" to='/register'>Register</Link>
            </p> 
        </form>
      </div>
    </div>
  );
};

export default Login;
