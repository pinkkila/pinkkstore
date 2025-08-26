"use client";

import AccountButton from "@/components/account-button";
import LoginButton from "@/components/login-button";
import { useAuthContext } from "@/hooks/use-contexts";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Button } from "@/components/ui/button";

export default function AccountLoginNavigation() {
  const { username, isPending, logoutIsPending } = useAuthContext();

  if (isPending || logoutIsPending) {
    return (
      <Button variant="secondary" className="rounded-3xl" size="lg" disabled={true}>
        <Spinner variant="circle" />
      </Button>
    );
  }

  return <>{username ? <AccountButton /> : <LoginButton />}</>;
}
