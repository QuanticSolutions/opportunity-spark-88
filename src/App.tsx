import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import GuestRoute from "@/components/GuestRoute";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignUpAccount from "./pages/SignUpAccount";
import Onboarding from "./pages/Onboarding";
import DashboardSeeker from "./pages/DashboardSeeker";
import DashboardProvider from "./pages/DashboardProvider";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Guest-only routes */}
            <Route path="/signup" element={<GuestRoute><SignUp /></GuestRoute>} />
            <Route path="/signup/account" element={<GuestRoute><SignUpAccount /></GuestRoute>} />

            {/* Auth required */}
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path="/dashboard/seeker" element={<ProtectedRoute requireComplete><DashboardSeeker /></ProtectedRoute>} />
            <Route path="/dashboard/provider" element={<ProtectedRoute requireComplete><DashboardProvider /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
