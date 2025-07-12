import React from "react";
import ProtectedRoute from "@/components/protected-route";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col mx-auto min-h-screen">
      <ProtectedRoute>{children}</ProtectedRoute>
    </div>
  );
}
