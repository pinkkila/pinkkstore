"use client";

import { useAuthContext } from "@/lib/hooks";
import AccountButton from "@/components/account-button";
import LoginButton from "@/components/login-button";

export default function UserNavigation() {
  const { username } = useAuthContext();

  return <>{username ? <AccountButton /> : <LoginButton />}</>;
}
