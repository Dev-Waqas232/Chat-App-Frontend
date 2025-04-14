import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-primary-100 min-h-screen text-secondary-100">
      {children}
    </main>
  );
}
