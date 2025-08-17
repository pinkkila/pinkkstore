"use client";

import AccountButton from "@/components/account-button";
import LoginButton from "@/components/login-button";
import { useAuthContext } from "@/hooks/use-contexts";

export default function UserNavigation() {
  const { username } = useAuthContext();

  return <>{username ? <AccountButton /> : <LoginButton />}</>;
}
