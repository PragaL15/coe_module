import BECallocating from '../../components/BoardChairman/allocate/allocate_form'
import React from 'react';
import Sidebar from '../../components/sideBar';
const BoardAllocate = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <BECallocating/>
    </div>
  );
}
export default BoardAllocate;
