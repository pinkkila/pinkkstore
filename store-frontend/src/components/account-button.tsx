import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountButton() {
  return (
    <Button asChild variant="secondary" className="rounded-3xl" size="lg">
      <Link href={"/account"}>
        {/*For some reason a size does not change https://github.com/shadcn-ui/ui/issues/6316*/}
        <User className="!size-5" />
      </Link>
    </Button>
  );
}
