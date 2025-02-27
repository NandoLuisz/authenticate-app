'use server'

import { cookies } from 'next/headers'

export async function saveToken(data: string) {
  const cookieStore = await cookies()

  cookieStore.set({
    name: 'authenticate-app-astro',
    value: data,
    httpOnly: true,  // Impede o acesso via JS no navegador  // Só envia cookies por HTTPS em produção
    path: '/',  // O cookie estará disponível para todas as rotas da aplicação
    maxAge: 3600,  // O cookie será válido por 1 hora
  })
}
