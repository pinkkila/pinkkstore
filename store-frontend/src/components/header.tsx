import Link from "next/link";
import Authentication from "@/components/authentication";

export default function Header() {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200/30 h-14 px-4 sm:px-9">
      <Link href="/">
        <h2 className="text-3xl text-fuchsia-600">Pinkk Store</h2>
      </Link>
      <Authentication />
    </div>
  );
}
