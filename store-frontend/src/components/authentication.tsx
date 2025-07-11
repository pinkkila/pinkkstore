"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/hooks";
import { getCsrfToken } from "@/lib/utils";

const BACKEND_URL = "http://127.0.0.1:8080";

export default function Authentication() {
  const { username, setUsername } = useAuthContext();

  const handleLogin = () => {
    window.location.href = BACKEND_URL;
  };

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
        setUsername("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {username ? (
        <Button
          className="rounded-3xl"
          size="lg"
          onClick={handleLogout}
          variant="secondary"
        >
          Logout
        </Button>
      ) : (
        <Button
          className="rounded-3xl"
          onClick={handleLogin}
          size="lg"
        >
          Login
        </Button>
      )}
    </>
  );
}
