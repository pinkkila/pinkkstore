"use client"

import { useAuthContext } from "@/hooks/use-contexts";

export default function AccountPageClient() {
  const { username } = useAuthContext();

  return (
    <p>Username: {username}</p>
  );
}
