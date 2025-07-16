import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountButton() {
  return (
    <Button asChild className="rounded-3xl" size="lg" variant="secondary">
      <Link href={"/account"}>
        <User />
      </Link>
    </Button>
  );
}
