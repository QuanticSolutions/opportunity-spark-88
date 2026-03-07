import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import GuestRoute from "@/components/GuestRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import SignUp from "./pages/SignUp";
import SignUpAccount from "./pages/SignUpAccount";
import Onboarding from "./pages/Onboarding";
import DashboardSeeker from "./pages/DashboardSeeker";
import SubscriptionSelect from "./pages/SubscriptionSelect";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

// Seeker dashboard sub-pages
import Explore from "./pages/dashboard/seeker/Explore";
import AppliedJobs from "./pages/dashboard/seeker/AppliedJobs";
import SavedJobs from "./pages/dashboard/seeker/SavedJobs";
import Notifications from "./pages/dashboard/seeker/Notifications";
import ProfileInfo from "./pages/dashboard/seeker/ProfileInfo";
import PasswordSecurity from "./pages/dashboard/seeker/PasswordSecurity";

// Provider dashboard
import ProviderLayout from "./components/dashboard/provider/ProviderLayout";
import ProviderHome from "./pages/dashboard/provider/ProviderHome";
import Opportunities from "./pages/dashboard/provider/Opportunities";
import Applicants from "./pages/dashboard/provider/Applicants";
import ProviderMessages from "./pages/dashboard/provider/Messages";
import ProviderDocuments from "./pages/dashboard/provider/Documents";
import ProviderSubscription from "./pages/dashboard/provider/Subscription";
import ProviderTeam from "./pages/dashboard/provider/Team";
import ProviderSettings from "./pages/dashboard/provider/ProviderSettings";

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
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/articles" element={<Articles />} />

            {/* Guest-only routes */}
            <Route path="/signup" element={<GuestRoute><SignUp /></GuestRoute>} />
            <Route path="/signup/account" element={<GuestRoute><SignUpAccount /></GuestRoute>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Auth required */}
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

            {/* Provider subscription selection */}
            <Route path="/provider/subscribe" element={<ProtectedRoute><SubscriptionSelect /></ProtectedRoute>} />

            {/* Seeker dashboard with sub-routes */}
            <Route path="/dashboard/seeker" element={<ProtectedRoute requireComplete><DashboardSeeker /></ProtectedRoute>}>
              <Route index element={<Explore />} />
              <Route path="applied-jobs" element={<AppliedJobs />} />
              <Route path="saved-jobs" element={<SavedJobs />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<ProfileInfo />} />
              <Route path="security" element={<PasswordSecurity />} />
            </Route>

            {/* Provider dashboard with sub-routes */}
            <Route path="/dashboard/provider" element={<ProtectedRoute requireComplete><ProviderLayout /></ProtectedRoute>}>
              <Route index element={<ProviderHome />} />
              <Route path="opportunities" element={<Opportunities />} />
              <Route path="applicants" element={<Applicants />} />
              <Route path="messages" element={<ProviderMessages />} />
              <Route path="documents" element={<ProviderDocuments />} />
              <Route path="subscription" element={<ProviderSubscription />} />
              <Route path="team" element={<ProviderTeam />} />
              <Route path="settings" element={<ProviderSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
