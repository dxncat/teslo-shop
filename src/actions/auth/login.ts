'use server'

import { signIn } from "@/auth.config"


export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {

        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        })

        return 'Success'

    } catch (error: any) {
        if (error.type === 'CredentialsSignin') {
            return 'CredentialsSignin'
        }
        return 'Error al autenticar'
    }
}

export const login = async (email: string, password: string) => {
    try {
        await signIn('credentials', {
            email,
            password,
        })
        return {
            ok: true,
            message: 'Usuario autenticado correctamente'
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error al autenticar el usuario'
        }
    }
}