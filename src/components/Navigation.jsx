import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navigation = () => {
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
              <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/app" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">CSV Tool</Link>
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
            <Link to="/" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>Home</Link>
            <Link to="/app" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>CSV Tool</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;