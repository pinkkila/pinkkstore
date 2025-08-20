"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type BasicAccordionProps = {
  children: React.ReactNode;
  title: string;
};

export default function BasicAccordion({
  children,
  title,
}: BasicAccordionProps) {
  return (
    <Accordion asChild type="single" collapsible className="mb-4">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h2 className="text-xl font-semibold">{title}</h2>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
