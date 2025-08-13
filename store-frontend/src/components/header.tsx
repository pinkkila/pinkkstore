import Link from "next/link";
import UserNavigation from "@/components/user-navigation";
import CartLogo from "@/components/cart-logo";
import DrawerMenu from "@/components/drawer-menu";

export default function Header() {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200/30 h-18 px-4 sm:px-9">
      <div className="flex items-center gap-6">
        <DrawerMenu />
        <Link href="/">
          <h2 className="text-3xl text-fuchsia-500">PinkkStore</h2>
        </Link>
      </div>
      <div className="flex items-center gap-6 ">
        <UserNavigation />
        <CartLogo />
      </div>
    </div>
  );
}
