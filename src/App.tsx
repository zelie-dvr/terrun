import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Community from "./pages/Community";
import Run from "./pages/Run";
import RunSummary from "./pages/RunSummary";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// ✅ ProtectedRoute neutralisé (plus aucune vérification)
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
    <Route path="/run" element={<ProtectedRoute><Run /></ProtectedRoute>} />
    <Route path="/run/summary" element={<ProtectedRoute><RunSummary /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="max-w-md mx-auto relative min-h-screen shadow-2xl bg-black">
          <Toaster />
          <Sonner
            position="bottom-center"
            className="!fixed !bottom-32 !left-1/2 !-translate-x-1/2 !z-[999] !w-[90%] !max-w-[350px] pointer-events-none"
            toastOptions={{
              className: "pointer-events-auto",
              style: {
                marginBottom: "0",
                width: "100%",
              },
              classNames: {
                toast:
                  "bg-black/90 border-white/10 text-white shadow-2xl backdrop-blur-md rounded-2xl justify-center",
              },
            }}
          />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
