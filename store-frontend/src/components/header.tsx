import Link from "next/link";
import AccountLoginNavigation from "@/components/account-login-navigation";
import CartLogo from "@/components/cart-logo";
import DrawerMenu from "@/components/drawer-menu";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200/30 h-18 px-4 sm:px-9">
      <div className="flex items-center gap-4 xl:gap-6">
        <DrawerMenu />
        <Link href="/">
          <Image src="logo.svg" alt="PinkkStore logo" height={0} width={0} className="h-8 xl:h-10 w-auto" priority/>
        </Link>
      </div>
      <div className="flex items-center gap-1 lg:gap-3 ">
        <AccountLoginNavigation />
        <CartLogo />
      </div>
    </div>
  );
}
