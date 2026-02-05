import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface MobileLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function MobileLayout({ children, hideNav = false }: MobileLayoutProps) {
  return (
    <div className="min-h-screen max-w-md mx-auto bg-background relative">
      <main className={hideNav ? "" : "pb-20"}>{children}</main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
