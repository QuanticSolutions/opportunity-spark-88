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

// Seeker dashboard sub-pages
import Explore from "./pages/dashboard/seeker/Explore";
import AppliedJobs from "./pages/dashboard/seeker/AppliedJobs";
import SavedJobs from "./pages/dashboard/seeker/SavedJobs";
import Notifications from "./pages/dashboard/seeker/Notifications";
import ProfileInfo from "./pages/dashboard/seeker/ProfileInfo";
import PasswordSecurity from "./pages/dashboard/seeker/PasswordSecurity";

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

            {/* Seeker dashboard with sub-routes */}
            <Route path="/dashboard/seeker" element={<ProtectedRoute requireComplete><DashboardSeeker /></ProtectedRoute>}>
              <Route index element={<Explore />} />
              <Route path="applied-jobs" element={<AppliedJobs />} />
              <Route path="saved-jobs" element={<SavedJobs />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<ProfileInfo />} />
              <Route path="security" element={<PasswordSecurity />} />
            </Route>

            <Route path="/dashboard/provider" element={<ProtectedRoute requireComplete><DashboardProvider /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
