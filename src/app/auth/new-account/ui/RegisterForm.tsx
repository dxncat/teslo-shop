'use client';

import clsx from "clsx";
import Link from "next/link"
import { useForm } from "react-hook-form";

type FormInputs = {
    name: string,
    email: string,
    password: string
}

export const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const onSubmit = async (data: FormInputs) => {
        const { name, email, password } = data
        console.log({ name, email, password })
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

            {/* {
                errors.name?.type === 'required' && <p className="text-red-500">* El nombre es requerido</p>
            } */}

            <label>Nombre completo</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': !!errors.name
                        }
                    )
                }
                type="text"
                autoFocus
                {...register("name", { required: true })}
            />


            <label>Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': !!errors.email
                        }
                    )
                }
                type="email"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />


            <label>Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': !!errors.password
                        }
                    )
                }
                type="password"
                {...register("password", { required: true, minLength: 6 })}
            />

            <button
                className="btn-primary">
                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>
        </form>
    )
}
