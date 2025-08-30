"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const routes = [
  {
    label: "Fruits",
    path: "/categories/fruits",
  },
  {
    label: "Animals",
    path: "/categories/animals",
  },
  {
    label: "Nature",
    path: "/categories/nature",
  },
];

export default function NavBar() {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isMobile) {
    return null;
  }

  return (
    <nav className="flex items-center justify-center gap-17 w-full bg-white/8 border-b border-zinc-200/10">
      {routes.map((route) => {
        return (
          <Button key={route.path} asChild variant="ghost" size="lg" className="rounded-2xl font-bold dark:hover:bg-transparent hover:underline">
            <Link href={route.path}>{route.label}</Link>
          </Button>
        );
      })}
    </nav>
  );
}
