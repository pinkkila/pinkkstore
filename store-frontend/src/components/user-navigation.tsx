"use client";

import AccountButton from "@/components/account-button";
import LoginButton from "@/components/login-button";
import { useAuthContext } from "@/hooks/use-contexts";

export default function UserNavigation() {
  const { username, isPending, logoutIsPending } = useAuthContext();

  // TODO: Loading sprinner?
  if (isPending || logoutIsPending) {
    return <div>loading..</div>
  }

  return <>{username ? <AccountButton /> : <LoginButton />}</>;
}
