import { Button } from "@/components/ui/button";

// const BACKEND_URL = "http://127.0.0.1:8080";
const BACKEND_URL = "/bff";

export default function LoginButton() {
  const handleLogin = () => {
    window.location.href = BACKEND_URL;
  };

  return (
    <Button className="rounded-3xl" onClick={handleLogin} size="lg">
      Login
    </Button>
  );
}
