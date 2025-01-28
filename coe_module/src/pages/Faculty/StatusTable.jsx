import StatusTable from "../../components/Faculty/approval/table"
import React from 'react';
import Sidebar from '../../components/sideBar';
import Topbar from '../../components/topBar'
const Status = () => {
  return (
    <div className='flex flex-col'>
      <Sidebar/>
      <div className='md:ml-56 ml-3 md:p-0 p-3 mt-5 '>
        <StatusTable/>
      </div>
    </div>
  );
  
}
export default Status