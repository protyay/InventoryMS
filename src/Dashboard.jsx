import React from 'react';
import ContentArea from './ContentArea';
import Sidebar from './Sidebar';
import './simple-sidebar.css';
import './styles/app.css';

class Dashboard extends React.Component {

  render() {
    return (

      <div className="flex max-w-full" id="wrapper">

        <Sidebar />
        <ContentArea />
      </div>
    );
  }

}
export default Dashboard;


