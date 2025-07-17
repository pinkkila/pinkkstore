import LogoutButton from "@/components/logout-button";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h2>Your account</h2>
      <Link href="/account/orders">You orders</Link>
      <LogoutButton />
    </main>
  );
}
