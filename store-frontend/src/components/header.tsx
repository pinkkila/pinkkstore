import Link from "next/link";
import UserNavigation from "@/components/user-navigation";
import CartLogo from "@/components/cart-logo";

export default function Header() {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200/30 h-18 px-4 sm:px-9">
      <Link href="/">
        <h2 className="text-3xl text-fuchsia-600">Pinkk Store</h2>
      </Link>
      <div className="flex items-center gap-6 ">
        <UserNavigation />
        <CartLogo />
      </div>
    </div>
  );
}
