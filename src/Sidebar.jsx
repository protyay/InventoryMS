import React from 'react';
import './simple-sidebar.css';
import './styles/app.css';

export default function Sidebar() {
  return (
    <div className="w-1/3">
      <div className="w-1/4">
        <ul className="flex-col justify-start h-screen">
          <li className="border border-blue-900 text-md text-blue-400 hover:text-blue-600 py-2">Menu 1</li>
          <li className="border text-md py-3">Menu 2</li>
          <li className="border text-md py-3">Menu 3</li>
        </ul>
      </div>
    </div>
  );
}
