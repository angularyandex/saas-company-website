
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import DashboardPage from "@/pages/DashboardPage";
import CatalogPage from "@/pages/client/CatalogPage";
import MyPurchasesPage from "@/pages/client/MyPurchasesPage";
import ChatsPage from "@/pages/client/ChatsPage";
import ClientGroupsPage from "@/pages/manager/ClientGroupsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      
      {/* Клиентские маршруты */}
      {user.role === 'client' && (
        <>
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/my-purchases" element={<MyPurchasesPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/documents" element={<DashboardPage />} />
          <Route path="/payments" element={<DashboardPage />} />
        </>
      )}
      
      {/* Менеджерские маршруты */}
      {user.role === 'manager' && (
        <>
          <Route path="/manage-catalog" element={<DashboardPage />} />
          <Route path="/client-groups" element={<ClientGroupsPage />} />
          <Route path="/orders" element={<DashboardPage />} />
          <Route path="/manager-chats" element={<ChatsPage />} />
          <Route path="/document-management" element={<DashboardPage />} />
          <Route path="/client-payments" element={<DashboardPage />} />
        </>
      )}
      
      {/* Админские маршруты */}
      {user.role === 'admin' && (
        <>
          <Route path="/admin/users" element={<DashboardPage />} />
          <Route path="/admin/analytics" element={<DashboardPage />} />
          <Route path="/admin/settings" element={<DashboardPage />} />
        </>
      )}
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
