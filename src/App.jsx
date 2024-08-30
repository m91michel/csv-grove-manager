import React, { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { navItems } from "./nav-items";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import MainApp from "./pages/MainApp";
import BlogPost from "./pages/BlogPost";
import { config } from "./config";

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

  const footerColumns = [
    {
      title: "Product",
      items: [
        { title: "Features", url: "/features" },
        { title: "Pricing", url: "/pricing" },
        { title: "FAQ", url: "/faq" },
      ],
    },
    {
      title: "Company",
      items: [
        { title: "About", url: "/about" },
        { title: "Blog", url: "/blog" },
        { title: "Careers", url: "/careers" },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "Documentation", url: "/docs" },
        { title: "Support", url: `/support?email=${config.supportEmail}` },
        { title: "Terms of Service", url: "/terms" },
      ],
    },
  ];

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
                  <Route path="/blog/:slug" element={<BlogPost />} />
                </Routes>
              </main>
              <Footer columns={footerColumns} logo="/logo.svg" />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
