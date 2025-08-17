import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

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
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {crumps.map((crump) => (
          <React.Fragment key={crump.path}>
            <BreadcrumbItem>
              <BreadcrumbLink href={crump.path}>{crump.name}</BreadcrumbLink>
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
