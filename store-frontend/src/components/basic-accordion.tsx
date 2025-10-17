"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type BasicAccordionProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
};

export default function BasicAccordion({
  children,
  title,
  className,
}: BasicAccordionProps) {
  return (
    <Accordion asChild type="single" collapsible className={cn(className)}>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h2 className="text-xl font-semibold">{title}</h2>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
