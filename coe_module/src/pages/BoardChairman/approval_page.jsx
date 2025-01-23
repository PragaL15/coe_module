import List_tables from '../../components/BoardChairman/approval/List_table'
import React from 'react';
import Sidebar from '../../components/sideBar';
const BoardApproval = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <List_tables/>
    </div>
  );
}
export default BoardApproval;
