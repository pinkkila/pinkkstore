"use client";

import { Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const routes = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Cart",
    path: "/cart",
  },
  {
    label: "Account",
    path: "/account",
  },
];

const routesCategories = [
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

export default function DrawerMenu() {
  const activePathname = usePathname();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Menu className="hover:cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex justify-between items-center">
            <div>
              <DrawerTitle>PinkkStore</DrawerTitle>
              <DrawerDescription>Where do you want to go?</DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="outline"><X/></Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="px-5">
        <ul>
          {routes.map((route) => (
            <li key={route.path}>
              <DrawerClose asChild>
                <Link
                  href={route.path}
                  className={cn(
                    "text-white/60 text-lg font-bold py-1 hover:text-white focus:text-white transition",
                    {
                      " text-white": route.path === activePathname,
                    },
                  )}
                >
                  {route.label}
                </Link>
              </DrawerClose>
            </li>
          ))}
        </ul>
        <Separator className="my-2" />
          <h2 className="text-white/35 mb-1">Categories:</h2>
          <ul>
            {routesCategories.map((route) => (
              <li key={route.path}>
                <DrawerClose asChild>
                  <Link
                    href={route.path}
                    className={cn(
                      "text-white/60 text-lg font-bold py-1 hover:text-white focus:text-white transition",
                      {
                        " text-white": route.path === activePathname
                      }
                    )}
                  >
                    {route.label}
                  </Link>
                </DrawerClose>
              </li>
            ))}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
