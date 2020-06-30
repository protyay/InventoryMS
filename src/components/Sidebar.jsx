import React from 'react';


export default function Sidebar() {
  return (
    <div class="flex mb-4 w-1/4">
     <div className="mt-0 w-48 h-screen bg-blue-900 rounded-lg">
        <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-indigo-500 hover:text-white">Customer</a>
        <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-indigo-500 hover:text-white">Inventory</a>
        <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-indigo-500 hover:text-white">Purchase Order</a>
      </div>
    </div>
  );
}
