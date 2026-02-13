import { Home, Users, ShoppingBag, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Home, label: "Accueil" },
    { to: "/community", icon: Users, label: "Communauté" },
    { to: "/shop", icon: ShoppingBag, label: "Boutique" },
    { to: "/profile", icon: User, label: "Profil" }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <div className="relative flex items-end h-16 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">

        {/* Left Bar Part - Rounded Start */}
        <div className="flex-1 bg-black rounded-l-full h-16 flex items-center justify-around pl-4 pr-0 relative z-10 space-x-6">
          <NavLink to="/" className={({ isActive }) => cn("transition-all duration-300 transform active:scale-95 px-2", isActive ? "text-[#D7FF00]" : "text-white/60 hover:text-white")}>
            <Home className="w-6 h-6" />
          </NavLink>
          <NavLink to="/community" className={({ isActive }) => cn("transition-all duration-300 transform active:scale-95", isActive ? "text-[#D7FF00]" : "text-white/60 hover:text-white")}>
            <Users className="w-6 h-6" />
          </NavLink>
        </div>

        {/* Center Notch SVG - Fluid Arc with Green Button */}
        <div className="w-[120px] h-16 relative z-10 -ml-[1px] -mr-[1px] flex-shrink-0">
          <svg width="120" height="64" viewBox="0 0 120 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M0 0 H30 Q 45 0 45 20 Q 45 40 60 40 Q 75 40 75 20 Q 75 0 90 0 H120 V64 H0 Z"
              fill="black"
            />
          </svg>

          {/* Floating Action Button - Properly Nested */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <NavLink to="/run">
              <div className="w-16 h-16 rounded-full bg-[#D7FF00] flex items-center justify-center shadow-[0_0_20px_#D7FF0080] transform transition-transform active:scale-90 relative z-20 group border-[4px] border-[#f2f2f2] dark:border-[#09090b]">
                {/* Runner Icon */}
                <img src="dist/images/icon_Terrun.svg" className="w-10 h-10" alt="Target icon" />
              </div>
            </NavLink>
          </div>
        </div>

        {/* Right Bar Part - Rounded End */}
        <div className="flex-1 bg-black rounded-r-full h-16 flex items-center justify-around pl-0 pr-4 relative z-10 space-x-6">
          <NavLink to="/shop" className={({ isActive }) => cn("transition-all duration-300 transform active:scale-95 py-2", isActive ? "text-[#D7FF00]" : "text-white/60 hover:text-white")}>
            <ShoppingBag className="w-6 h-6" />
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => cn("transition-all duration-300 transform active:scale-95", isActive ? "text-[#D7FF00]" : "text-white/60 hover:text-white")}>
            <User className="w-6 h-6" />
          </NavLink>
        </div>

      </div>
    </div>
  );
}
