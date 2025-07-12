import LoginButton from "@/components/login-button";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1>This is Home page that contains Login and info to go shop</h1>
      <LoginButton/>
    </main>
  );
}
