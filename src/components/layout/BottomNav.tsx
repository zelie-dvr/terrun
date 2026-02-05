import { Home, Users, ShoppingBag, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Accueil" },
  { to: "/community", icon: Users, label: "Communauté" },
  { to: "/run", icon: null, label: "Course", isMain: true },
  { to: "/shop", icon: ShoppingBag, label: "Boutique" },
  { to: "/profile", icon: User, label: "Profil" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-foreground safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center transition-all",
                item.isMain ? "relative -mt-6" : "p-2",
                isActive && !item.isMain && "text-primary"
              )
            }
          >
            {({ isActive }) =>
              item.isMain ? (
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-foreground"
                  >
                    <path
                      d="M13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5V4Z"
                      fill="currentColor"
                    />
                    <path
                      d="M16.5 8C17.3284 8 18 7.32843 18 6.5C18 5.67157 17.3284 5 16.5 5C15.6716 5 15 5.67157 15 6.5C15 7.32843 15.6716 8 16.5 8Z"
                      fill="currentColor"
                    />
                    <path
                      d="M7 11L10 9L14 11L18 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 15L7 12L11 14L15 11L21 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 20L10 17L14 19L18 16L22 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : (
                <>
                  <item.icon
                    className={cn(
                      "w-6 h-6",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                    fill={isActive ? "currentColor" : "none"}
                  />
                </>
              )
            }
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
