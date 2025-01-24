import FacultyRecordsTable from '../../components/Faculty/allocation/display_table'
import React from 'react';
import Sidebar from '../../components/sideBar';
const DisplayAllocation = () => {
  return (
    <div className='flex flex-col'>
      <Sidebar/>
      <div className='ml-56 mt-5 '>
        <FacultyRecordsTable/>
      </div>
    </div>
  );
}
export default DisplayAllocation