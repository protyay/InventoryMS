import React from 'react';


export default function Sidebar() {
  return (
    <div className="w-1/5">
      <div className="w-1/2 bg-gray-400">
        <ul className="h-screen">
          <li className="border-2 border-gray-200 text-md text-black-400 hover:text-blue-600 py-2 text-center">Customer</li>
          <li className="border-2 border-gray-200 text-md text-black-400 hover:text-blue-600 py-2 text-center">Products</li>
          <li className="border-2 border-gray-200 text-md text-black-400 hover:text-blue-600 py-2 text-center">Inventory</li>
        </ul>
      </div>
    </div>
  );
}
