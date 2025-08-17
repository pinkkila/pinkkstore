"use client"

import { Button } from "@/components/ui/button";
import { getCsrfToken } from "@/lib/utils";
import { useAuthContext } from "@/hooks/use-contexts";

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
