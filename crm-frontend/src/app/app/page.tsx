import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Link href={"/app/dashboard"}>To the Dashboard</Link>
    </div>
  );
}
