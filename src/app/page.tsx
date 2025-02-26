export default function Home() {
  const env = process.env.GOOGLE_CLIENT_ID as string
  console.log(env)
  return (
    <div>
      <h1 className="text-red-500">Hello, World!</h1>
    </div>
  );
}
