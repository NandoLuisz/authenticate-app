"use client"

import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { z } from "zod"

const userLoginFormSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(20)
  })
  
type LoginFormFields = z.infer<typeof userLoginFormSchema>

export default function Login(){

    const 
    { register, 
      handleSubmit, 
      formState: { errors, isSubmitting } 
    } = useForm<LoginFormFields>()

    const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
        const result  = userLoginFormSchema.safeParse(data)
        if(!result.success) return console.log("credenciais erradas")
    
        const { username, password } = data
        console.log(username, password)
    }

    return (
        <div className="w-full h-screen bg-white flex justify-center items-center">
          <div className="w-[75%] h-[95vh] flex bg-white px-2 py-2 rounded-lg justify-between shadow-2xl">
            <img src="/background_singIn_3.jpeg" width={680} height={500} alt="Astronauta" className="rounded-lg"/>
            <form 
              className="w-[400px] h-full px-6 py-6 flex flex-col gap-6 -mt-5"
              onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded px-6 py-6 flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Login</h1>
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
                  <div className="w-full flex flex-col gap-2">
                    <span className="font-semibold">Usuário</span>
                    <input 
                        {...register("username",
                        {required: "Usuário obrigatório"}
                        )}
                        type="text" 
                        placeholder="Digite seu usuário" 
                        className="py-2 px-2 outline-none border-b-[1px] border-zinc-400"
                    />
                    {errors.username && <span className="text-red-700">{errors.username.message}</span>}
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <span className="font-semibold">Senha</span>
                    <input
                        {...register("password",    
                        {required: "Senha é obrigatória"}
                        )} 
                        type="password" 
                        placeholder="Digite sua senha" 
                        className="py-2 px-2 outline-none border-b-[1px] border-zinc-400"
                    />
                    {errors.password && <span className="text-red-700">{errors.password.message}</span>}
                  </div>
                </div>
                <a href="#" className="text-sm text-blue-500 hover:text-blue-400 w-[45%] py-1 mb-5">
                  esqueci minha senha
                </a>
                <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className={`w-full text-white font-semibold ${isSubmitting ? "bg-violet-500" : "bg-violet-900"} rounded-lg py-2`}>
                    {isSubmitting ? "Entrando..." : "Entrar"}
                </button>
                {errors.root && <span className="text-red-700">{errors.root.message}</span>}
              </div>
              <div className="w-full flex justify-center gap-2 -mt-7">
                <span className="text-zinc-500">Ainda não possui conta?</span>
                <Link href="/register" className="text-zinc-900 font-semibold border-b-2 border-zinc-900">Criar</Link>
              </div>
            </form>
          </div>
        </div>
      )
    }