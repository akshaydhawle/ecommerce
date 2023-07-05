import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import UserService from "../services/users";
import { toast } from "react-toastify";

const schema = z.object({
  name: z.string().min(3).max(13).nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(3).max(13).nonempty(),
  role: z.string().default('user')
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    UserService.register(data)
      .then((res) => {
        toast('User registered successfully', {
            position: "top-center",
            theme: "light",
        });
        navigate("/login");
      })
      .catch((error) => {
        toast(error.response.data.error, {
          position: "top-center",
          theme: "dark",
        });
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center ew-100 eh-100 ">
      <div className="border w-50 h-75 p-5">
        <h3 className="text-center mb-2 text-black-50">Register</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              {...register("name")}
              placeholder="Enter Your Name"
              id="name"
              type="text"
              className="form-control"
            />
            {errors.name && (
              <div className="text-danger m-2">{errors.name.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="Enter Your Email"
              id="email"
              type="email"
              className="form-control"
            />
            {errors.email && (
              <div className="text-danger m-2">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              placeholder="Enter Your Password"
              id="password"
              type="password"
              className="form-control"
            />
            {errors.password && (
              <div className="text-danger m-2">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="role">
              Role
            </label>
          <select {...register('role')} className="form-select" id="role">
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Register
          </button>
          <p>
            Already Registered{" "}
            <Link className="text-decoration-none text-success" to="/login">
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
