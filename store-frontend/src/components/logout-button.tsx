"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/use-contexts";

export default function LogoutButton() {
  const { logout } = useAuthContext();

  return (
    <Button
      className="rounded-3xl"
      size="lg"
      onClick={logout}
      variant="secondary"
    >
      Logout
    </Button>
  );
}
