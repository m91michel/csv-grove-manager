import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from 'lucide-react';
import { navItems } from '../nav-items';
import GoogleLogin from './GoogleLogin';

const Navigation = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-800">CSV Grove Manager</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              ))}
              {user ? (
                <Button onClick={onLogout} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <GoogleLogin onLoginSuccess={() => {}} onLoginFailure={() => {}} />
              )}
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={toggleMenu}
              >
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            ))}
            {user ? (
              <Button onClick={onLogout} className="w-full flex items-center justify-center">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <GoogleLogin onLoginSuccess={() => {}} onLoginFailure={() => {}} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
