"use client"

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/hooks";
import { getCsrfToken } from "@/lib/utils";

// const BACKEND_URL = "http://127.0.0.1:8080";
const BACKEND_URL = "/bff";

export default function LogoutButton() {
  const {setUsername} = useAuthContext();

  const handleLogout = () => {
    const csrfToken = getCsrfToken()

    fetch(BACKEND_URL + "/logout", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {}),
      },
    })
      .then(() => {
        setUsername(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Button
      className="rounded-3xl"
      size="lg"
      onClick={handleLogout}
      variant="secondary"
    >
      Logout
    </Button>
  );
}
