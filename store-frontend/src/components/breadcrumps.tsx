import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import Link from "next/link";

type TCrumps = {
  name: string;
  path: string;
};

type BreadcrumpsProps = {
  crumps: TCrumps[];
  currentPage: string;
};

export default function Breadcrumps({ crumps, currentPage }: BreadcrumpsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {crumps.map((crump) => (
          <React.Fragment key={crump.path}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={crump.path}>{crump.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
