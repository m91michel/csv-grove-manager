import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { navItems } from "./nav-items";
import Navigation from "./components/Navigation";
import MainApp from "./pages/MainApp";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (tokenResponse) => {
    // Here you would typically send the tokenResponse to your backend
    // and receive user details in return. For this example, we'll just
    // set a simple user object.
    setUser({ id: 'google-user', name: 'Google User' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navigation user={user} onLogout={handleLogout} />
              <main className="flex-grow">
                <Routes>
                  {navItems.map(({ to, page }) => (
                    <Route key={to} path={to} element={React.cloneElement(page, { user, onLoginSuccess: handleLoginSuccess })} />
                  ))}
                  <Route path="/app" element={<MainApp user={user} />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
