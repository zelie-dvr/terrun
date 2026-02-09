import { Home, Users, ShoppingBag, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
const navItems = [{
  to: "/",
  icon: Home,
  label: "Accueil"
}, {
  to: "/community",
  icon: Users,
  label: "Communauté"
}, {
  to: "/run",
  icon: null,
  label: "Course",
  isMain: true
}, {
  to: "/shop",
  icon: ShoppingBag,
  label: "Boutique"
}, {
  to: "/profile",
  icon: User,
  label: "Profil"
}];
export function BottomNav() {
  return <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom bg-[#3b3b3b]/0 border-[#1c1c1c]/0">
      <div className="items-center justify-around h-16 max-w-md mx-auto rounded-full flex border-black/0 bg-black">
        {navItems.map(item => <NavLink key={item.to} to={item.to} className={({
        isActive
      }) => cn("flex flex-col items-center justify-center transition-all", item.isMain ? "relative -mt-6" : "p-2", isActive && !item.isMain && "text-primary")}>
            {({
          isActive
        }) => item.isMain ? <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  
                </div> : <>
                  <item.icon className={cn("w-6 h-6", isActive ? "text-primary" : "text-muted-foreground")} fill={isActive ? "currentColor" : "none"} />
                </>}
          </NavLink>)}
      </div>
    </nav>;
}