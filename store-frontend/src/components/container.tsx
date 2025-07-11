import React from "react";

export default function Container({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col mx-auto min-h-screen">{children}</div>
  );
}
