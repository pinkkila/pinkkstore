import LogoutButton from "@/components/logout-button";
import Link from "next/link";
import Breadcrumps from "@/components/breadcrumps";
import { Button } from "@/components/ui/button";
import AccountPageClient from "@/components/account-page-client";

export default function Page() {
  return (
    <main className="flex flex-col gap-6">
      <Breadcrumps crumps={[]} currentPage={"Account"} />
      <h1 className="text-3xl">Your account</h1>

      <AccountPageClient />

      <div className="flex flex-col items-center justify-center gap-6">
        <Button asChild className="rounded-3xl">
          <Link href="/account/orders">Go to your orders</Link>
        </Button>
        <LogoutButton />
      </div>
    </main>
  );
}
