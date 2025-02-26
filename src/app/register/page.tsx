"use client"

import { userFetch } from "@/axios/config"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { z } from "zod"

const userRegisterFormSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20)
  })

type RegisterFormFields = z.infer<typeof userRegisterFormSchema>

export default function Register(){

    const 
    { register, 
      handleSubmit, 
      setError,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<RegisterFormFields>({
      defaultValues: {
        email: "teste@email.com"
      }
    })

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    const result = userRegisterFormSchema.safeParse(data) 
    if(!result.success) return 

    const { username, email, password } = data
    const role  = "ADMIN"
    const user = {
      username,
      password,
      email,
      role
    }

    try {
      const response = await userFetch.post("auth/register", JSON.stringify(user))
      if(response.status === 200) console.log("Usuário cadastrado com sucesso!")
      reset()      
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data
        console.error(errorMessage)
        
        if (errorMessage === "Usuário já cadastrado.") {
          setError("username", { message: errorMessage });
        } else if (errorMessage === "Email já cadastrado.") {
          setError("email", { message: errorMessage });
        } else {
          setError("root", { message: "Erro inesperado ao registrar o usuário." });
        }

      } else {
        console.error("Erro desconhecido:", error);
        setError("root", { message: "Erro de conexão com o servidor." });
      }
    }
  }
  
    return (
        <div className="w-full h-screen bg-white flex justify-center items-center">
      <div className="w-[75%] h-[95vh] flex bg-white px-2 py-2 rounded-lg justify-between shadow-2xl">
      <img src="/background_singIn_3.jpeg" width={680} height={500} alt="Astronauta" className="rounded-lg"/>
        <form 
          className="w-[400px] h-full px-6 py-6 flex flex-col gap-6 -mt-5"
          onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded px-6 py-6 flex flex-col gap-4">
              <h1 className="text-3xl font-bold">Registro</h1>
              <p>Digite seus dados abaixo</p>
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex justify-center items-center gap-4 bg-zinc-100 py-2 rounded-md cursor-pointer">
                  <FcGoogle className="size-6"/> 
                  <span className="font-semibold">Criar com Google</span>
                </div>
                <div className="w-full flex justify-center items-center gap-4 bg-zinc-100 py-2 rounded-md cursor-pointer">
                  <FaGithub className="size-6"/> 
                  <span className="font-semibold">Criar com GitHub</span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-6">
                <div className="`w-full flex flex-col gap-2">
                    <span className="font-semibold">Usuário</span>
                    <input 
                      {...register("username", 
                        {required: "Usuário obrigatório", 
                                                    minLength: {
                                                      value: 3,
                                                      message: "Usuário precisa ter no mínimo 6 caracteres"
                                                    }
                                                    })} 
                      type="text" 
                      placeholder="Digite seu usuário" 
                      className="py-2 px-2 border-b-[1px] outline-none border-zinc-400"
                    />
                    {errors.username && <span className="text-red-700 text-xs">{errors.username.message}</span>}
                </div>
                <div className="w-full flex flex-col gap-2">
                    <span className="font-semibold">Email</span>
                    <input 
                      {...register("email", 
                        {required: "Email obrigatório!", 
                                                  validate: (value) => {
                                                    if(!value.includes("@")){
                                                      return "Email precisa ser válido"
                                                    } 
                                                    return true
                                                  },})} 
                      type="email" 
                      placeholder="Digite seu email" 
                      className="py-2 px-2 border-b-[1px] outline-none border-zinc-400"
                    />
                    {errors.email && <span className="text-red-700 text-xs">{errors.email.message}</span>}
                </div>
                <div className="w-full flex flex-col gap-2">
                    <span className="font-semibold">Senha</span>
                    <input 
                      {...register("password", 
                        {required: "Senha obrigatória", 
                                                    minLength: {
                                                      value: 6,
                                                      message: "Senha precisa ter no minímo 6 digitos"
                                                    },
                                                    })} 
                      type="text" 
                      placeholder="Digite sua senha" 
                      className="py-2 px-2 border-b-[1px] outline-none border-zinc-400"
                    />
                    {errors.password && <span className="text-red-700 text-xs">{errors.password.message}</span>}
                </div>
              </div>
              <button 
                disabled={isSubmitting} type="submit" 
                className={`w-full text-white font-semibold ${isSubmitting ? "bg-violet-500" : "bg-violet-900"} rounded-lg py-2`}>
                  {isSubmitting ? "Cadastrando..." : "Criar"}
              </button>
              {errors.root && <span className="text-red-700 text-xs">{errors.root.message}</span> }
            </div>
          <div className="w-full flex justify-center gap-2 -mt-7">
            <span className="text-zinc-500">Já possui uma conta?</span>
            <Link href="/login" className="text-zinc-900 font-semibold border-b-2 border-zinc-900">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}