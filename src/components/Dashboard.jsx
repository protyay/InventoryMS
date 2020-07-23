import React from 'react';
import '../styles/app.css';
import ContentArea from './ContentArea';
import Sidebar from './Sidebar';

function Dashboard(props) {
 // console.log('Dashboard props', props);
  return (

    <div className="flex max-w-full mt-3" id="wrapper">

      <Sidebar />
      <ContentArea/>
    </div>
  );
}

export default Dashboard;


