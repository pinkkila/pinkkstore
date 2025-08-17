import React from "react";

export default function PageContainer({children}: {children: React.ReactNode}) {
  return <div className="w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-7">{children}</div>;
}
