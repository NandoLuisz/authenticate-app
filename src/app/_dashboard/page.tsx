import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { userFetch } from "@/axios/config";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const session = await getServerSession();
  const cookieStore = cookies();
  const token = cookieStore.get("authenticate-app-astro");

  if (!session && !token) return redirect("/login");

  if(session){
    const registerUser = async () => {
      try {
        const name = session ? session.user?.name : "";
        const email = session ? session.user?.email : "";
        const role = "ADMIN";
        const auth_provider = "GOOGLE";

        const user = { name, email, auth_provider, role };

        const response = await userFetch.post("auth/register", JSON.stringify(user))

        if (response.status === 200) {
          console.log("Usuário cadastrado com sucesso!");
        } else if (response.status === 409) {
          console.log("Usuário já cadastrado");
        }
      } catch (error: any) {
        console.error("Erro ao registrar usuário:", error?.response?.data || error.message);
      }
    };

    registerUser();
  }

  return (
    <div>
      <h1>Hello, usuário</h1>
    </div>
  );
}
