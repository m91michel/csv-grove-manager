import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ columns, logo }) => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {logo && (
            <div className="w-full md:w-1/4 mb-8 md:mb-0">
              <img src={logo} alt="Company Logo" className="h-12 mb-4" />
            </div>
          )}
          {columns.map((column, index) => (
            <div key={index} className="w-full md:w-1/4 mb-8 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul>
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="mb-2">
                    <Link to={item.url} className="text-gray-600 hover:text-gray-900">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} CSV Grove Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;